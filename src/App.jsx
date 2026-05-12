import { useState } from 'react'

const PHONE = '(843) 555-0100'
const PHONE_RAW = '8435550100'

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --green: #1a4a1a;
    --green-mid: #2d6a2d;
    --green-light: #3d8b3d;
    --gold: #c8a84b;
    --gold-light: #e8c96b;
    --cream: #f5f0e8;
    --white: #ffffff;
    --gray: #6b6b6b;
    --dark: #111111;
    --red: #c0392b;
  }
  body { font-family: 'Barlow', sans-serif; color: var(--dark); background: var(--white); }

  .top-bar {
    background: var(--green); padding: 10px 24px;
    display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }
  .top-bar-brand img { height: 72px; width: auto; display: block; }
  .call-btn {
    background: var(--gold); color: var(--dark);
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 18px;
    padding: 10px 22px; border: none; border-radius: 4px; cursor: pointer;
    text-decoration: none; display: inline-block; letter-spacing: 0.03em; transition: background 0.2s;
  }
  .call-btn:hover { background: var(--gold-light); }

  .hero {
    background: linear-gradient(135deg, #0d2b0d 0%, #1a4a1a 50%, #0d2b0d 100%);
    padding: 72px 24px 80px; text-align: center; position: relative; overflow: hidden;
  }
  .hero-badge {
    display: inline-block; background: var(--gold); color: var(--dark);
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase; padding: 5px 14px;
    border-radius: 2px; margin-bottom: 20px; position: relative;
  }
  .hero h1 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: clamp(42px, 8vw, 80px); color: var(--white); line-height: 0.95;
    text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 16px; position: relative;
  }
  .hero h1 span { color: var(--gold); }
  .hero-sub {
    font-size: 18px; color: rgba(255,255,255,0.75); margin-bottom: 36px;
    max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.5; position: relative;
  }
  .hero-cta-group { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }
  .btn-primary {
    background: var(--gold); color: var(--dark);
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 20px;
    padding: 16px 32px; border: none; border-radius: 4px; cursor: pointer;
    text-decoration: none; display: inline-block; letter-spacing: 0.03em; transition: all 0.2s;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-secondary {
    background: transparent; color: var(--white);
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px;
    padding: 16px 28px; border: 2px solid rgba(255,255,255,0.4); border-radius: 4px;
    cursor: pointer; text-decoration: none; display: inline-block; letter-spacing: 0.03em; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--white); background: rgba(255,255,255,0.08); }

  .trust-bar {
    background: var(--cream); padding: 20px 24px;
    display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;
    border-bottom: 3px solid var(--gold);
  }
  .trust-item {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px;
    text-transform: uppercase; letter-spacing: 0.05em; color: var(--green);
  }

  .emergency-banner { background: var(--red); color: var(--white); text-align: center; padding: 16px 24px; }
  .emergency-banner h3 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 22px;
    text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;
  }
  .emergency-banner p { font-size: 14px; opacity: 0.9; }
  .emergency-banner a { color: var(--white); font-weight: 700; text-decoration: underline; }

  .section { padding: 72px 24px; }
  .section-dark { background: var(--green); color: var(--white); }
  .section-cream { background: var(--cream); }
  .container { max-width: 1000px; margin: 0 auto; }
  .section-label {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px;
  }
  .section-dark .section-label { color: var(--gold-light); }
  h2 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: clamp(32px, 5vw, 52px); text-transform: uppercase;
    line-height: 1; margin-bottom: 16px; letter-spacing: -0.01em;
  }
  .section-dark h2 { color: var(--white); }
  .lead { font-size: 17px; line-height: 1.7; color: var(--gray); max-width: 640px; margin-bottom: 40px; }
  .section-dark .lead { color: rgba(255,255,255,0.75); }

  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 40px; }
  .service-card {
    background: var(--white); border: 2px solid #e8e8e8; border-radius: 8px;
    padding: 28px 24px; transition: all 0.2s;
  }
  .service-card:hover { border-color: var(--green-light); box-shadow: 0 4px 20px rgba(26,74,26,0.12); transform: translateY(-2px); }
  .service-icon { font-size: 36px; margin-bottom: 14px; display: block; }
  .service-card h3 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 20px;
    text-transform: uppercase; color: var(--green); margin-bottom: 8px; letter-spacing: 0.02em;
  }
  .service-card p { font-size: 14px; line-height: 1.6; color: var(--gray); }

  .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px; margin-top: 40px; }
  .why-item { text-align: center; padding: 24px 16px; }
  .why-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 52px; color: var(--gold); line-height: 1; margin-bottom: 8px; }
  .why-item h3 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 18px;
    text-transform: uppercase; color: var(--white); margin-bottom: 6px; letter-spacing: 0.03em;
  }
  .why-item p { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.5; }

  .areas-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .area-tag {
    background: var(--white); border: 2px solid var(--green-light); color: var(--green);
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px;
    text-transform: uppercase; letter-spacing: 0.05em; padding: 7px 16px; border-radius: 4px;
  }

  .form-section { background: var(--green); padding: 72px 24px; }
  .form-wrap { max-width: 560px; margin: 0 auto; }
  .form-wrap h2 { color: var(--white); margin-bottom: 8px; }
  .form-wrap .lead { color: rgba(255,255,255,0.7); margin-bottom: 32px; }
  .form-group { margin-bottom: 16px; }
  .form-group label {
    display: block; font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;
    color: rgba(255,255,255,0.7); margin-bottom: 6px;
  }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%; padding: 13px 16px; background: rgba(255,255,255,0.1);
    border: 1.5px solid rgba(255,255,255,0.2); border-radius: 4px;
    color: var(--white); font-family: 'Barlow', sans-serif; font-size: 15px;
    outline: none; transition: border-color 0.2s;
  }
  .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(255,255,255,0.35); }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--gold); }
  .form-group select option { background: var(--green); color: var(--white); }
  .form-group textarea { resize: vertical; min-height: 100px; }
  .submit-btn {
    width: 100%; background: var(--gold); color: var(--dark);
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 20px;
    padding: 16px; border: none; border-radius: 4px; cursor: pointer;
    text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.2s; margin-top: 8px;
  }
  .submit-btn:hover { background: var(--gold-light); }
  .form-note { text-align: center; font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 12px; }

  .success-box {
    background: rgba(255,255,255,0.1); border: 2px solid var(--gold);
    border-radius: 8px; padding: 40px 32px; text-align: center; color: var(--white);
  }
  .success-box .success-icon { font-size: 52px; margin-bottom: 16px; }
  .success-box h3 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 32px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 10px;
  }
  .success-box p { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.6; }

  .gold-divider { height: 4px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }

  footer { background: var(--dark); color: rgba(255,255,255,0.5); padding: 40px 24px; text-align: center; }
  .footer-brand {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 24px;
    color: var(--white); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;
  }
  .footer-brand span { color: var(--gold); }
  footer p { font-size: 13px; line-height: 1.8; margin-bottom: 2px; }
  footer a { color: var(--gold); text-decoration: none; }

  @media (max-width: 600px) {
    .top-bar { padding: 10px 16px; }
    .call-btn { font-size: 14px; padding: 8px 12px; }
    .hero { padding: 48px 16px 56px; }
    .trust-bar { gap: 16px; padding: 16px; }
    .section { padding: 48px 16px; }
    .form-section { padding: 48px 16px; }
  }
