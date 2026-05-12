import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    placeholder = "Search...",
    heading = "",
    postTypes = ["post", "page"],
    resultLimit = 5,
    showType = true,
    showExcerpt = false,
    excerptLength = 15,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: "live-rest-search-block",
    "data-post-types": JSON.stringify(postTypes),
    "data-result-limit": resultLimit,
    "data-show-type": showType,
    "data-show-excerpt": showExcerpt,
    "data-excerpt-length": excerptLength,
  });

  return (
    <div {...blockProps}>
      {heading && <RichText.Content tagName="h3" value={heading} />}

      <div className="live-rest-search-input-wrapper">
        <input
          type="text"
          className="live-rest-search-input"
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>

      <div className="live-rest-search-results"></div>
    </div>
  );
}
