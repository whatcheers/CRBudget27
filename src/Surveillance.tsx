import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Eye,
  Megaphone,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type Props = {
  onBack: () => void,
  key?: string,
};

const HEADER_COLOR = '#7f1d1d';
const HEADER_LIGHT = 'from-red-700/40';

// Iowa ALPR network data
const iowaNetworkData = [
  { name: 'Cedar Rapids', cameras: 75, highlight: true },
  { name: 'West Des Moines', cameras: 57 },
  { name: 'Altoona', cameras: 51 },
  { name: 'University of Iowa', cameras: 29 },
  { name: 'Urbandale', cameras: 27 },
  { name: 'Dubuque', cameras: 22 },
  { name: 'Clive', cameras: 20 },
  { name: 'Indianola', cameras: 12 },
  { name: 'North Liberty', cameras: 12 },
  { name: 'Johnston', cameras: 11 },
  { name: 'Clear Lake', cameras: 10 },
  { name: 'Burlington', cameras: 9 },
  { name: 'Davenport', cameras: 9 },
  { name: 'Clinton', cameras: 8 },
  { name: 'Carlisle', cameras: 5 },
  { name: 'Wapello County SO', cameras: 4 },
  { name: 'Story County SO', cameras: 2 },
].sort((a, b) => b.cameras - a.cameras);

// 2025 quarterly stats
const quarterlyStats = [
  { quarter: 'Q2 2025', alerts: 5692, uses: 132, rate: 2.3 },
  { quarter: 'Q3 2025', alerts: 4428, uses: 147, rate: 3.3 },
  { quarter: 'Q4 2025', alerts: 2515, uses: 162, rate: 6.4 },
];

// Hero KPI
const heroStats = [
  { label: 'Contract Total (2 yr)', value: '$499,250' },
  { label: 'Annual Recurring', value: '$225,000' },
  { label: 'Cameras (per portal)', value: '75' },
  { label: 'Plates Read / 30 days', value: '465K' },
  { label: 'Sharing Network', value: '~310 agencies' },
];

// Flock contract line items (from Cedar Rapids IA - LE Proposal 2024.pdf, p. 25)
const flockContractLines = [
  { item: 'Flock Safety Platform (FlockOS Essentials + 70 Falcon LPR + 5 Condor PTZ)', kind: 'Annual recurring', cost: 'Bundled', qty: 1, total: 225000 },
  { item: 'Falcon Standard Implementation Fee', kind: 'One-time', cost: '$650', qty: 70, total: 45500 },
  { item: 'Condor Standard Implementation Fee', kind: 'One-time', cost: '$750', qty: 5, total: 3750 },
];

const flockContractTerms = [
  { label: 'Subscription Term', value: '24 months' },
  { label: 'Billing Frequency', value: 'Annual — Year 1 invoiced at signing' },
  { label: 'Payment Terms', value: 'Net 30' },
  { label: 'Retention Period', value: '30 days' },
  { label: 'Bill-to Address', value: '505 1st St SW, Cedar Rapids, IA 52404' },
];

// Flock Transparency Portal — transparency.flocksafety.com/cedar-rapids-ia-pd
// Captured 2026-05-01 (last-30-days = April 2026)
const transparencyPortal = {
  retentionDays: 30,
  totalCameras: 75,
  platesRead30d: 465159,
  hotlistHits30d: 14238,
  searchSessions30d: 1221,
  sharingNetworkAgencyCount: 310, // approximate count from full agency list on portal
  iowaAgencyCount: 60,
  capturedDate: '2026-05-01',
  hotlistsAlertedOn: ['NCIC', 'NCMEC Amber Alert'],
  actionableHotlists: ['Arrest Warrants', 'Missing Persons', 'Stolen Vehicles', 'Stolen License Plates'],
};