`

const services = [
  { icon: '🌳', name: 'Tree Removal', desc: 'Safe, efficient removal of dead, damaged, or hazardous trees of any size. We protect your property from start to finish.' },
  { icon: '✂️', name: 'Tree Trimming & Pruning', desc: 'Expert shaping and pruning to improve tree health, curb appeal, and safety. Keeps your trees growing strong for years.' },
  { icon: '🪵', name: 'Stump Grinding', desc: 'Complete stump removal using professional grinding equipment. Leave your yard clean, level, and ready to enjoy.' },
  { icon: '⚡', name: 'Emergency Tree Service', desc: 'Storm damage? Fallen tree? We respond fast to protect your home and clear hazards before more damage occurs.' },
  { icon: '🏠', name: 'Lot Clearing', desc: 'Complete land and lot clearing for new construction, fence lines, or overgrown properties throughout Florence County.' },
  { icon: '🔍', name: 'Tree Health Assessment', desc: 'Not sure if a tree is hazardous? Our experts assess structural integrity, disease, and risk to your property.' },
]

const whyUs = [
{ num: '24/7', title: 'Emergency Response', desc: 'Available for emergency calls — storm damage and hazardous trees do not wait for business hours.' },
{ num: '100%', title: 'Free Estimates', desc: 'Every job starts with a free on-site estimate — no obligation, no surprises, straight pricing.' },
{ num: '5★', title: '5-Star Service', desc: 'We do not leave until the job is done right and your property is completely clean.' },
{ num: 'SC', title: 'Locally Rooted', desc: 'Florence County based — we know the local trees, soil, and neighborhoods inside and out.' },
]

const areas = ['Florence', 'Darlington', 'Lake City', 'Hartsville', 'Marion', 'Mullins', 'Dillon', 'Timmonsville', 'Pamplico', 'Effingham', 'Johnsonville', 'Lamar']

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <>
      <style>{styles}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />

      <div className="top-bar">
        <div className="top-bar-brand">
          <img src="/logo.png" alt="Florence Tree Pros" />
        </div>
        <a href={`tel:${PHONE_RAW}`} className="call-btn">📞 {PHONE}</a>
      </div>

      <div className="hero">
        <div className="hero-badge">📍 Serving Florence, SC & The Pee Dee Region</div>
        <h1>Florence's<br /><span>Tree Service</span><br />Experts</h1>
        <p className="hero-sub">Professional tree removal, trimming, and emergency service. Free estimates on every job. Licensed and insured. Fast response throughout Florence County.</p>
        <div className="hero-cta-group">
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">📞 Call Now — Free Estimate</a>
          <a href="#quote" className="btn-secondary">Request a Quote</a>
        </div>
      </div>

      <div className="trust-bar">
        {['✅ Licensed & Insured','🕐 24/7 Emergency Service','💰 Free Estimates','⭐ 5-Star Rated','📍 Local Florence Team'].map(t => (
          <div className="trust-item" key={t}>{t}</div>
        ))}
      </div>

      <div className="emergency-banner">
        <h3>⚡ Storm Damage? Tree Down? We Respond 24/7</h3>
        <p>Call now for emergency tree service throughout Florence County — <a href={`tel:${PHONE_RAW}`}>{PHONE}</a></p>
      </div>

      <div className="section">
        <div className="container">
          <div className="section-label">What We Do</div>
          <h2>Tree Services in<br />Florence, SC</h2>
          <p className="lead">From routine trimming to emergency storm response, Florence Tree Pros handles every tree service need for homeowners and businesses throughout the Pee Dee region.</p>
          <div className="services-grid">
            {services.map(s => (
              <div className="service-card" key={s.name}>
                <span className="service-icon">{s.icon}</span>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gold-divider" />

      <div className="section section-dark">
        <div className="container">
          <div className="section-label">Why Choose Us</div>
          <h2>The Florence Tree<br />Pros Difference</h2>
          <p className="lead">We are not a national franchise. We are your neighbors — and we treat your property like our own.</p>
          <div className="why-grid">
            {whyUs.map(w => (
              <div className="why-item" key={w.title}>
                <div className="why-num">{w.num}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gold-divider" />

      <div className="section section-cream">
        <div className="container">
          <div className="section-label">Where We Work</div>
          <h2>Serving Florence &<br />Surrounding Communities</h2>
          <p className="lead">We serve homeowners and businesses throughout the Pee Dee region. If you are in Florence County or nearby, we have got you covered.</p>
          <div className="areas-grid">
            {areas.map(a => <div className="area-tag" key={a}>{a}</div>)}
          </div>
        </div>
      </div>

      <div className="gold-divider" />

      <div className="form-section" id="quote">
        <div className="form-wrap">
          <div className="section-label">Free Estimate</div>
          <h2>Get Your Free Quote</h2>
          <p className="lead">Tell us about your tree and we will get back to you fast — usually same day.</p>
          {submitted ? (
            <div className="success-box">
              <div className="success-icon">✅</div>
              <h3>We will Be In Touch Soon!</h3>
              <p>Thanks for reaching out. We typically respond within a few hours. For urgent or emergency service, call us directly at <a href={`tel:${PHONE_RAW}`} style={{color:'var(--gold)'}}>{PHONE}</a>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Smith" value={form.name} onChange={set('name')} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="(843) 555-1234" value={form.phone} onChange={set('phone')} required />
              </div>
              <div className="form-group">
                <label>Service Needed</label>
                <select value={form.service} onChange={set('service')} required>
                  <option value="">Select a service...</option>
                  <option>Tree Removal</option>
                  <option>Tree Trimming and Pruning</option>
                  <option>Stump Grinding</option>
                  <option>Emergency Tree Service</option>
                  <option>Lot Clearing</option>
                  <option>Tree Health Assessment</option>
                  <option>Not Sure — Need an Assessment</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tell Us More (Optional)</label>
                <textarea placeholder="Describe the tree, location, or any urgency..." value={form.message} onChange={set('message')} />
              </div>
              <button type="submit" className="submit-btn">Request My Free Estimate</button>
              <p className="form-note">No obligation. We will respond same day.</p>
            </form>
          )}
        </div>
      </div>

      <footer>
        <div className="footer-brand">Florence <span>Tree Pros</span></div>
        <p>Professional Tree Service · Florence, SC & The Pee Dee Region</p>
        <p>📞 <a href={`tel:${PHONE_RAW}`}>{PHONE}</a> · Available 24/7 for Emergencies</p>
        <p style={{marginTop:'16px'}}>Licensed and Insured · Free Estimates · Serving Florence County</p>
        <p style={{marginTop:'16px', fontSize:'12px', opacity:0.4}}>© {new Date().getFullYear()} Florence Tree Pros · Florence, SC</p>
      </footer>
    </>
  )
}
