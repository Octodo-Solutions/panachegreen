import { useState, useMemo } from 'react';

// Panache Green logo (embedded)
const LOGO = "data:image/jpeg;base64,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";

// --------- Panache product catalogue (simplified) ---------
const PRODUCTS = [
  {
    id: 'cooltops_premium',
    name: 'CoolTops Premium',
    category: 'High-SRI Roof Coating',
    note: 'Flagship reflective cool-roof coating',
    cost: 65,            // ₹ per sq ft
    acSaving: 22,        // % reduction in AC energy
    surfaceDrop: 20,     // °C drop in roof surface temp
    indoorDrop: 5,       // °C indoor drop (no AC case)
    life: 8,             // years
  },
  {
    id: 'cooltops_eco',
    name: 'CoolTops Eco',
    category: 'High-SRI Roof Coating',
    note: 'Economical cool-roof coating',
    cost: 45,
    acSaving: 15,
    surfaceDrop: 15,
    indoorDrop: 3.5,
    life: 6,
  },
  {
    id: 'insulmix_screed',
    name: 'Insulmix Roof Screed',
    category: 'Thermal Insulation',
    note: 'Insulating + reflective roof screed',
    cost: 120,
    acSaving: 30,
    surfaceDrop: 25,
    indoorDrop: 7,
    life: 15,
  },
  {
    id: 'cool_wrap',
    name: 'Cool Wrap',
    category: 'High-SRI Wall Coating',
    note: 'Reflective coating for exterior walls',
    cost: 38,
    acSaving: 10,
    surfaceDrop: 12,
    indoorDrop: 2.5,
    life: 7,
  },
];

const BUILDINGS = ['Industrial Shed', 'Warehouse', 'Office', 'Institution', 'Residential'];

// Industry-standard constants
const TR_TO_KW = 3.517;   // power per ton of refrigeration
const LOAD_FACTOR = 0.70; // average AC part-load
const COOLING_DAYS = 240; // cooling season in India
const GRID_EF = 0.82;     // kg CO2 per kWh (CEA India)