// Federal / multi-state intelligence networks in the CRPD sharing list
const intelNetworks = [
  { name: 'Iowa Department of Public Safety', kind: 'State LE' },
  { name: 'Iowa Department of Corrections', kind: 'State corrections' },
  { name: 'Indiana Department of Corrections', kind: 'State corrections' },
  { name: 'Nebraska State Patrol', kind: 'State LE' },
  { name: 'Ohio State Highway Patrol', kind: 'State LE' },
  { name: 'Wisconsin Department of Justice', kind: 'State LE' },
  { name: 'Missouri Information Analysis Center', kind: 'Fusion center (DHS-affiliated)' },
  { name: 'MOCIC — Mid-States Organized Crime Information Center', kind: 'Multi-state intel network' },
  { name: 'TN ROCIC — Regional Organized Crime Information Center', kind: 'Multi-state intel network' },
  { name: 'Texas Financial Crimes Intelligence Center', kind: 'State intel center' },
  { name: 'Memphis International Airport PD', kind: 'Airport LE' },
  { name: 'Nashville International Airport PD', kind: 'Airport LE' },
];

// LPR computer-software-subscription trajectory (Police, FY25-FY27)
// FY25: $129K calculated from FY26 Adopted p. 64 ("by $96K to $225K"); narrative confirms ~$130K
// FY26: $225K explicitly named in budget narrative
// FY27: not broken out in narrative — flagged as unknown
const lprSubscriptionTrend = [
  { year: 'FY25 Adopted', amount: 129000, label: '$129K', note: 'baseline (LPR portion)', fill: '#cbd5e1' },
  { year: 'FY26 Adopted', amount: 225000, label: '$225K', note: '+$96K, "for the license plate reader program"', fill: '#dc2626' },
  { year: 'FY27 Adopted', amount: 225000, label: '?', note: 'not broken out in narrative', fill: '#e2e8f0' },
];

// Direct quotes from budget books — exact wording for the reconciliation card
const lprBudgetQuotes = [
  {
    source: 'FY25 Book 1',
    page: 'p. 64-65',
    quote: '"Police — $130K — Subscription costs relating to license plate readers"',
    context: 'New-program addition listed under City Goal — PROTECT CR.',
  },
  {
    source: 'FY26 Adopted',
    page: 'p. 64',
    quote: '"An increase in Police Department computer software subscriptions by $96K to $225K for the license plate reader program."',
    context: 'Citywide budget-changes summary section.',
  },
  {
    source: 'FY26 Adopted',
    page: 'p. 118',
    quote: '"Increase in computer software subscriptions by $96K to $368K. This increase provides for $225K in expenses for the license plate reader program."',
    context: 'Police-section detail. Reveals total Police software-subs = $368K, of which $225K is LPR-specific.',
  },
];

// Cedar Rapids elected officials — verified 2026-05-03 from cedar-rapids.org
const councilMembers = [
  { role: 'Mayor', name: "Tiffany O'Donnell", email: 't.odonnell@cedar-rapids.org' },
  { role: 'At-Large', name: 'Tyler Olson', email: 't.olson@cedar-rapids.org' },
  { role: 'At-Large', name: 'Ann Poe', email: 'ann.poe@cedar-rapids.org' },
  { role: 'At-Large', name: 'David Maier', email: 'd.maier@cedar-rapids.org' },
  { role: 'District 1', name: 'Martin Hoeger', email: 'm.hoeger@cedar-rapids.org' },
  { role: 'District 2', name: 'Scott Overland', email: 's.overland@cedar-rapids.org' },
  { role: 'District 3', name: 'Dale Todd', email: 'd.todd@cedar-rapids.org' },
  { role: 'District 4', name: 'Scott Olson', email: 'scott.olson@cedar-rapids.org' },
  { role: 'District 5', name: 'Ashley Vanorny', email: 'a.vanorny@cedar-rapids.org' },
];
const allCouncilEmails = councilMembers.map((m) => m.email).join(',');

const fmtUSD = (n: number) => `$${n.toLocaleString()}`;

