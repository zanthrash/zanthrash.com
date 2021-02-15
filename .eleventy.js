const Image = require("@11ty/eleventy-img");
const addShortcodes = require("./config/shortcodes");
const addCollections = require("./config/collections");
const addPlugins = require("./config/plugins");
const addFilters = require("./config/filters");

async function imageShortcode(src, alt, clazz, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    // formats: ["jpeg", "png", "webp"],
    outputDir: "./_site/img",
  });

  let imageAttributes = {
    alt,
    sizes,
    class: clazz,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addWatchTarget("./_tmp/style.css");
  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy({ "./assets/favicon/*.*": "./" });
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  addPlugins(eleventyConfig);
  addShortcodes(eleventyConfig);
  addCollections(eleventyConfig);
  addFilters(eleventyConfig);
};
