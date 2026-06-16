import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Home.css';

const HERO_BG = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&q=80&auto=format&fit=crop';
const STORY_IMG = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format&fit=crop';

const dishes = [
  {
    name: 'Kibbeh Nayeh',
    desc: 'Hand-pounded lamb tartare, bulgur wheat, pine nuts, cold-pressed olive oil',
    tag: 'Signature',
    img: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Fattoush Al Joud',
    desc: 'Heirloom tomatoes, sumac-cured cucumber, pomegranate, house-fried khubz',
    tag: 'Garden',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Ouzi Lamb Shoulder',
    desc: 'Slow-roasted 12 hours, saffron rice, caramelized onion, toasted almond',
    tag: 'Chef\'s Table',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop',
  },
];

const testimonials = [
  { quote: 'A revelation. This is Lebanese cuisine the way it was meant to be experienced.', author: 'Toronto Life' },
  { quote: 'Joud is the most transportive dining experience in the city right now.', author: 'Globe & Mail' },
  { quote: 'The lamb shoulder alone is worth the drive from anywhere in Ontario.', author: 'NOW Magazine' },
];

function useParallax(speed = 0.3) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY * speed;
      el.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`fadein ${visible ? 'fadein--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const parallaxRef = useParallax(0.25);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section className="hero" aria-label="Welcome to Joud">
        <div className="hero__bg-wrap" ref={parallaxRef}>
          <img src={HERO_BG} alt="Joud dining room" className="hero__bg" />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Lebanese Cuisine · Toronto
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9 }}
          >
            Joud
          </motion.h1>
          <motion.div
            className="hero__rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
          />
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Where generosity is the ingredient
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Link to="/reservations" className="btn-primary">Reserve a Table</Link>
            <Link to="/menu" className="btn-outline">Explore the Menu</Link>
          </motion.div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── STORY STRIP ── */}
      <section className="story">
        <FadeIn className="story__img-wrap">
          <img src={STORY_IMG} alt="The Joud kitchen" className="story__img" />
        </FadeIn>
        <div className="story__text">
          <FadeIn delay={100}>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-title">Generosity passed<br /><em>down through generations</em></h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="story__body">
              Joud — جود — is the Arabic word for generosity. It is the philosophy our grandmother cooked by,
              and the one we carry into every plate we send from this kitchen. Born in the mountains of
              northern Lebanon, raised at a table that was never too full to welcome one more.
            </p>
            <Link to="/about" className="btn-outline" style={{ marginTop: '2rem', display: 'inline-block' }}>
              Read Our Story
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURED DISHES ── */}
      <section className="featured">
        <FadeIn>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>From the Kitchen</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Dishes worth the journey
          </h2>
          <div className="gold-rule" style={{ marginBottom: '3.5rem' }} />
        </FadeIn>

        <div className="featured__grid">
          {dishes.map((dish, i) => (
            <FadeIn key={dish.name} delay={i * 120}>
              <div className="dish-card">
                <div className="dish-card__img-wrap">
                  <img src={dish.img} alt={dish.name} className="dish-card__img" loading="lazy" />
                  <span className="dish-card__tag">{dish.tag}</span>
                </div>
                <div className="dish-card__body">
                  <h3 className="dish-card__name">{dish.name}</h3>
                  <p className="dish-card__desc">{dish.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/menu" className="btn-primary">View Full Menu</Link>
          </div>
        </FadeIn>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="testimonial">
        <div className="testimonial__inner">
          <div className="testimonial__quote-mark" aria-hidden="true">"</div>
          <motion.blockquote
            key={quoteIdx}
            className="testimonial__text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {testimonials[quoteIdx].quote}
          </motion.blockquote>
          <cite className="testimonial__author">{testimonials[quoteIdx].author}</cite>
          <div className="testimonial__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial__dot ${i === quoteIdx ? 'testimonial__dot--active' : ''}`}
                onClick={() => setQuoteIdx(i)}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVE CTA ── */}
      <section className="reserve-cta">
        <div
          className="reserve-cta__bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&q=80&auto=format&fit=crop)` }}
        />
        <div className="reserve-cta__overlay" />
        <FadeIn className="reserve-cta__content">
          <p className="section-eyebrow">Join Us</p>
          <h2 className="reserve-cta__title">Every evening<br />begins with a reservation</h2>
          <div className="gold-rule" style={{ margin: '1.5rem auto' }} />
          <p className="reserve-cta__sub">Private dining and event spaces available</p>
          <Link to="/reservations" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
            Book Your Table
          </Link>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
