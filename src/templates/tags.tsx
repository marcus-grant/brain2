import React, { FC } from 'react';

import { Link, graphql } from 'gatsby';

// TODO: Turn this into a function that queries then returns destructured vars
interface TagsProps {
  pageContext: {
    tag: string,
  },
  data: {
    allMarkdownRemark: {
      totalCount: number,
      edges: Array<{
        node: {
          frontmatter: {
            title: string,
          },
          fields: {
            slug: string,
          }
        },
      }>
    }
  },
}

const Tags: FC<TagsProps> = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;
  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      {/* This links to a page that doesn't yet exist.
      Comeback and add to it! */}
      <Link to="/tags">All Tags</Link>
    </div>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC }}
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;