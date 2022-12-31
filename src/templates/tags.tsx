import React, { FC } from 'react';

import { Link, graphql } from 'gatsby';
import { transformTitleToPath } from '../util/meta-utils';

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
          headings: Array<{
            value: string
          }>,
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
          const slug = transformTitleToPath(node.fields.slug);
          const title = node.headings[0].value || 'untitled';
          const path = transformTitleToPath(title);
          return (
            <li key={slug}>
              <Link to={`/notes/${path}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
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
          headings(depth: h1) { value }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;