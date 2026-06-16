import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import './About.css';

const values = [
  { ar: 'جود', en: 'Generosity', desc: 'Every dish is an act of giving. We cook as our grandmothers did — with abundance, never restraint.' },
  { ar: 'أصالة', en: 'Authenticity', desc: 'Our recipes carry the weight of generations. We honour the source, then bring it fully alive.' },
  { ar: 'ضيافة', en: 'Hospitality', desc: 'In Lebanon, a guest is a blessing. At Joud, you are never just a customer — you are welcomed.' },
];

export default function About() {
  return (
    <PageTransition>
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="section-eyebrow">Who We Are</p>
          <h1 className="about-hero__title">Our Story</h1>
          <div className="gold-rule" style={{ margin: '1.25rem auto' }} />
        </div>
      </section>

      <section className="about-origin">
        <div className="about-origin__inner">
          <motion.div
            className="about-origin__text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-eyebrow">The Beginning</p>
            <h2 className="section-title">Born in the mountains,<br /><em>raised at the table</em></h2>
            <p className="about-body">
              Joud began not in a restaurant, but in a village kitchen in the mountains above Byblos.
              Our grandmother, Teta Mariam, cooked every Friday for anyone who arrived — family, neighbours,
              strangers passing through. She never asked how many were coming. She simply cooked more.
            </p>
            <p className="about-body">
              That philosophy — generosity without condition — is what we brought to Toronto when we opened
              Joud in 2019. The city gave us an extraordinary welcome, and we have been feeding it with
              the same open hands ever since.
            </p>
          </motion.div>
          <motion.div
            className="about-origin__img-wrap"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop"
              alt="The Joud kitchen"
            />
          </motion.div>
        </div>
      </section>

      <section className="about-values">
        <motion.div
          className="about-values__header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">What We Stand For</p>
          <h2 className="section-title">The principles<br /><em>behind every plate</em></h2>
          <div className="gold-rule" style={{ margin: '1.5rem auto 3rem' }} />
        </motion.div>

        <div className="about-values__grid">
          {values.map((v, i) => (
            <motion.div
              key={v.en}
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="value-card__arabic">{v.ar}</div>
              <h3 className="value-card__title">{v.en}</h3>
              <div className="gold-rule" style={{ margin: '1rem 0' }} />
              <p className="value-card__desc">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-chef">
        <div className="about-chef__inner">
          <motion.div
            className="about-chef__img-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=80&auto=format&fit=crop"
              alt="Chef Elias Karam"
            />
          </motion.div>
          <motion.div
            className="about-chef__text"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-eyebrow">The Kitchen</p>
            <h2 className="section-title">Chef Elias Karam</h2>
            <div className="gold-rule" style={{ margin: '1.25rem 0' }} />
            <p className="about-body">
              Elias trained under Georges Mazeh at Al Dente in Beirut before spending six years in
              the kitchens of London and Lyon. He returned to Lebanon with classical French technique
              and an unshakeable belief that Lebanese cuisine needs no improvement — only intention.
            </p>
            <p className="about-body">
              At Joud, Elias works directly with Lebanese farmers and importers to source ingredients
              as close to origin as possible. The za'atar is wild-harvested. The olive oil is single-estate.
              The lamb is halal and locally raised.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta__overlay" />
        <div className="about-cta__content">
          <h2 className="about-cta__title">Come and eat with us</h2>
          <div className="gold-rule" style={{ margin: '1.5rem auto' }} />
          <Link to="/reservations" className="btn-primary">Reserve Your Table</Link>
        </div>
      </section>
    </PageTransition>
  );
}
