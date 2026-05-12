import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  Button,
  Spinner,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const { selectedPosts, heading, showExcerpt, showImage, excerptLength } =
    attributes;

  const [search, setSearch] = useState("");

  const blockProps = useBlockProps({
    className: "associated-posts-block",
  });

  const searchResults = useSelect(
    (select) => {
      if (search.length < 2) return [];

      const posts = select(coreStore).getEntityRecords("postType", "post", {
        search,
        per_page: 5,
        _fields: "id,title,type",
      });

      const pages = select(coreStore).getEntityRecords("postType", "page", {
        search,
        per_page: 5,
        _fields: "id,title,type",
      });

      return [...(posts || []), ...(pages || [])];
    },
    [search]
  );

  const isLoading = useSelect(
    (select) => {
      if (search.length < 2) return false;

      return (
        !select(coreStore).hasFinishedResolution("getEntityRecords", [
          "postType",
          "post",
          { search, per_page: 5, _fields: "id,title,type" },
        ]) ||
        !select(coreStore).hasFinishedResolution("getEntityRecords", [
          "postType",
          "page",
          { search, per_page: 5, _fields: "id,title,type" },
        ])
      );
    },
    [search]
  );

  const previewPosts = useSelect(
    (select) => {
      if (selectedPosts.length === 0) return [];

      const ids = selectedPosts.map((p) => p.id);

      const posts = select(coreStore).getEntityRecords("postType", "post", {
        include: ids,
        per_page: ids.length,
        _fields: "id,title,excerpt,type,featured_media",
      });
      const pages = select(coreStore).getEntityRecords("postType", "page", {
        include: ids,
        per_page: ids.length,
        _fields: "id,title,excerpt,type,featured_media",
      });

      return [...(posts || []), ...(pages || [])];
    },
    [selectedPosts]
  );

  const media = useSelect(
    (select) => {
      if (!showImage || !previewPosts.length) return {};

      const result = {};

      previewPosts.forEach((post) => {
        if (post.featured_media) {
          const mediaItem = select(coreStore).getMedia(post.featured_media);
          if (mediaItem) {
            result[post.id] = mediaItem.source_url;
          }
        }
      });

      return result;
    },
    [previewPosts, showImage]
  );

  function addPost(post) {
    const already = selectedPosts.some(
      (p) => p.id === post.id && p.type === post.type
    );

    if (already) return;

    setAttributes({
      selectedPosts: [...selectedPosts, { id: post.id, type: post.type }],
    });
  }

  function removePost(id, type) {
    setAttributes({
      selectedPosts: selectedPosts.filter(
        (p) => !(p.id === id && p.type === type)
      ),
    });
  }

  function trimExcerpt(excerpt, length) {
    if (!excerpt) return "";

    const words = excerpt
      .replace(/<[^>]+>/g, "")
      .trim()
      .split(/\s+/);

    return words.slice(0, length).join(" ") + "...";
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Content Settings">
          <TextControl
            label="Search Posts & Pages"
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Type to search..."
          />

          {isLoading && <Spinner />}

          {!isLoading &&
            searchResults.map((post) => (
              <Button
                key={`${post.type}-${post.id}`}
                variant="secondary"
                onClick={() => addPost(post)}
                style={{
                  display: "block",
                  marginBottom: "4px",
                  width: "100%",
                }}
              >
                {post.title.rendered} ({post.type})
              </Button>
            ))}

          <ToggleControl
            label="Show Excerpt"
            checked={!!showExcerpt}
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

          <ToggleControl
            label="Show Featured Image"
            checked={!!showImage}
            onChange={(val) => setAttributes({ showImage: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="h3"
          className="associated-posts-heading"
          value={heading}
          onChange={(val) => setAttributes({ heading: val })}
          placeholder="Related Content"
        />

        {selectedPosts.length === 0 && (
          <p>No posts selected. Use the sidebar to search and add posts.</p>
        )}

        <ul className="associated-posts-list">
          {previewPosts.map((post) => (
            <li
              key={`${post.type}-${post.id}`}
              className="associated-posts-item"
            >
              <div className="associated-posts-item-link">
                <span className="post-type">{post.type}</span>
                {showImage && media[post.id] && (
                  <div className="associated-posts-thumbnail">
                    <img src={media[post.id]} alt="" />
                  </div>
                )}

                <div className="associated-posts-item-inner">
                  <span className="post-title">{post.title.rendered}</span>

                  {showExcerpt && (
                    <span className="post-excerpt">
                      {trimExcerpt(post.excerpt?.rendered, excerptLength)}
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="link"
                isDestructive
                onClick={() => removePost(post.id, post.type)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
