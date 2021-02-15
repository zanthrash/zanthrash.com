const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlighting = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItClass = require("@toycode/markdown-it-class");
const markdownEmoji = require("markdown-it-emoji");
const markdownHeaderLinks = require("@gerhobbelt/markdown-it-github-headings");
const markdownDefList = require("markdown-it-deflist");

const mapping = {
  h1: ["text-4xl"],
  h2: ["text-3xl"],
  blockquote: ["text-gray-400 border-l-8 border-purple-500 py-3"],
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlighting);

  //markdown-it config
  const md = markdownIt({ linkify: true, html: true, typographer: true });
  // md.use(markdownItClass, mapping);
  md.use(markdownEmoji);
  md.use(markdownDefList);
  // md.use(markdownHeaderLinks);
  eleventyConfig.setLibrary("md", md);
};