// Camera network breakdown
const cameraNetwork = [
  { type: 'Stationary ALPR (Flock)', count: 70 },
  { type: 'Mobile ALPR (Motorola)', count: 2 },
  { type: 'Pan-Tilt-Zoom (PTZ)', count: 5 },
  { type: 'Traffic Engineering', count: 'Several' },
  { type: 'Parks & Recreation', count: 3 },
];

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5 }}
    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
  <div className="mb-8 flex items-center gap-4 border-b border-slate-200 pb-4">
    <div className="rounded-xl bg-red-50 p-3 text-red-700">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      {subtitle && <p className="text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

export default function Surveillance({ onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen border-none bg-slate-50 font-sans text-slate-900 pb-20 overflow-x-hidden"
    >
      <header className="text-white pt-12 pb-28 px-6 shadow-md relative overflow-hidden" style={{ backgroundColor: HEADER_COLOR }}>
        <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${HEADER_LIGHT} to-transparent z-0`}></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group text-sm uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Overview
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm -rotate-6 shadow-xl border border-white/10">
                  <Eye size={36} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Surveillance & ALPR
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                Cedar Rapids' Flock Safety ALPR network: contract details, data policy, and civil liberties implications.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-center shadow-2xl w-full md:min-w-[280px] md:w-auto">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-3">System Scope</p>
              <p className="text-4xl font-black text-white tracking-tight">70<span className="text-2xl text-white/70"> Cameras</span></p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/70">$499,250 Contract Value</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 space-y-8">

        {/* Renewal banner */}
        {(() => {
          const signed = new Date('2024-06-25');
          const renewal = new Date(signed);
          renewal.setMonth(renewal.getMonth() + 24);
          const today = new Date();
          const daysUntil = Math.ceil((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const renewalLabel = renewal.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          const status = daysUntil > 0
            ? `${daysUntil} day${daysUntil === 1 ? '' : 's'} away`
            : daysUntil === 0
              ? 'today'
              : `${Math.abs(daysUntil)} day${Math.abs(daysUntil) === 1 ? '' : 's'} ago`;
          return (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-red-300 rounded-3xl shadow-xl shadow-red-100/50 p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start md:items-center gap-4">
                  <div className="rounded-2xl bg-red-700 text-white px-3 py-2 text-[10px] font-black uppercase tracking-widest flex-shrink-0">
                    Contract<br />Renewal
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{renewalLabel}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      24-month term ends {status}. Original contract approved June 25, 2024 on the Council Consent Agenda.
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Decision point</p>
                  <p className="text-sm text-slate-700 max-w-xs md:text-right">Renew, renegotiate, or end. No public hearing has been announced.</p>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {heroStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + (idx * 0.05) }}
              className="bg-white p-4 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform"
            >
              <div className="text-2xl md:text-3xl font-black text-red-700 mb-2 tracking-tight">{stat.value}</div>
              <p className="font-semibold text-slate-500 uppercase tracking-widest text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Scope note */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="What This Page Covers"
            subtitle="Surveillance cameras and ALPR — not red-light / speed cameras"
          />
          <div className="text-slate-700 space-y-3">
            <p>
              Cedar Rapids runs <span className="font-bold">two distinct camera systems</span> that get conflated in public discussion. This page is about the surveillance side.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="border border-red-200 bg-red-50/40 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-red-700">This page</p>
                <p className="font-bold text-slate-900 mb-2">Public Safety Cameras / ALPR (Flock)</p>
                <p className="text-sm text-slate-700">76 public-safety cameras, 70 with Automated License Plate Reader capability. Operated for CRPD by Flock Safety. Procurement began FY26.</p>
              </div>
              <div className="border border-slate-200 bg-slate-50/40 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-600">Not this page</p>
                <p className="font-bold text-slate-900 mb-2">Automated Traffic Enforcement (Sensys Gatso)</p>
                <p className="text-sm text-slate-700">Red-light and speed cameras. Different vendor, different purpose, generates citation revenue. Out of scope here.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Camera Network Overview */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="Camera Network Breakdown"
            subtitle="All surveillance systems in Cedar Rapids (Q4 2025)"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-bold text-slate-700">Camera Type</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700">Count</th>
                  <th className="text-left py-3 px-4 font-bold text-slate-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {cameraNetwork.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-3 px-4">{item.type}</td>
                    <td className="py-3 px-4 font-bold text-red-700">{item.count}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.type.includes('Flock') && 'Reads every passing license plate'}
                      {item.type.includes('Motorola') && 'Mobile vehicle scanning'}
                      {item.type.includes('PTZ') && 'Downtown law enforcement surveillance'}
                      {item.type.includes('Traffic') && 'Major intersections and roadways'}
                      {item.type.includes('Parks') && 'Redmond Park, Greene Square, Riverside Skate Park'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: CRPD Q2/Q3/Q4 2025 Quarterly Reports</p>
        </Card>

        {/* Live transparency-portal stats */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="Live System Stats — Last 30 Days"
            subtitle={`From Flock's own public Cedar Rapids transparency portal, captured ${transparencyPortal.capturedDate}`}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-red-200 bg-red-50/40 rounded-2xl p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-2">Plate Reads</p>
              <p className="text-4xl font-black text-slate-900">{transparencyPortal.platesRead30d.toLocaleString()}</p>
              <p className="text-sm text-slate-600 mt-2">Unique plates read in the last 30 days. That's roughly <span className="font-bold">{Math.round(transparencyPortal.platesRead30d / 30).toLocaleString()} per day</span>, or one read every <span className="font-bold">{Math.round(86400 / (transparencyPortal.platesRead30d / 30))} seconds</span> on average across the network.</p>
            </div>
            <div className="border border-red-200 bg-red-50/40 rounded-2xl p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-2">Hotlist Hits</p>
              <p className="text-4xl font-black text-slate-900">{transparencyPortal.hotlistHits30d.toLocaleString()}</p>
              <p className="text-sm text-slate-600 mt-2">Plates that triggered an alert ({((transparencyPortal.hotlistHits30d / transparencyPortal.platesRead30d) * 100).toFixed(2)}% of all reads). Sources: <span className="font-bold">{transparencyPortal.hotlistsAlertedOn.join(', ')}</span>. Per Flock's policy, hits "are required to be human verified prior to action."</p>
            </div>
            <div className="border border-red-200 bg-red-50/40 rounded-2xl p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-2">User Search Sessions</p>
              <p className="text-4xl font-black text-slate-900">{transparencyPortal.searchSessions30d.toLocaleString()}</p>
              <p className="text-sm text-slate-600 mt-2">User-initiated searches against the database in the last 30 days. Per the portal, <span className="font-bold">"all system access requires a valid reason and is stored indefinitely"</span> — the audit log itself never expires.</p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-5 text-sm">
            <p className="font-bold text-slate-900 mb-2">CRPD's actionable hotlists (per portal)</p>
            <p className="text-slate-700">{transparencyPortal.actionableHotlists.join(' · ')}</p>
            <p className="text-slate-600 mt-3">
              <span className="font-bold">Stated prohibited uses:</span> immigration enforcement, traffic enforcement, harassment or intimidation, use based solely on a protected class (race, sex, religion), personal use.
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: <a href="https://transparency.flocksafety.com/cedar-rapids-ia-pd" className="underline decoration-dotted">transparency.flocksafety.com/cedar-rapids-ia-pd</a></p>
        </Card>

        {/* How It's Funded — the budget answer + the gap */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="What the $499,250 Actually Buys"
            subtitle="The Flock budgetary quote, line by line — sourced from the council packet itself"
          />

          <div className="space-y-6">
            <div>
              <p className="text-slate-700 mb-4">
                The $499,250 figure is widely cited but rarely broken down. The <span className="font-bold">Flock Safety budgetary quote</span> attached to the June 25, 2024 council packet (in this repo as <code className="text-xs bg-slate-100 px-1 rounded">Cedar Rapids IA - LE Proposal 2024.pdf</code>, p. 25) shows the actual decomposition.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-bold text-slate-700">Item</th>
                      <th className="text-left py-3 px-4 font-bold text-slate-700">Type</th>
                      <th className="text-right py-3 px-4 font-bold text-slate-700">Unit Cost</th>
                      <th className="text-right py-3 px-4 font-bold text-slate-700">Qty</th>
                      <th className="text-right py-3 px-4 font-bold text-slate-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flockContractLines.map((line, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="py-3 px-4 text-slate-900">{line.item}</td>
                        <td className="py-3 px-4 text-slate-600">{line.kind}</td>
                        <td className="py-3 px-4 text-right text-slate-600">{line.cost}</td>
                        <td className="py-3 px-4 text-right text-slate-600">{line.qty}</td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">{fmtUSD(line.total)}</td>
                      </tr>
                    ))}
                    <tr className="bg-red-50 border-t-2 border-red-200">
                      <td className="py-3 px-4 font-bold text-slate-900" colSpan={4}>Year 1 Subtotal (annual recurring + one-time install fees)</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">$274,250</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="py-3 px-4 font-bold text-slate-900" colSpan={4}>Year 2 (annual recurring only)</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">$225,000</td>
                    </tr>
                    <tr className="bg-red-100 border-t-2 border-red-300">
                      <td className="py-3 px-4 font-black text-red-900" colSpan={4}>Contract Total</td>
                      <td className="py-3 px-4 text-right font-black text-red-900">$499,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-2">Source: <span className="italic">Cedar Rapids IA - LE Proposal 2024.pdf</span>, p. 25 (Flock Safety budgetary quote, attached to 2024-06-25 council packet).</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-slate-600">Contract Terms</p>
                <dl className="space-y-2 text-sm">
                  {flockContractTerms.map((t, idx) => (
                    <div key={idx} className="flex justify-between gap-3">
                      <dt className="text-slate-600 flex-shrink-0">{t.label}</dt>
                      <dd className="text-slate-900 font-semibold text-right">{t.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-slate-600">What's Bundled in the $225K/year</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> FlockOS™ Essentials software platform</li>
                  <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> 70 × Flock Safety Falcon® LPR cameras (fixed)</li>
                  <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> 5 × Flock Safety Condor™ PTZ cameras with LTE service</li>
                  <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> Hardware, installation, software, maintenance — all-inclusive lease model</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* The $225K coincidence — the strongest circumstantial match */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="The $225K Match"
            subtitle="The Flock contract's annual fee and the FY26 LPR budget line are the same dollar amount."
          />

          <div className="space-y-6 text-slate-700">
            <p>
              The Flock proposal lists an annual recurring fee of <span className="font-bold">$225,000</span>. In FY26, the City of Cedar Rapids' Police "computer software subscriptions" line increased by <span className="font-bold">$96K to $225K</span> for "the license plate reader program." Both figures are documented in their respective sources.
            </p>

            {/* Three-year trajectory chart */}
            <div>
              <p className="font-bold text-slate-900 mb-2">Police LPR-subscription line trajectory</p>
              <div className="h-[200px] sm:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lprSubscriptionTrend} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    cursor={{ fill: '#fef2f2', radius: 8 }}
                    formatter={(_v: number, _n: string, p: any) => [p.payload.label, p.payload.note]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #fecaca', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '8px 12px' }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60}>
                    {lprSubscriptionTrend.map((entry, idx) => (
                      <Bar key={idx} dataKey="amount" fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                FY25 figure derived from FY26 narrative ("by $96K to $225K"). FY27 line is shown gray because the LPR-specific carve-out was not broken out in the FY27 narrative — it may have stayed at $225K, but the budget book doesn't say.
              </p>
            </div>

            {/* Reconciliation panel */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-red-200 bg-red-50/40 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-3">What the contract says</p>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-slate-600">Flock annual recurring fee</dt>
                    <dd className="text-2xl font-black text-slate-900">$225,000.00</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Billing</dt>
                    <dd className="text-slate-900 font-semibold">First year invoiced at signing (June 2024)</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Term</dt>
                    <dd className="text-slate-900 font-semibold">24 months → first full FY = FY26</dd>
                  </div>
                </dl>
                <p className="text-xs text-slate-500 mt-3 italic">Source: Cedar Rapids IA - LE Proposal 2024.pdf, p. 25</p>
              </div>
              <div className="border border-red-200 bg-red-50/40 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-3">What the FY26 budget says</p>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-slate-600">Police LPR-subscription line FY26</dt>
                    <dd className="text-2xl font-black text-slate-900">$225,000</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Year-over-year change</dt>
                    <dd className="text-slate-900 font-semibold">+$96,000 (FY25 baseline ~$129K)</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">First fiscal year reflecting Flock</dt>
                    <dd className="text-slate-900 font-semibold">FY26 (July 2025 – June 2026)</dd>
                  </div>
                </dl>
                <p className="text-xs text-slate-500 mt-3 italic">Source: FY26 Adopted Budget Book, p. 64 and p. 118</p>
              </div>
            </div>

            {/* Direct budget quotes */}
            <div>
              <p className="font-bold text-slate-900 mb-3">The exact wording in the budget books</p>
              <div className="space-y-3">
                {lprBudgetQuotes.map((q, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">{q.source}</span>
                      <span className="text-xs text-slate-500">{q.page}</span>
                    </div>
                    <p className="text-slate-900 italic mb-2">{q.quote}</p>
                    <p className="text-xs text-slate-600">{q.context}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Card>

        {/* Quarterly Stats */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="2025 ALPR Performance Metrics"
            subtitle="Quarterly breakdown of alerts vs. actual investigations supported"
          />
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-bold text-slate-700">Period</th>
                  <th className="text-right py-3 px-4 font-bold text-slate-700">Alerts</th>
                  <th className="text-right py-3 px-4 font-bold text-slate-700">Successful Uses</th>
                  <th className="text-right py-3 px-4 font-bold text-red-700">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {quarterlyStats.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-semibold">{item.quarter}</td>
                    <td className="py-3 px-4 text-right">{item.alerts.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{item.uses}</td>
                    <td className="py-3 px-4 text-right font-bold text-red-700">{item.rate}%</td>
                  </tr>
                ))}
                <tr className="bg-red-50 border-t-2 border-red-200">
                  <td className="py-3 px-4 font-bold">2025 Annual Total</td>
                  <td className="py-3 px-4 text-right font-bold">12,644</td>
                  <td className="py-3 px-4 text-right font-bold">420</td>
                  <td className="py-3 px-4 text-right font-bold text-red-700">3.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-slate-800 font-bold mb-2">The Critical Metric</p>
            <p className="text-slate-700">For every 100 vehicles scanned and flagged by ALPR, <span className="font-bold text-red-700">97 belonged to innocent people</span>. Their location data was still recorded, stored in Flock's cloud database, and subject to indefinite sharing once exported.</p>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: CRPD Public Safety Camera Statistics Q2, Q3, Q4 2025</p>
        </Card>

        {/* Data Collection & Policy */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="What Gets Collected & How Long It Stays"
            subtitle="The official policy and the loophole"
          />
          <div className="space-y-6">
            <div>
              <p className="font-bold text-slate-900 mb-3">Every scan captures:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> License plate number</li>
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> Date, time, and GPS location</li>
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> Vehicle make, color, and style</li>
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> Stored in Flock's central cloud database</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-2">✓ Official Policy</p>
                <p className="text-slate-700">Data is <span className="font-bold">automatically purged after 30 days</span>.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="font-bold text-slate-900 mb-2">⚠️ The Loophole</p>
                <p className="text-slate-700">Police can <span className="font-bold">export or share data at any time</span> — exported data has <span className="font-bold">no retention limit</span>.</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm text-slate-600">
                <span className="font-bold">Comparison:</span> New Hampshire imposes a 3-minute retention policy on similar systems, recognizing that longer retention enables mass tracking.
              </p>
            </div>
          </div>
        </Card>

        {/* Federal Access — now grounded in actual portal data */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="Who Sees Cedar Rapids' Plate Reads"
            subtitle={`~${transparencyPortal.sharingNetworkAgencyCount} agencies across the country, per the portal`}
          />
          <div className="space-y-4 text-slate-700">
            <p>
              The Cedar Rapids transparency portal lists <span className="font-bold">approximately {transparencyPortal.sharingNetworkAgencyCount} agencies</span> in its outbound sharing network — including <span className="font-bold">~{transparencyPortal.iowaAgencyCount} Iowa agencies</span>, plus state-level law enforcement, fusion centers, and multi-state intelligence networks. A condensed view of the non-local entries:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Agency / Network</th>
                    <th className="text-left py-3 px-4 font-bold text-slate-700">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {intelNetworks.map((n, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-semibold text-slate-900">{n.name}</td>
                      <td className="py-3 px-4 text-slate-600">{n.kind}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <p className="font-bold text-slate-900 mb-2">What "fusion center" and "ROCIC/MOCIC" mean here</p>
              <p className="text-sm text-slate-700">
                These are <span className="font-bold">multi-state intelligence networks</span> that aggregate data from local, state, and federal law enforcement. <span className="font-bold">MOCIC</span> (Mid-States Organized Crime Information Center) covers 9 Midwestern states. <span className="font-bold">ROCIC</span> covers 14 Southern states. Fusion centers like Missouri's are DHS-affiliated. Once Cedar Rapids' plate reads enter these networks, they are searchable by member agencies — including federal partners — without requiring further notice to or approval from CRPD.
            </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="font-bold text-slate-900 mb-2">ICE in sanctuary cities</p>
              <p className="text-sm text-slate-700">
                The Guardian (2025) reported ICE agents tapped Flock camera data inside <span className="font-bold">sanctuary cities</span> without warrants or judicial oversight. CRPD's portal lists <span className="font-bold">"immigration enforcement"</span> as a prohibited use — but the policy applies to local users querying the system, not to downstream agencies that have been granted access via the sharing network.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
              <p>The Virginia Supreme Court classified license plate images as personal data, triggering state privacy statutes. Cedar Rapids takes no such legal position.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: <a href="https://transparency.flocksafety.com/cedar-rapids-ia-pd" className="underline decoration-dotted">transparency.flocksafety.com/cedar-rapids-ia-pd</a> (full sharing list); The Guardian, 2025.</p>
        </Card>

        {/* Iowa Network */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="The Iowa ALPR Network"
            subtitle="Cedar Rapids in regional context — Flock camera counts at peer Iowa agencies"
          />
          <div className="h-[320px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={iowaNetworkData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 150, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11}} width={150} />
              <Tooltip
                cursor={{ fill: '#fef2f2', radius: 8 }}
                formatter={(value: number) => `${value} cameras`}
                contentStyle={{ borderRadius: '12px', border: '1px solid #fecaca', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '8px 12px' }}
              />
              <Bar dataKey="cameras" radius={[0, 8, 8, 0]} barSize={20}>
                {iowaNetworkData.map((entry, index) => (
                  <Bar
                    key={`cell-${index}`}
                    dataKey="cameras"
                    fill={entry.highlight ? '#dc2626' : '#cbd5e1'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4 text-sm text-slate-700">
            <p>
              Camera counts here come from individual agency Flock transparency portals and reflect cameras the agency owns — separate from the Cedar Rapids <span className="font-bold">outbound sharing network</span>, which has roughly {transparencyPortal.sharingNetworkAgencyCount} agencies receiving CR data (covered in the section above).
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: Per-agency Flock Safety transparency portals.</p>
        </Card>

        {/* Who's Behind Flock */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="Who's Behind Flock Safety"
            subtitle="Investors with deep Pentagon & ICE connections"
          />
          <div className="space-y-4">
            <div className="border-l-4 border-red-700 pl-4 py-2">
              <p className="font-bold text-slate-900">Founders Fund (Peter Thiel)</p>
              <p className="text-slate-600">Co-founded Palantir — sells to ICE, DHS, and the Pentagon</p>
            </div>
            <div className="border-l-4 border-red-700 pl-4 py-2">
              <p className="font-bold text-slate-900">Trae Stephens (Founders Fund)</p>
              <p className="text-slate-600">Built Anduril (autonomous surveillance towers for U.S. military); sat on Trump's defense transition team</p>
            </div>
            <div className="border-l-4 border-red-700 pl-4 py-2">
              <p className="font-bold text-slate-900">Andreessen Horowitz (a16z)</p>
              <p className="text-slate-600">Launched "American Dynamism" fund dedicated to defense, policing, and border security; actively lobbies in D.C.</p>
            </div>
            <div className="border-l-4 border-red-700 pl-4 py-2">
              <p className="font-bold text-slate-900">Meritech Capital (Series C)</p>
              <p className="text-slate-600">Co-founded by former Pentagon liaison; sits on Air Force Academy Foundation board</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-slate-700">
                <span className="font-bold">Cedar Rapids also uses Motorola ALPR</span> in mobile units — a separate system with a data-sharing agreement dating to January 29, 2020.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: EyesOffCR blog research</p>
        </Card>

        {/* What can I do about this? */}
        <Card>
          <SectionHeader
            icon={Megaphone}
            title="What Can I Do About This?"
            subtitle="Concrete next steps for residents who want to push back"
          />
          <div className="space-y-6">

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.eyesoffcr.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-red-200 bg-red-50/40 rounded-2xl p-5 hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-2">Learn more</p>
                <p className="font-bold text-slate-900 mb-1">eyesoffcr.org</p>
                <p className="text-sm text-slate-700">The local research and advocacy group whose investigative work backs much of this page. Background, source documents, and ongoing coverage of CRPD's surveillance program.</p>
              </a>
              <a
                href="https://www.eyesoffcr.org/council_watch.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-red-200 bg-red-50/40 rounded-2xl p-5 hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-2">Watch council</p>
                <p className="font-bold text-slate-900 mb-1">Council meetings &amp; agendas</p>
                <p className="text-sm text-slate-700">EyesOffCR's curated council-watch page — upcoming agendas, meeting schedules, and a guide to public comment.</p>
              </a>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3">
                <div>
                  <p className="font-bold text-slate-900">Email your city council</p>
                  <p className="text-sm text-slate-600">Tell them what you think about the Flock contract — renewal is on the calendar.</p>
                </div>
                <a
                  href={`mailto:${allCouncilEmails}`}
                  className="inline-flex items-center justify-center rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-4 py-2 transition-colors"
                >
                  Email all council members
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {councilMembers.map((m, idx) => (
                  <a
                    key={idx}
                    href={`mailto:${m.email}`}
                    className="block border border-slate-200 bg-slate-50 rounded-xl p-4 hover:bg-white hover:border-red-300 transition-colors"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-1">{m.role}</p>
                    <p className="font-bold text-slate-900">{m.name}</p>
                    <p className="text-xs text-slate-600 break-all underline decoration-dotted">{m.email}</p>
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Source: cedar-rapids.org official council pages, verified 2026-05-03.</p>
            </div>

            <a
              href="https://discord.gg/VEeNY5x6"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-slate-200 bg-slate-50 rounded-2xl p-5 hover:bg-white hover:border-red-300 transition-colors"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Wanna chat about it?</p>
              <p className="font-bold text-slate-900 mb-1">CedarRapids Discord</p>
              <p className="text-sm text-slate-700">EyesOffCR is usually shitposting in the CedarRapids Discord — drop in to ask questions or organize.</p>
              <p className="text-xs text-slate-500 mt-2 underline decoration-dotted">discord.gg/VEeNY5x6</p>
            </a>

          </div>
        </Card>

      </main>
    </motion.div>
  );
}
