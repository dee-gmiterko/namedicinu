/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path");
const slugify = require('slugify');
const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

let { spaceId, accessToken, locale } = process.env;

if (!locale) {
  locale = "sk";
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const documentTemplate = path.resolve("src/templates/document.js");
    const articleTemplate = path.resolve("src/templates/blog-article.js");

    resolve(
      graphql(`
        query DocumentsQuery($locale: String!) {
          allContentfulAsset(
            filter: {
              file: {contentType: {eq: "application/pdf"}}
              node_locale: { eq: $locale }
            }
          ) {
            edges {
              node {
                title
                file {
                  url
                }
              }
            }
          }
          allContentfulBlog(
            filter: {
              node_locale: { eq: $locale }
            }
          ) {
            edges {
              node {
                title
                tags
              }
            }
          }
        }
      `, { locale }).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.allContentfulAsset.edges.forEach(edge => {
          const slug = slugify(edge.node.title||"", {
            remove: '.'
          }).toLowerCase();

          createPage({
            path: "document/"+slug,
            component: documentTemplate,
            context: {
              slug: slug,
              title: edge.node.title,
              url: edge.node.file.url,
            }
          });
        });

        result.data.allContentfulBlog.edges.forEach(edge => {
          const slug = slugify(edge.node.title||"", {
            remove: '.'
          }).toLowerCase();

          createPage({
            path: "blog/"+slug,
            component: articleTemplate,
            context: {
              slug: slug,
              title: edge.node.title,
              tags: edge.node.tags,
            }
          });
        });

        return;
      })
    );
  });
};
