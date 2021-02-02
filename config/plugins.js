const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlighting = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItClass = require("@toycode/markdown-it-class");

// const mapping = {
//   h1: ["text-4xl"],
//   h2: ["text-3xl"],
// };

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlighting);

  //markdown-it config
  // const md = markdownIt({ linkify: true, html: true });
  // md.use(markdownItClass, mapping);
  // eleventyConfig.setLibrary("md", md);
};
