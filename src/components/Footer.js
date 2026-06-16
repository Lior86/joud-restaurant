import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__script">Joud</span>
          <p className="footer__tagline">Where generosity is the ingredient</p>
          <div className="gold-rule" style={{ margin: '1.5rem 0' }} />
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__heading">Visit Us</h4>
            <p>1842 Yonge Street</p>
            <p>Toronto, Ontario</p>
            <p>M4S 1Y2</p>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Hours</h4>
            <p>Mon – Thu: 5pm – 11pm</p>
            <p>Fri – Sat: 5pm – 1am</p>
            <p>Sunday: 4pm – 10pm</p>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <p>(416) 555-0192</p>
            <p>hello@joudrestaurant.ca</p>
            <div className="footer__social">
              <a href="#instagram" aria-label="Instagram">IG</a>
              <a href="#facebook" aria-label="Facebook">FB</a>
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Navigate</h4>
            <ul>
              {[['/', 'Home'], ['/about', 'Our Story'], ['/menu', 'Menu'], ['/gallery', 'Gallery'], ['/reservations', 'Reservations']].map(([to, label]) => (
                <li key={to}><Link to={to} className="footer__link">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Joud Lebanese Cuisine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
