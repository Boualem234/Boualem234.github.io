import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import Image from "./Image";
import Lightbox from "./Lightbox";
import { useLanguage } from "../i18n/LanguageContext";

const Carousel = ({ images = [], alt = "Project screenshot" }) => {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const list = Array.isArray(images) && images.length > 0 ? images : [];
  const lightboxOpen = lightboxIndex !== null && lightboxIndex !== undefined;

  useEffect(() => {
    setIndex(0);
  }, [list.length]);

  const prev = useCallback(() => {
    setIndex((i) => (list.length === 0 ? 0 : (i - 1 + list.length) % list.length));
  }, [list.length]);

  const next = useCallback(() => {
    setIndex((i) => (list.length === 0 ? 0 : (i + 1) % list.length));
  }, [list.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, lightboxOpen]);

  if (list.length === 0) return null;

  const prevLabel = lang === "en" ? "Previous image" : "Image précédente";
  const nextLabel = lang === "en" ? "Next image" : "Image suivante";
  const zoomLabel = lang === "en" ? "View fullscreen" : "Voir en plein écran";

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const lightboxPrev = () =>
    setLightboxIndex((i) => (list.length === 0 ? 0 : ((i ?? 0) - 1 + list.length) % list.length));
  const lightboxNext = () => setLightboxIndex((i) => (list.length === 0 ? 0 : ((i ?? 0) + 1) % list.length));

  if (list.length === 1) {
    return (
      <div className="carousel">
        <button type="button" className="carouselMain carouselZoomable" onClick={() => openLightbox(0)} aria-label={zoomLabel}>
          <Image src={list[0]} alt={alt} />
          <span className="carouselZoomHint" aria-hidden="true">
            <FiMaximize2 />
          </span>
        </button>
        <Lightbox
          images={list}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
          alt={alt}
        />
      </div>
    );
  }

  return (
    <div
      className="carousel"
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (dx > 40) prev();
        if (dx < -40) next();
        setTouchX(null);
      }}
    >
      <button type="button" className="carouselMain carouselZoomable" onClick={() => openLightbox(index)} aria-label={zoomLabel}>
        <Image key={list[index]} src={list[index]} alt={`${alt} ${index + 1}/${list.length}`} />
        <span className="carouselZoomHint" aria-hidden="true">
          <FiMaximize2 />
        </span>
      </button>
      <div className="carouselControls">
        <button className="carouselBtn carouselPrev" onClick={prev} aria-label={prevLabel} type="button">
          <FiChevronLeft />
        </button>
        <span className="carouselCounter">
          {index + 1}/{list.length}
        </span>
        <button className="carouselBtn carouselNext" onClick={next} aria-label={nextLabel} type="button">
          <FiChevronRight />
        </button>
      </div>
      <div className="carouselThumbs">
        {list.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`carouselThumb ${i === index ? "active" : ""}`}
            aria-label={`Voir image ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <Lightbox
        images={list}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={lightboxPrev}
        onNext={lightboxNext}
        alt={alt}
      />
    </div>
  );
};

export default Carousel;
