/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path");
const slugify = require("slugify");
const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

let { locale } = process.env;

if (!locale) {
  locale = "sk";
}

// let pathTranslations;
// if (locale === "sk") {
//   pathTranslations = {
//     "document": "dokument",
//     "fields": "odbory",
//     "order": "objednavka",
//   }
// } else {
//   pathTranslations = {
//     "document": "dokument",
//     "fields": "obory",
//     "order": "objednavka",
//   }
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const documentTemplate = path.resolve("src/templates/document.js");
    const blogArticleTemplate = path.resolve("src/templates/blog-article.js");
    const blogTagTemplate = path.resolve("src/templates/blog-tag.js");
    const studyFieldTemplate = path.resolve("src/templates/study-field.js");

    resolve(
      graphql(
        `
          query DocumentsQuery($locale: String!) {
            allContentfulAsset(
              filter: {
                file: { contentType: { eq: "application/pdf" } }
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
              filter: { node_locale: { eq: $locale }, showOn: { eq: $locale } }
            ) {
              edges {
                node {
                  title
                  tags
                }
              }
            }
            allContentfulStudyField(filter: { node_locale: { eq: $locale } }) {
              edges {
                node {
                  title
                }
              }
            }
          }
        `,
        { locale }
      ).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.allContentfulAsset.edges.forEach(({ node }) => {
          const slug = slugify(node.title || "", {
            remove: /[.\?]/g,
          }).toLowerCase();

          createPage({
            path: "document/" + slug,
            component: documentTemplate,
            context: {
              slug: slug,
              title: node.title,
              url: node.file.url,
            },
          });
        });

        const allTags = [];

        result.data.allContentfulBlog.edges.forEach(({ node }) => {
          const slug = slugify(node.title || "", {
            remove: /[.\?]/g,
          }).toLowerCase();

          createPage({
            path: "blog/" + slug,
            component: blogArticleTemplate,
            context: {
              slug: slug,
              title: node.title,
              tags: node.tags,
            },
          });

          node.tags.forEach((tag) => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        });

        allTags.forEach((tag) => {
          const slug = slugify(tag, {
            remove: /[.\?]/g,
          }).toLowerCase();

          createPage({
            path: "blog/tag/" + slug,
            component: blogTagTemplate,
            context: {
              slug: slug,
              tag: tag,
            },
          });
        });

        result.data.allContentfulStudyField.edges.forEach(({ node }) => {
          const slug = slugify(node.title || "", {
            remove: /[.\?]/g,
          }).toLowerCase();

          createPage({
            path: "field/" + slug,
            component: studyFieldTemplate,
            context: {
              slug: slug,
              title: node.title,
            },
          });
        });

        // Object.entries(pathTranslations).forEach(([page, localePath]) => {
        //   const filePath = path.resolve(`src/pages/${page}.js`);
        //   createPage({
        //     path: localePath,
        //     component: filePath,
        //   });
        // });

        return;
      })
    );
  });
};
