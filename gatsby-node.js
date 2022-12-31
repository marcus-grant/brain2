/**
 * Implement Gatsby's Node APIs in this file.
 * Taken from the official gatsbyjs starter blog
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
// const { transformTitleToPath } = require('./src/util/meta-utils');
// const kebabCase = require('lodash.kebabcase');

// Define the template for blog post
const noteTemplate = path.resolve('./src/templates/note.tsx');
const tagTemplate = path.resolve('./src/templates/tags.tsx');

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      notesRemark: allMarkdownRemark(
        limit: 1024
      ) {
        nodes {
          id
          fields {
            slug
          }
          headings(depth: h1) { value }
        }
      }
      tagsGroup: allMarkdownRemark(
        limit: 2048
      ) {
        group(field: { frontmatter: { tags: SELECT }}) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error querying for notesRemark or tagsGroup',
      result.errors,
    );
    return;
  }

  const notes = result.data.notesRemark.nodes;

  // TODO: Find out why this can't be imported from utils
  const transformTitleToPath = (title) => {
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
          path: `/notes/${pagePath}`,
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

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${transformTitleToPath(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    // TODO: Investigate based on issue # 13 whether slug in this context is a filename
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
exports.createSchemaCustomization = ({ actions/*, schema*/ }) => {
  const { createTypes } = actions;
  // Attempt @ replicating example here:
  // https://www.gatsbyjs.com/docs/reference/config-files/actions/#createTypes
  // const typeDefs = [
  //   schema.buildInputObjectType({
  //     name: 'SiteMetadata',
  //     fields: {
  //       author: 'String!',
  //       siteUrl: 'String!'
  //     },
  //   })
  // ];

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

    type Fields {
      slug: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String!] @dontInfer
    }
  `);
};

// DELETEME Removed from boiler plate, might not be needed
// might also cause conflicting field types during build
// type Fields {
//   slug: String
// }