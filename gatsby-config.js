const config = {
  start_url: '/',
  background_color: '#663399',
  theme_color: '#663399',
};

module.exports = {
  pathPrefix: '/til',
  siteMetadata: {
    title: 'TIL',
    description: 'Today I Learned',
    author: '@dididy',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography.js`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/TIL`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        gfm: true,
        commonmark: false,
        footnotes: false,
        pedantic: false,
        excerpt_separator: '<!-- end -->',
        plugins: [
          {
            resolve: 'gatsby-remark-highlight-code',
            options: {
              terminal: 'carbon',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: config.start_url,
        background_color: config.background_color,
        theme_color: config.theme_color,
        display: 'minimal-ui',
        icon: `${__dirname}/src/images/icon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
};
