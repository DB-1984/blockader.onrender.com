(function () {
  // Find all instances of the block on the page
  const blocks = document.querySelectorAll(".live-rest-search-block");

  if (!blocks.length) return;

  blocks.forEach(function (block) {
    const input = block.querySelector(".live-rest-search-input");
    const results = block.querySelector(".live-rest-search-results");

    if (!input || !results) return;

    // Read block attributes from data attributes on the wrapper
    const postTypes = JSON.parse(block.dataset.postTypes || '["post","page"]');
    const resultLimit = parseInt(block.dataset.resultLimit || 5);
    const showType = block.dataset.showType === "true";
    const showExcerpt = block.dataset.showExcerpt === "true";
    const excerptLength = parseInt(block.dataset.excerptLength || 15);

    let debounceTimer;

    input.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      const query = input.value.trim();

      if (query.length < 2) {
        results.innerHTML = "";
        return;
      }

      debounceTimer = setTimeout(function () {
        fetchResults(query);
      }, 300);
    });

    async function fetchResults(query) {
      results.innerHTML =
        '<p class="live-rest-search-loading">Searching...</p>';

      try {
        // Build fetch promises for each post type
        const requests = postTypes.map((type) =>
          fetch(
            `/wp-json/wp/v2/${
              type === "post" ? "posts" : "pages"
            }?search=${encodeURIComponent(
              query
            )}&per_page=${resultLimit}&_fields=id,title,excerpt,link,type`
          ).then((res) => res.json())
        );

        const responses = await Promise.all(requests);

        // Flatten results from all post types into one array
        const allResults = responses.flat();

        if (!allResults.length) {
          results.innerHTML =
            '<p class="live-rest-search-empty">No results found.</p>';
          return;
        }

        // Trim excerpt to excerptLength words
        function trimExcerpt(html, length) {
          const text = html.replace(/<[^>]+>/g, "").trim();
          return text.split(/\s+/).slice(0, length).join(" ") + "...";
        }

        const html = allResults
          .map(
            (post) => `
            <a href="${post.link}" class="live-rest-search-result">
              ${showType ? `<span class="result-type">${post.type}</span>` : ""}
              <div class="result-inner">
                <span class="result-title">${post.title.rendered}</span>
                ${
                  showExcerpt
                    ? `<span class="result-excerpt">${trimExcerpt(
                        post.excerpt.rendered,
                        excerptLength
                      )}</span>`
                    : ""
                }
              </div>
            </a>
          `
          )
          .join("");

        results.innerHTML = `<div class="live-rest-search-results-inner">${html}</div>`;
      } catch (error) {
        results.innerHTML =
          '<p class="live-rest-search-error">Something went wrong. Please try again.</p>';
      }
    }
  });
})();
