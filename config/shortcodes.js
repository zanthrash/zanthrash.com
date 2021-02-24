const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("lastUpdated", function () {
    return String(new Date().toISOString().split("T")[0]);
  });

  eleventyConfig.addShortcode("year", function () {
    var year = DateTime.local().year;
    return String(year);
  });

  eleventyConfig.addShortcode("postListItem", function (post) {
    return `
        <a href="${post.url}">
          <div class="space-x-5 flex flex-row p-4 bg-black bg-opacity-20 rounded-sm">
            <div class="text-pink-400 font-semibold flex flex-col items-center">
              <div class="text-lg tracking-widest">
              ${post.year}
              </div>
              <div>
                <span>${post.month}</span> <span>${post.day}</span>
              </div>
            </div>
            <div >
              <h2 class="text-gray-50 text-xl">
                ${post.title}
              </h2>
              <div class="text-purple-300">
                ${post.description}
              </div>
            </div>
          </div>
        </a>
`;
  });
};
