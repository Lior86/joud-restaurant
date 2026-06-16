import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Our Story' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reservations', label: 'Reserve' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const navClass = [
    'navbar',
    scrolled || !isHome ? 'navbar--solid' : 'navbar--transparent',
    open ? 'navbar--open' : ''
  ].join(' ');

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <Link to="/" className="navbar__logo" aria-label="Joud — home">
        <span className="navbar__logo-script">Joud</span>
        <span className="navbar__logo-sub">Lebanese Cuisine</span>
      </Link>

      <ul className="navbar__links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/reservations" className="navbar__cta">Book a Table</Link>
        </li>
      </ul>

      <button
        className="navbar__burger"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <div className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`} aria-hidden={!open}>
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="navbar__mobile-link">{label}</Link>
            </li>
          ))}
          <li>
            <Link to="/reservations" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
              Book a Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
