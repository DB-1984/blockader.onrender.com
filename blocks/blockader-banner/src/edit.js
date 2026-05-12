import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  URLInputButton,
  InspectorControls,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const {
    heading,
    content,
    buttonText,
    buttonUrl,
    imageUrl,
    imageAlt,
    buttonBackgroundColor,
    buttonTextColor,
    buttonHoverBackgroundColor,
    buttonHoverTextColor,
  } = attributes;

  const blockProps = useBlockProps({
    className: "blockader-banner",
    style: {
      "--banner-button-bg": buttonBackgroundColor,
      "--banner-button-text": buttonTextColor,
      "--banner-button-hover-bg": buttonHoverBackgroundColor,
      "--banner-button-hover-text": buttonHoverTextColor,
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelColorSettings
          title="Button Colours"
          colorSettings={[
            {
              value: buttonBackgroundColor,
              onChange: (value) =>
                setAttributes({ buttonBackgroundColor: value }),
              label: "Button background",
            },
            {
              value: buttonTextColor,
              onChange: (value) => setAttributes({ buttonTextColor: value }),
              label: "Button text",
            },
            {
              value: buttonHoverBackgroundColor,
              onChange: (value) =>
                setAttributes({ buttonHoverBackgroundColor: value }),
              label: "Button hover background",
            },
            {
              value: buttonHoverTextColor,
              onChange: (value) =>
                setAttributes({ buttonHoverTextColor: value }),
              label: "Button hover text",
            },
          ]}
        />
      </InspectorControls>
      <section {...blockProps}>
        <div className="blockader-banner__inner">
          <div className="blockader-banner__content">
            <RichText
              tagName="h1"
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              className="blockader-banner__heading"
            />

            <RichText
              tagName="p"
              value={content}
              onChange={(value) => setAttributes({ content: value })}
              placeholder={__("Add supporting text...", "blockader")}
              className="blockader-banner__text"
            />

            <div className="blockader-banner__actions">
              <RichText
                tagName="span"
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
                placeholder={__("Button text...", "blockader")}
                className="blockader-banner__button"
              />

              <URLInputButton
                url={buttonUrl}
                onChange={(url) => setAttributes({ buttonUrl: url })}
              />
            </div>
          </div>

          <div className="blockader-banner__media">
            {imageUrl ? (
              <>
                <img src={imageUrl} alt={imageAlt} />

                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) =>
                      setAttributes({
                        imageUrl: media.url,
                        imageAlt: media.alt || "",
                      })
                    }
                    allowedTypes={["image"]}
                    render={({ open }) => (
                      <Button
                        onClick={open}
                        variant="secondary"
                        className="blockader-banner__image-button"
                      >
                        {__("Replace image", "blockader")}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              </>
            ) : (
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) =>
                    setAttributes({
                      imageUrl: media.url,
                      imageAlt: media.alt || "",
                    })
                  }
                  allowedTypes={["image"]}
                  render={({ open }) => (
                    <Button onClick={open} variant="primary">
                      {__("Choose image", "blockader")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
