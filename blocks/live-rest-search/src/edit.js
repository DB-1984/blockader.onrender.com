import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  RangeControl,
  ToggleControl,
  CheckboxControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const {
    placeholder = "Search...",
    postTypes = ["post", "page"],
    resultLimit = 5,
    heading = "",
    showType = true,
    showExcerpt = false,
    excerptLength = 15,
  } = attributes;

  const blockProps = useBlockProps({
    className: "live-rest-search-block",
  });

  function togglePostType(type) {
    const updated = postTypes.includes(type)
      ? postTypes.filter((t) => t !== type)
      : [...postTypes, type];
    setAttributes({ postTypes: updated });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Search Settings">
          <TextControl
            label="Placeholder Text"
            value={placeholder}
            onChange={(val) => setAttributes({ placeholder: val })}
          />
          <RangeControl
            label="Result Limit"
            value={resultLimit}
            onChange={(val) => setAttributes({ resultLimit: val })}
            min={3}
            max={20}
          />
          <CheckboxControl
            label="Search Posts"
            checked={postTypes.includes("post")}
            onChange={() => togglePostType("post")}
          />
          <CheckboxControl
            label="Search Pages"
            checked={postTypes.includes("page")}
            onChange={() => togglePostType("page")}
          />
          <ToggleControl
            label="Show Post Type"
            checked={showType}
            onChange={(val) => setAttributes({ showType: val })}
          />
          <ToggleControl
            label="Show Excerpt"
            checked={showExcerpt}
            onChange={(val) => setAttributes({ showExcerpt: val })}
          />
          {showExcerpt && (
            <RangeControl
              label="Excerpt Length (words)"
              value={excerptLength}
              onChange={(val) => setAttributes({ excerptLength: val })}
              min={10}
              max={50}
            />
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="h3"
          value={heading}
          onChange={(val) => setAttributes({ heading: val })}
          placeholder="Search heading..."
        />

        <div className="live-rest-search-input-wrapper">
          <input
            type="text"
            className="live-rest-search-input"
            placeholder={placeholder}
            autoComplete="off"
            disabled
          />
        </div>

        <div className="live-rest-search-results">
          <p className="live-rest-search-preview">Results will appear here</p>
        </div>
      </div>
    </>
  );
}
