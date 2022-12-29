import React, { FC } from 'react';
import { graphql, Link, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { transformTitleToPath } from '../util/meta-utils';

interface NoteLinkProps {
  id: string,
  path: string,
  excerpt: string,
  title: string,
}

const NoteLink: FC<NoteLinkProps> = ({
  id,
  path,
  excerpt,
  title,
}) => {
  return (
    <div>
      <Link to={path} id={id}>
        <h3>{title}</h3>
        <p>{excerpt}</p>
      </Link>
    </div>
  );
};

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}


const HomePage: FC<PageProps<DataProps>> = ({
  data: {
    allMarkdownRemark: { edges },
    ...data
  },
  location,
}) => {
  const notes = edges
    .filter(edge => edge.node.headings.length > 0)
    .map(edge => (
      <NoteLink
        // id={edge.id}
        path={transformTitleToPath(edge.node.headings[0].value)}
        title={edge.node.headings[0].value}
        excerpt={edge.node.excerpt}
      />
    ));
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <SEO title="About" />
      <h1>{siteTitle}</h1>
      <p>{`Current path: ${location.pathname}`}</p>
      <p>this will be the home page</p>
      {notes}
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          headings(depth: h1) {
            value
          }
        }
      }
    }
  }
`;