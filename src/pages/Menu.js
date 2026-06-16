import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Menu.css';

const categories = ['All', 'Mezze', 'Salads', 'Mains', 'Grill', 'Desserts', 'Drinks'];

const items = [
  { name: 'Hummus Beiruty', desc: 'Hand-blended chickpea, tahini, lemon, hot olive oil, pine nuts', price: '$14', cat: 'Mezze' },
  { name: 'Mutabbal', desc: 'Fire-roasted eggplant, tahini, pomegranate molasses, fresh herbs', price: '$13', cat: 'Mezze' },
  { name: 'Kibbeh Nayeh', desc: 'Lamb tartare, fine bulgur, onion, spices, olive oil — served raw', price: '$18', cat: 'Mezze' },
  { name: 'Warak Dawali', desc: 'Vine leaves stuffed with spiced rice and lamb, lemon broth', price: '$16', cat: 'Mezze' },
  { name: 'Labneh Makdous', desc: 'Strained yoghurt, walnut-stuffed pickled eggplant, za\'atar oil', price: '$15', cat: 'Mezze' },
  { name: 'Sambousek', desc: 'Crisp pastry pockets, spiced ground lamb, caramelized onion', price: '$14', cat: 'Mezze' },

  { name: 'Fattoush Al Joud', desc: 'Heirloom tomatoes, sumac cucumber, pomegranate, house khubz', price: '$17', cat: 'Salads' },
  { name: 'Tabbouleh', desc: 'Fine bulgur, flat-leaf parsley, mint, tomato, lemon', price: '$14', cat: 'Salads' },
  { name: 'Rocca & Halloumi', desc: 'Wild arugula, grilled halloumi, roasted grape, date syrup', price: '$19', cat: 'Salads' },

  { name: 'Ouzi Lamb Shoulder', desc: 'Slow-roasted 12 hours, saffron rice, caramelized onion, almond', price: '$52', cat: 'Mains' },
  { name: 'Samak Bil Tahini', desc: 'Whole branzino, tahini sauce, caramelized onion, sumac', price: '$46', cat: 'Mains' },
  { name: 'Djaj Meshwi', desc: 'Free-range chicken, garlic toum, pickled turnip, flatbread', price: '$38', cat: 'Mains' },
  { name: 'Maqlouba', desc: 'Layered rice, roasted cauliflower, lamb, spiced broth — for two', price: '$68', cat: 'Mains' },

  { name: 'Mixed Grill Platter', desc: 'Kafta, shish tawook, lamb chops, grilled vegetables, garlic bread', price: '$65', cat: 'Grill' },
  { name: 'Kafta Mashwiyye', desc: 'Spiced ground lamb skewer, sumac onion, parsley', price: '$28', cat: 'Grill' },
  { name: 'Lamb Chops', desc: 'Herb-marinated rack, pomegranate jus, roasted garlic', price: '$48', cat: 'Grill' },
  { name: 'Shish Tawook', desc: 'Free-range chicken, toum, charred lemon', price: '$26', cat: 'Grill' },

  { name: 'Mhalabiyye', desc: 'Rose water milk pudding, crushed pistachio, honey', price: '$12', cat: 'Desserts' },
  { name: 'Knafeh', desc: 'Shredded pastry, Akkawi cheese, orange blossom syrup', price: '$14', cat: 'Desserts' },
  { name: 'Baklawa Assortment', desc: 'Five varieties, house-made, pistachio, walnut, cashew', price: '$16', cat: 'Desserts' },
  { name: 'Aish El Saraya', desc: 'Bread pudding, clotted cream, rose blossom syrup', price: '$13', cat: 'Desserts' },

  { name: 'Jallab', desc: 'Rose, grape, tamarind, pine nuts — non-alcoholic', price: '$9', cat: 'Drinks' },
  { name: 'Lebanese Arak', desc: 'Anise spirit, water, ice — the traditional way', price: '$14', cat: 'Drinks' },
  { name: 'Ayran', desc: 'Chilled salted yoghurt drink', price: '$7', cat: 'Drinks' },
  { name: 'Arabic Coffee', desc: 'Cardamom-spiced, served with dates', price: '$6', cat: 'Drinks' },
];

export default function Menu() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? items : items.filter(i => i.cat === active);

  return (
    <PageTransition>
      <section className="menu-hero">
        <div className="menu-hero__overlay" />
        <div className="menu-hero__content">
          <p className="section-eyebrow">Our Kitchen</p>
          <h1 className="menu-hero__title">The Menu</h1>
          <div className="gold-rule" style={{ margin: '1.25rem auto' }} />
          <p className="menu-hero__sub">Seasonal ingredients, ancient recipes, modern soul</p>
        </div>
      </section>

      <section className="menu-section">
        <div className="menu-section__inner">
          <nav className="menu-filters" aria-label="Menu categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`menu-filter ${active === cat ? 'menu-filter--active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="menu-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {filtered.map((item) => (
                <div key={item.name} className="menu-item">
                  <div className="menu-item__top">
                    <h3 className="menu-item__name">{item.name}</h3>
                    <span className="menu-item__price">{item.price}</span>
                  </div>
                  <p className="menu-item__desc">{item.desc}</p>
                  <span className="menu-item__cat">{item.cat}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="menu-note">
        <p>All dishes are prepared with halal ingredients. Please inform your server of any dietary restrictions or allergies.</p>
        <p style={{ marginTop: '0.5rem' }}>Prices are subject to change. HST not included.</p>
      </section>
    </PageTransition>
  );
}
