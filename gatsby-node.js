/**
 * Implement Gatsby's Node APIs in this file.
 * Taken from the official gatsbyjs starter blog
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
// const { transformTitleToPath } = require('./src/util/meta-utils');

// Define the template for blog post
const noteTemplate = path.resolve('./src/templates/note.tsx');

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  // OLD SORT DIRECTIVE:
  // allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
          nodes {
            id
            fields {
              slug
            }
            headings(depth: h1) { value }
          }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      result.errors,
    );
    return;
  }

  const notes = result.data.allMarkdownRemark.nodes;

  // TODO: Find out why this can't be imported from utils
  transformTitleToPath = (title) => {
    return title
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-_]/g, '');
  };

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (notes.length > 0) {
    notes
      .filter(note => note.headings.length > 0)
      .forEach((note, index) => {
        // TODO: Add next & previous note functionality
        const previousPostId = index === 0 ? null : notes[index - 1].id;
        const nextPostId = index === notes.length - 1 ? null : notes[index + 1].id;
        //TODO: Create script to find notes without valid heading titles
        const title = transformTitleToPath(note.headings[0].value);
        const pagePath = transformTitleToPath(title);
        console.log(title);

        createPage({
        // path: notes.fields.slug,
          path: pagePath,
          component: noteTemplate,
          context: {
            id: note.id,
            title: title,
            previousPostId,
            nextPostId,
          },
        });
      });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};