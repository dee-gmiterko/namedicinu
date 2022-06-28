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
    const blogArticleTemplate = path.resolve("src/templates/blog-article.js");
    const blogTagTemplate =  path.resolve("src/templates/blog-tag.js");

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
            remove: /[.\?]/g
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

        const allTags = [];

        result.data.allContentfulBlog.edges.forEach(edge => {
          const slug = slugify(edge.node.title||"", {
            remove: /[.\?]/g
          }).toLowerCase();

          createPage({
            path: "blog/"+slug,
            component: blogArticleTemplate,
            context: {
              slug: slug,
              title: edge.node.title,
              tags: edge.node.tags,
            }
          });

          edge.node.tags.forEach(tag => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        });

        allTags.forEach(tag => {
          const slug = slugify(tag, {
            remove: /[.\?]/g
          }).toLowerCase();

          createPage({
            path: "blog/tag/"+slug,
            component: blogTagTemplate,
            context: {
              slug: slug,
              tag: tag,
            }
          });
        });

        return;
      })
    );
  });
};
