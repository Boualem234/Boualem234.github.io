import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX, FiPlus, FiMinus, FiMaximize2 } from "react-icons/fi";
import { useLanguage } from "../i18n/LanguageContext";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;
const DOUBLE_CLICK_ZOOM = 2.5;

const Lightbox = ({ images = [], index = 0, onClose, onPrev, onNext, alt = "Project screenshot" }) => {
  const { lang } = useLanguage();
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const zoomWrapRef = useRef(null);

  const open = Array.isArray(images) && images.length > 0 && index !== null && index !== undefined;

  const resetZoom = useCallback(() => {
    setZoom(MIN_ZOOM);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
    dragStart.current = null;
  }, []);

  useEffect(() => {
    resetZoom();
  }, [index, open, resetZoom]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 100) / 100));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.round((z - ZOOM_STEP) * 100) / 100;
      if (next <= MIN_ZOOM) {
        setOffset({ x: 0, y: 0 });
        return MIN_ZOOM;
      }
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    resetZoom();
    onPrev?.();
  }, [onPrev, resetZoom]);

  const goNext = useCallback(() => {
    resetZoom();
    onNext?.();
  }, [onNext, resetZoom]);

  const handleKey = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
      if (e.key === "0") resetZoom();
    },
    [open, onClose, goPrev, goNext, zoomIn, zoomOut, resetZoom]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, handleKey]);

  const onWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else if (e.deltaY > 0) zoomOut();
  };

  const onDoubleClick = () => {
    if (zoom > MIN_ZOOM) {
      resetZoom();
    } else {
      setZoom(DOUBLE_CLICK_ZOOM);
    }
  };

  const onPointerDown = (e) => {
    if (zoom <= MIN_ZOOM) return;
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging || !dragStart.current || zoom <= MIN_ZOOM) return;
    const wrap = zoomWrapRef.current;
    const maxX = wrap ? (wrap.clientWidth * (zoom - 1)) / 2 : 200;
    const maxY = wrap ? (wrap.clientHeight * (zoom - 1)) / 2 : 200;
    const x = Math.max(-maxX, Math.min(maxX, e.clientX - dragStart.current.x));
    const y = Math.max(-maxY, Math.min(maxY, e.clientY - dragStart.current.y));
    setOffset({ x, y });
  };

  const onPointerUp = () => {
    setDragging(false);
    dragStart.current = null;
  };

  const closeLabel = lang === "en" ? "Close" : "Fermer";
  const prevLabel = lang === "en" ? "Previous image" : "Image précédente";
  const nextLabel = lang === "en" ? "Next image" : "Image suivante";
  const zoomInLabel = lang === "en" ? "Zoom in" : "Zoomer";
  const zoomOutLabel = lang === "en" ? "Zoom out" : "Dézoomer";
  const resetLabel = lang === "en" ? "Reset zoom" : "Réinitialiser le zoom";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightboxOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} ${index + 1}/${images.length}`}
        >
          <motion.figure
            className="lightboxContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="lightboxZoomWrap"
              ref={zoomWrapRef}
              onWheel={onWheel}
              onDoubleClick={onDoubleClick}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ cursor: zoom > MIN_ZOOM ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
            >
              <img
                src={images[index]}
                alt={`${alt} ${index + 1}/${images.length}`}
                className="lightboxImg"
                draggable={false}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transition: dragging ? "none" : "transform 0.15s ease-out",
                }}
              />
            </div>
            <div className="lightboxToolbar" onClick={(e) => e.stopPropagation()}>
              <div className="lightboxZoomControls">
                <button type="button" className="lightboxToolBtn" onClick={zoomOut} aria-label={zoomOutLabel} disabled={zoom <= MIN_ZOOM}>
                  <FiMinus />
                </button>
                <button type="button" className="lightboxZoomLevel" onClick={resetZoom} aria-label={resetLabel} title={resetLabel}>
                  {Math.round(zoom * 100)}%
                </button>
                <button type="button" className="lightboxToolBtn" onClick={zoomIn} aria-label={zoomInLabel} disabled={zoom >= MAX_ZOOM}>
                  <FiPlus />
                </button>
              </div>
              <figcaption className="lightboxCounter">
                {index + 1} / {images.length}
              </figcaption>
              <span className="lightboxHint" aria-hidden="true">
                <FiMaximize2 /> {Math.round(zoom * 100)}%
              </span>
            </div>
            <button type="button" className="lightboxClose" onClick={onClose} aria-label={closeLabel}>
              <FiX />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightboxNav lightboxPrev"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label={prevLabel}
                >
                  <FiChevronLeft />
                </button>
                <button
                  type="button"
                  className="lightboxNav lightboxNext"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label={nextLabel}
                >
                  <FiChevronRight />
                </button>
              </>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
