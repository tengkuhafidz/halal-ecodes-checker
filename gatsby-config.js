/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: 'Halal ECodes Checker',
    titleTemplate: '%s',
    description: 'A list of ECodes/additives with their details and halal status',
    author: 'Fidz.Dev',
    url: 'https://fidz.dev', // No trailing slash allowed!
    image: '/app-banner.png', // Path to your image you placed in the 'static' folder
    twitterUsername: 'sohafidz',
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Halal ECodes Checker`,
        short_name: `ECodes Checker`,
        start_url: `/`,
        background_color: `#F7FAFC`,
        theme_color: `#2B6CB0`,
        display: `standalone`,
        icon: `static/app-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-google-sheets-flexible",
      options: {
          apiKey: "AIzaSyCQQlbvNPEp21LLRsA_S0-X5R2aRFXph-o",
          spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1FaCByoyYMsWg25aaeHMyBsAW3oRpZa27SkjCQeYYwuE/edit#gid=0",
          tabName: "ecodes",
          cellRange: "A1:E1000",
      },
  },
  ],
}
