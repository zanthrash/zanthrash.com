module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addShortcode("postListItem", function (post) {
    return `
        <a href="${post.url}">
          <div class="p-4 bg-black bg-opacity-20 rounded-sm">
            <div class="text-pink-400 text-sm">
              ${post.date}
            </div>
            <h2 class="text-yellow-50 text-xl">
              ${post.title}
            </h2>
            <div>
              ${post.description}
            </div>
          </div>
        </a>
`;
  });
};
