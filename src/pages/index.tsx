import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const HomePage: FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <SEO title="About" />
      <h1>{siteTitle}</h1>
      <p>this will be the home page</p>
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
  }
`;