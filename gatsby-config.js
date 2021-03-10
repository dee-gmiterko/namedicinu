const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

const { spaceId, accessToken, locale } = process.env;

console.log("Using locale "+(locale || "sk"));

module.exports = {
  siteMetadata: {
    title: `Na medicinu`,
    description: `Course site`,
    author: `Dominik Gmiterko <d.gmiterko@gmail.com>`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {
          locale: locale || "sk"
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId,
        accessToken
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Na medicinu`,
        short_name: `Na medicinu`,
        start_url: `/`,
        background_color: `#663399`, // TODO
        theme_color: `#333`, // TODO
        icon: `src/images/fev_icon.png` // TODO
      }
    }, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`
  ]
};