const fmtINR = (n) => {
  if (!isFinite(n) || n <= 0) return '\u20B90';
  if (n >= 1e7) return `\u20B9${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `\u20B9${(n / 1e5).toFixed(2)} L`;
  return `\u20B9${Math.round(n).toLocaleString('en-IN')}`;
};
const fmtNum = (n) => Math.round(n).toLocaleString('en-IN');

export default function PanacheBenefitPage() {
  const [building, setBuilding] = useState('Industrial Shed');
  const [area, setArea] = useState(15000);
  const [hasAC, setHasAC] = useState(true);
  const [tonnage, setTonnage] = useState(25);
  const [hours, setHours] = useState(10);
  const [tariff, setTariff] = useState(8);
  const [productId, setProductId] = useState('cooltops_premium');

  const r = useMemo(() => {
    const p = PRODUCTS.find((x) => x.id === productId);
    const investment = area * p.cost;

    let baseKwh = 0, kwhSaved = 0, costSaved = 0, paybackYrs = null;
    if (hasAC && tonnage > 0) {
      baseKwh = tonnage * TR_TO_KW * LOAD_FACTOR * hours * COOLING_DAYS;
      kwhSaved = (baseKwh * p.acSaving) / 100;
      costSaved = kwhSaved * tariff;
      paybackYrs = costSaved > 0 ? investment / costSaved : null;
    }
    const co2 = (kwhSaved * GRID_EF) / 1000; // tonnes/yr
    const lifeSaving = costSaved * p.life;
    const netGain = lifeSaving - investment;
    const roi = investment > 0 ? (netGain / investment) * 100 : 0;

    return { p, investment, baseKwh, kwhSaved, costSaved, paybackYrs, co2, lifeSaving, netGain, roi };
  }, [area, hasAC, tonnage, hours, tariff, productId]);

  return (
    <div style={{ minHeight: '100vh', background: '#eef3e9', color: '#16281c' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        .pg-input {
          width: 100%; background: #fff; border: 1.5px solid #cdddc4;
          border-radius: 10px; padding: 12px 14px; font-size: 1.05rem;
          font-family: 'Manrope', sans-serif; color: #16281c; outline: none;
          transition: border-color .15s;
        }
        .pg-input:focus { border-color: #3a7d2c; }
      `}</style>

      {/* Header */}
      <header style={{ background: '#142b1c', borderBottom: '3px solid #7ec24a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <img src={LOGO} alt="Panache Green" style={{ height: 40, borderRadius: 4 }} />
          <a href="https://www.panachegreen.com/" target="_blank" rel="noreferrer"
             style={{ color: '#9fd17e', fontFamily: 'Manrope, sans-serif', fontSize: '.82rem', textDecoration: 'none', letterSpacing: '.05em' }}>
            www.panachegreen.com &nbsp;&#8599;
          </a>
        </div>
      </header>

      {/* Title band */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '38px 24px 10px' }}>
        <div style={{ color: '#3a7d2c', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>
          Building Benefit Calculator
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: '2.1rem', lineHeight: 1.15, margin: '10px 0 6px', color: '#142b1c', maxWidth: 640 }}>
          See what a cooler, greener building is worth.
        </h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', color: '#4a5a4c', fontSize: '.96rem', maxWidth: 560, margin: 0 }}>
          Enter a few building details, pick a Panache product, and view the energy, cost and ROI benefit instantly.
        </p>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 60px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 28 }}>
        {/* ---------------- LEFT: INPUT ---------------- */}
        <section style={{ background: '#fff', borderRadius: 16, padding: 26, border: '1.5px solid #d8e6cf' }}>
          <SecHead n="1" title="Building Information" />

          <Field label="Building Type">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {BUILDINGS.map((b) => (
                <Chip key={b} active={building === b} onClick={() => setBuilding(b)}>{b}</Chip>
              ))}
            </div>
          </Field>

          <Field label="Roof / Top-floor Area (sq ft)">
            <input className="pg-input" type="number" value={area} min={100} step={500}
                   onChange={(e) => setArea(Number(e.target.value))} />
          </Field>

          <Field label="Does the building use Air Conditioning?">
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip active={hasAC} onClick={() => setHasAC(true)}>Yes, uses AC</Chip>
              <Chip active={!hasAC} onClick={() => setHasAC(false)}>No AC</Chip>
            </div>
          </Field>

          {hasAC && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="AC Capacity (TR)">
                <input className="pg-input" type="number" value={tonnage} min={0} step={1}
                       onChange={(e) => setTonnage(Number(e.target.value))} />
              </Field>
              <Field label="AC Hours / Day">
                <input className="pg-input" type="number" value={hours} min={0} max={24} step={1}
                       onChange={(e) => setHours(Number(e.target.value))} />
              </Field>
              <Field label="Electricity Tariff (\u20B9/kWh)">
                <input className="pg-input" type="number" value={tariff} min={1} step={0.5}
                       onChange={(e) => setTariff(Number(e.target.value))} />
              </Field>
            </div>
          )}

          <div style={{ marginTop: 22 }}>
            <SecHead n="2" title="Select Panache Product" />
            <div style={{ display: 'grid', gap: 10 }}>
              {PRODUCTS.map((p) => {
                const on = productId === p.id;
                return (
                  <button key={p.id} onClick={() => setProductId(p.id)}
                    style={{
                      textAlign: 'left', cursor: 'pointer', borderRadius: 12, padding: '14px 16px',
                      border: on ? '2px solid #3a7d2c' : '1.5px solid #d8e6cf',
                      background: on ? '#f1f8eb' : '#fff', transition: 'all .15s',
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                      <div>
                        <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: '1.08rem', color: '#142b1c' }}>{p.name}</div>
                        <div style={{ fontSize: '.78rem', color: '#5a6b5c', marginTop: 2 }}>{p.category} &middot; {p.note}</div>
                      </div>
                      <div style={{
                        flexShrink: 0, fontSize: '.72rem', fontWeight: 600, padding: '4px 9px', borderRadius: 20,
                        background: on ? '#3a7d2c' : '#e6efdd', color: on ? '#fff' : '#3a7d2c',
                      }}>
                        {p.acSaving}% saving
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- RIGHT: OUTPUT ---------------- */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Hero */}
          <div style={{ background: '#142b1c', borderRadius: 16, padding: 26, color: '#eef3e9' }}>
            <div style={{ fontSize: '.72rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#7ec24a', fontWeight: 600 }}>
              {hasAC ? 'Estimated Payback' : 'Indoor Comfort Gain'}
            </div>
            {hasAC ? (
              <>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '3.6rem', fontWeight: 500, lineHeight: 1, margin: '8px 0' }}>
                  {r.paybackYrs && r.paybackYrs < 50
                    ? (r.paybackYrs < 1 ? `${Math.round(r.paybackYrs * 12)} months` : `${r.paybackYrs.toFixed(1)} years`)
                    : '\u2014'}
                </div>
                <div style={{ fontSize: '.9rem', color: '#a9c79b', maxWidth: 320 }}>
                  After payback, the client keeps saving for ~{r.paybackYrs ? Math.max(0, r.p.life - r.paybackYrs).toFixed(1) : r.p.life} more years of product life.
                </div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '3.6rem', fontWeight: 500, lineHeight: 1, margin: '8px 0' }}>
                  &minus;{r.p.indoorDrop}&deg;C
                </div>
                <div style={{ fontSize: '.9rem', color: '#a9c79b', maxWidth: 320 }}>
                  Cooler indoors without AC. For non-AC buildings the value is thermal comfort &amp; productivity.
                </div>
              </>
            )}
          </div>

          {/* Benefit cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Stat label="Total Investment" value={fmtINR(r.investment)}
                  sub={`${fmtNum(area)} sqft \u00D7 \u20B9${r.p.cost}/sqft`} />
            <Stat label="Energy Saved / Year" value={hasAC ? `${fmtNum(r.kwhSaved)} kWh` : '\u2014'}
                  sub={hasAC ? `${r.p.acSaving}% of AC consumption` : 'No AC load'} highlight />
            <Stat label="Cost Saved / Year" value={hasAC ? fmtINR(r.costSaved) : '\u2014'}
                  sub={hasAC ? 'On the electricity bill' : 'Qualitative benefit'} highlight />
            <Stat label={`${r.p.life}-Year Savings`} value={hasAC ? fmtINR(r.lifeSaving) : '\u2014'}
                  sub={hasAC ? `Net gain ${fmtINR(r.netGain)}` : 'Over product life'} />
            <Stat label="ROI over Product Life" value={hasAC && r.investment > 0 ? `${Math.round(r.roi)}%` : '\u2014'}
                  sub="Versus doing nothing" />
            <Stat label="Carbon Emissions Avoided" value={hasAC ? `${r.co2.toFixed(1)} t` : '\u2014'}
                  sub="Per year \u2014 useful for ESG reporting" />
          </div>

          {/* Always-on benefit */}
          <div style={{ background: '#fff', border: '1.5px solid #d8e6cf', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '2.4rem', fontWeight: 600, color: '#3a7d2c', lineHeight: 1 }}>
                &minus;{r.p.surfaceDrop}&deg;C
              </div>
              <div style={{ fontSize: '.88rem', color: '#4a5a4c' }}>
                Peak-summer drop in <strong>roof surface temperature</strong> with {r.p.name}. This is what protects the
                slab, extends roof life, and reduces heat entering the building.
              </div>
            </div>
          </div>

          {/* Talking points */}
          <div style={{ background: '#f1f8eb', border: '1.5px solid #cfe3c2', borderLeft: '4px solid #7ec24a', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#3a7d2c', fontWeight: 700, marginBottom: 8 }}>
              For the Client Pitch
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: '.9rem', color: '#16281c', lineHeight: 1.65 }}>
              {hasAC && r.paybackYrs && (
                <li>Investment of <strong>{fmtINR(r.investment)}</strong> pays back in <strong>{r.paybackYrs < 1 ? `${Math.round(r.paybackYrs * 12)} months` : `${r.paybackYrs.toFixed(1)} years`}</strong>.</li>
              )}
              {hasAC && <li>Cuts AC electricity by <strong>{r.p.acSaving}%</strong> &mdash; about <strong>{fmtINR(r.costSaved)}</strong> saved every year.</li>}
              <li>Roof surface runs <strong>{r.p.surfaceDrop}&deg;C cooler</strong>, adding years of life to the structure.</li>
              {hasAC && <li>Avoids <strong>{r.co2.toFixed(1)} tonnes of CO&#8322;</strong> per year for the client's sustainability goals.</li>}
            </ul>
          </div>
        </section>
      </main>

      <footer style={{ background: '#142b1c', color: '#8aa37c', fontSize: '.78rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>Panache Green &middot; Building Benefit Calculator &middot; Prototype</span>
          <span style={{ fontStyle: 'italic' }}>Estimates are indicative &mdash; a site audit confirms final figures.</span>
        </div>
      </footer>
    </div>
  );
}

// ---------- Small UI helpers ----------
function SecHead({ n, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <span style={{
        width: 24, height: 24, borderRadius: 6, background: '#3a7d2c', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Fraunces, serif', fontSize: '.85rem', fontWeight: 600,
      }}>{n}</span>
      <h2 style={{ margin: 0, fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: '1.15rem', color: '#142b1c' }}>{title}</h2>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: '.74rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#5a6b5c', fontWeight: 600, marginBottom: 7, fontFamily: 'Manrope, sans-serif' }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      style={{
        cursor: 'pointer', padding: '8px 13px', borderRadius: 8, fontSize: '.85rem',
        fontFamily: 'Manrope, sans-serif', fontWeight: 600, transition: 'all .15s',
        border: active ? '1.5px solid #3a7d2c' : '1.5px solid #cdddc4',
        background: active ? '#3a7d2c' : '#fff', color: active ? '#fff' : '#2f4233',
      }}>
      {children}
    </button>
  );
}

function Stat({ label, value, sub, highlight }) {
  return (
    <div style={{
      background: highlight ? '#f1f8eb' : '#fff',
      border: highlight ? '1.5px solid #cfe3c2' : '1.5px solid #d8e6cf',
      borderRadius: 12, padding: '14px 15px',
    }}>
      <div style={{ fontSize: '.66rem', letterSpacing: '.13em', textTransform: 'uppercase', color: '#5a6b5c', fontWeight: 700, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.55rem', fontWeight: 600, color: highlight ? '#3a7d2c' : '#142b1c', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: '.74rem', color: '#7a8a7c', marginTop: 6 }}>{sub}</div>
    </div>
  );
}
