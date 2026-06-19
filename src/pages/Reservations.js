import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Reservations.css';

const times = ['5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM'];
const guests = ['1 Guest','2 Guests','3 Guests','4 Guests','5 Guests','6 Guests','7 Guests','8+ Guests'];
const occasions = ['None','Birthday','Anniversary','Business Dinner','Date Night','Graduation','Proposal','Other'];

const INITIAL = { firstName: '', lastName: '', email: '', phone: '', date: '', time: '', guests: '', occasion: '', notes: '', agreed: false };

export default function Reservations() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.date) e.date = 'Please choose a date';
    if (!form.time) e.time = 'Please choose a time';
    if (!form.guests) e.guests = 'Please select party size';
    if (!form.agreed) e.agreed = 'Please agree to our cancellation policy';
    return e;
  };

 const handleSubmit = async (e) => {
  if (e && e.preventDefault) e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }
  const response = await fetch('https://formspree.io/f/xeewykwq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  if (response.ok) {
    setSubmitted(true);
    setForm(INITIAL);
  }
};

  const today = new Date().toISOString().split('T')[0];

  return (
    <PageTransition>
      <section className="res-hero">
        <div className="res-hero__overlay" />
        <div className="res-hero__content">
          <p className="section-eyebrow">Join Us</p>
          <h1 className="res-hero__title">Reservations</h1>
          <div className="gold-rule" style={{ margin: '1.25rem auto' }} />
          <p className="res-hero__sub">For parties of 9 or more, please call us directly</p>
        </div>
      </section>

      <section className="res-section">
        <div className="res-section__inner">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                className="res-success"
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="res-success__icon" aria-hidden="true">✓</div>
                <h2 className="res-success__title">Your reservation is confirmed</h2>
                <div className="gold-rule" style={{ margin: '1.5rem auto' }} />
                <p className="res-success__detail">
                  Thank you, {form.firstName}. We're expecting you on{' '}
                  <strong>{new Date(form.date + 'T12:00').toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>{' '}
                  at <strong>{form.time}</strong> for <strong>{form.guests}</strong>.
                </p>
                <p className="res-success__sub">
                  A confirmation has been sent to {form.email}
                </p>
                <button className="btn-outline" style={{ marginTop: '2rem' }} onClick={() => { setForm(INITIAL); setSubmitted(false); }}>
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="res-form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="res-form__section-label">Contact Information</div>
                <div className="res-form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="firstName">First Name</label>
                    <input id="firstName" className={`field__input ${errors.firstName ? 'field__input--error' : ''}`} type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Elias" />
                    {errors.firstName && <span className="field__error">{errors.firstName}</span>}
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="lastName">Last Name</label>
                    <input id="lastName" className={`field__input ${errors.lastName ? 'field__input--error' : ''}`} type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Karam" />
                    {errors.lastName && <span className="field__error">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="res-form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="email">Email Address</label>
                    <input id="email" className={`field__input ${errors.email ? 'field__input--error' : ''}`} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="elias@example.com" />
                    {errors.email && <span className="field__error">{errors.email}</span>}
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="phone">Phone Number</label>
                    <input id="phone" className={`field__input ${errors.phone ? 'field__input--error' : ''}`} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(416) 555-0192" />
                    {errors.phone && <span className="field__error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="res-form__section-label" style={{ marginTop: '2rem' }}>Reservation Details</div>
                <div className="res-form__row res-form__row--three">
                  <div className="field">
                    <label className="field__label" htmlFor="date">Date</label>
                    <input id="date" className={`field__input ${errors.date ? 'field__input--error' : ''}`} type="date" value={form.date} min={today} onChange={e => set('date', e.target.value)} />
                    {errors.date && <span className="field__error">{errors.date}</span>}
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="time">Time</label>
                    <select id="time" className={`field__input field__select ${errors.time ? 'field__input--error' : ''}`} value={form.time} onChange={e => set('time', e.target.value)}>
                      <option value="">Select time</option>
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <span className="field__error">{errors.time}</span>}
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="guests">Guests</label>
                    <select id="guests" className={`field__input field__select ${errors.guests ? 'field__input--error' : ''}`} value={form.guests} onChange={e => set('guests', e.target.value)}>
                      <option value="">Party size</option>
                      {guests.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    {errors.guests && <span className="field__error">{errors.guests}</span>}
                  </div>
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="occasion">Special Occasion</label>
                  <select id="occasion" className="field__input field__select" value={form.occasion} onChange={e => set('occasion', e.target.value)}>
                    <option value="">Select occasion (optional)</option>
                    {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="notes">Special Requests</label>
                  <textarea id="notes" className="field__input field__textarea" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Dietary requirements, accessibility needs, seating preferences..." rows={4} />
                </div>

                <div className="res-form__policy">
                  <label className="res-form__checkbox-label">
                    <input type="checkbox" checked={form.agreed} onChange={e => set('agreed', e.target.checked)} className="res-form__checkbox" />
                    <span>
                      I understand that reservations must be cancelled at least 24 hours in advance.
                      Late cancellations or no-shows may incur a $25 per person fee.
                    </span>
                  </label>
                  {errors.agreed && <span className="field__error" style={{ display: 'block', marginTop: '0.5rem' }}>{errors.agreed}</span>}
                </div>

                <button type="button" onClick={handleSubmit} className="btn-primary res-form__submit">
                  Confirm Reservation
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <aside className="res-info">
            <div className="res-info__block">
              <h3 className="res-info__heading">Hours</h3>
              <p>Monday – Thursday</p>
              <p className="res-info__detail">5:00 PM – 11:00 PM</p>
              <p>Friday – Saturday</p>
              <p className="res-info__detail">5:00 PM – 1:00 AM</p>
              <p>Sunday</p>
              <p className="res-info__detail">4:00 PM – 10:00 PM</p>
            </div>
            <div className="gold-rule" style={{ margin: '1.5rem 0' }} />
            <div className="res-info__block">
              <h3 className="res-info__heading">Location</h3>
              <p>1842 Yonge Street</p>
              <p className="res-info__detail">Toronto, Ontario M4S 1Y2</p>
            </div>
            <div className="gold-rule" style={{ margin: '1.5rem 0' }} />
            <div className="res-info__block">
              <h3 className="res-info__heading">Contact</h3>
              <p>(416) 555-0192</p>
              <p className="res-info__detail">hello@joudrestaurant.ca</p>
            </div>
            <div className="gold-rule" style={{ margin: '1.5rem 0' }} />
            <div className="res-info__block">
              <h3 className="res-info__heading">Private Events</h3>
              <p className="res-info__detail" style={{ marginBottom: '1rem' }}>
                Our private dining room seats up to 30 guests. For events, please email us directly.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
