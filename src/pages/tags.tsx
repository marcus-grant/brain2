import React, { FC } from 'react';

// Utils
// import kebabCase from 'lodash.kebabcase';
import { transformTitleToPath } from '../util/meta-utils';

// Components
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';

interface TagsPageProps {
  data: {
    allMarkdownRemark: {
      group: Array<{
        fieldValue: string,
        totalCount: number,
      }>
    },
    site: {
      siteMetadata: {
        title: string,
        siteUrl?: string,
        author?: string,
      },
    },
  },
}

const TagsPage: FC<TagsPageProps> = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <Helmet title={title} />
    <div>
      <h1>Tags</h1>
      <ul>{
        group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${transformTitleToPath(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))
      }</ul>
    </div>
  </div>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2048
    ) {
      group(
        field: { frontmatter: { tags: SELECT }}
      ) {
        fieldValue
        totalCount
      }
    }
  }
`;

