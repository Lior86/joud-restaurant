import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Gallery.css';

const photos = [
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80&auto=format&fit=crop', alt: 'The dining room at Joud', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80&auto=format&fit=crop', alt: 'Candlelit table setting' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop', alt: 'A spread of mezze' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop', alt: 'The kitchen at work' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80&auto=format&fit=crop', alt: 'Ouzi lamb shoulder', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop', alt: 'Fattoush salad' },
  { src: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=600&q=80&auto=format&fit=crop', alt: 'Kibbeh plate' },
  { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80&auto=format&fit=crop', alt: 'Dessert platter' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80&auto=format&fit=crop', alt: 'Private dining room' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox(i => (i + 1) % photos.length);

  return (
    <PageTransition>
      <section className="gallery-hero">
        <div className="gallery-hero__overlay" />
        <div className="gallery-hero__content">
          <p className="section-eyebrow">The Space & The Table</p>
          <h1 className="gallery-hero__title">Gallery</h1>
          <div className="gold-rule" style={{ margin: '1.25rem auto' }} />
        </div>
      </section>

      <section className="gallery-section">
        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`gallery-item ${photo.span === 'wide' ? 'gallery-item--wide' : ''}`}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="gallery-item__overlay">
                <span className="gallery-item__expand" aria-hidden="true">+</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button className="lightbox__close" aria-label="Close" onClick={() => setLightbox(null)}>✕</button>
            <button className="lightbox__prev" aria-label="Previous photo" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
            <motion.img
              key={lightbox}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="lightbox__img"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            />
            <button className="lightbox__next" aria-label="Next photo" onClick={e => { e.stopPropagation(); next(); }}>›</button>
            <p className="lightbox__caption">{photos[lightbox].alt}</p>
            <p className="lightbox__counter">{lightbox + 1} / {photos.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
