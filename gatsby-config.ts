// TODO: Convert to Typescript
import type { GatsbyConfig } from 'gatsby';
const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Markipedia',
    author: 'Marcus Grant',
    siteUrl: 'https://wiki.marcusgrant.dev',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'icon': 'src/images/icon.png',
      },
    },
    // TODO: No longer maintained, consider maintaining yourself
    // {
    //   resolve: "gatsby-source-git",
    //   options: {
    //     remote: "https://github.com/marcus-grant/notes",
    //     branch: "main",
    //     patterns: ["*.{md,png,jpg}"],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    // "gatsby-plugin-mdx",
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'images',
        'path': './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/notes`,
        name: 'notes',
        // ignore: [`${__dirname}/content/notes/.zk`, `${__dirname}/content/notes/.zk`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/notes`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
  ],
};

export default config;
