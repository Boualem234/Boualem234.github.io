import { useState } from "react";

/**
 * Represents an image component with loading spinner.
 *
 * @component
 * @param {string} src - The source URL of the image.
 * @param {string} height - The height of the image container.
 * @param {string} width - The width of the image container.
 * @param {string} size - The size of the loading spinner.
 * @param {string} alt - The alternative text for the image.
 * @param {string} opacity - The opacity of the image.
 */

export default function Image({ src, height, width, size, alt, opacity, objectFit = "contain" }) {
  // State to manage image loading status
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="imgWrap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width ? width : "100%",
        height: height ? height : "100%",
        position: "relative",
      }}
    >
      {/* Image */}
      {!failed && (
        <img
          src={src}
          className="fadeIn"
          loading="lazy"
          style={{
            visibility: loading ? "hidden" : "visible",
            width: "100%",
            height: "100%",
            objectFit,
            opacity: opacity ? opacity : "1",
          }}
          onLoad={() => {
            setLoading(false); // Set loading to false when the image is loaded
          }}
          onError={() => {
            setFailed(true);
            setLoading(false);
          }}
          alt={alt} // Alt text for the image
        />
      )}
      {/* Loading spinner */}
      {loading && !failed && (
        <div
          className="spinner imgSpinner"
          style={{
            fontSize: size ? size : "24px",
          }}
        ></div>
      )}
    </div>
  );
}
