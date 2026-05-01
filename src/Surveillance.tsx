import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Eye,
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
  { label: 'Contract Cost', value: '$499,250' },
  { label: 'Fixed ALPR Cameras', value: '70' },
  { label: 'Alerts in 2025', value: '12,644' },
  { label: 'Success Rate', value: '3.3%' },
  { label: 'Data Retention', value: '30 Days*' },
];

// Camera network breakdown
const cameraNetwork = [
  { type: 'Stationary ALPR (Flock)', count: 70 },
  { type: 'Mobile ALPR (Motorola)', count: 2 },
  { type: 'Pan-Tilt-Zoom (PTZ)', count: 5 },
  { type: 'Traffic Engineering', count: 'Several' },
  { type: 'Parks & Recreation', count: 3 },
];

// CRPD claims vs reality
const claimsVsReality = [
  {
    claim: 'ALPR assists investigations',
    reality: '96.7% of 2025 alerts were innocent vehicles',
  },
  {
    claim: 'Data purged after 30 days',
    reality: 'Exported data has no retention limit',
  },
  {
    claim: 'Only authorized agencies access data',
    reality: 'ICE accessed Flock data in sanctuary cities (The Guardian, 2025)',
  },
  {
    claim: 'Supports missing persons',
    reality: 'CRPD notes tracking non-criminal behavior as a use case',
  },
  {
    claim: 'National law enforcement network',
    reality: '100+ agencies across multiple states, including federal',
  },
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
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Surveillance & ALPR
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                Cedar Rapids' Flock Safety ALPR network: contract details, data policy, and civil liberties implications.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-center shadow-2xl min-w-[280px]">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-3">System Scope</p>
              <p className="text-4xl font-black text-white tracking-tight">70<span className="text-2xl text-white/70"> Cameras</span></p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/70">$499,250 Contract Value</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 space-y-8">

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

        {/* Contract Details */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="How It Got Approved"
            subtitle="The $499K contract without public debate"
          />
          <div className="space-y-4 text-slate-700">
            <div>
              <p className="font-bold text-slate-900 mb-2">June 25, 2024 — Cedar Rapids City Council Meeting</p>
              <p className="text-slate-600">A $499,250 contract with Flock Group Inc. for an automated license plate reader system was approved by the Cedar Rapids City Council.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="font-bold text-slate-900 mb-2">🚨 Consent Agenda</p>
              <p className="text-slate-600">The contract was passed on the <span className="font-bold">Consent Agenda</span> — a bulk approval mechanism where routine and non-controversial items are voted on without recorded debate or individual discussion.</p>
              <p className="text-slate-600 mt-2">The same agenda included water service line repairs, sewer lining, curb ramp work, and traffic signal upgrades.</p>
              <p className="text-slate-600 mt-2"><span className="font-bold">No public comment. No council member questions. No debate.</span></p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: Cedar Rapids City Council session summary, 2024-06-25</p>
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

        {/* Federal Access */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="Federal & Multi-Agency Access"
            subtitle="Who else can see this data?"
          />
          <div className="space-y-4 text-slate-700">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="font-bold text-slate-900 mb-3">ICE in Sanctuary Cities</p>
              <p className="text-slate-600">
                The Guardian (2025): ICE agents were able to tap into Flock camera data inside <span className="font-bold">sanctuary cities</span> — accessing tracking data without warrants or judicial oversight.
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-slate-900">All Iowa Flock agencies:</p>
              <ul className="space-y-2 text-slate-600 ml-4">
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> Described as sharing data with "federal agencies and multi-state law enforcement network"</li>
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> Carlisle IA: "100+ agencies across multiple states including federal access"</li>
                <li className="flex gap-3"><span className="text-red-700 font-bold">•</span> <span className="font-bold">No warrant required. No judicial oversight required.</span></li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
              <p>Virginia Supreme Court classified license plate images as personal data, triggering state privacy statutes. Cedar Rapids takes no such legal position.</p>
            </div>
          </div>
        </Card>

        {/* Iowa Network */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="The Iowa ALPR Network"
            subtitle="Cedar Rapids in regional context — 17 agencies, 500+ cameras"
          />
          <ResponsiveContainer width="100%" height={400}>
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
            <p className="text-sm text-slate-700">
              <span className="font-bold">Coralville cancelled their Flock contract in February 2026.</span> The city council voted to end the partnership and remove all cameras.
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-4">Source: Iowa transparency data (Flock Safety Transparency Portals)</p>
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

        {/* Claims vs Reality */}
        <Card>
          <SectionHeader
            icon={Eye}
            title="What CRPD Says vs. What the Data Shows"
            subtitle="Comparing official framing to documented facts"
          />
          <div className="space-y-3">
            {claimsVsReality.map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:bg-red-50/20 transition-colors">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 mb-1">CRPD's Framing</p>
                    <p className="text-slate-700 font-semibold">{item.claim}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-red-700 mb-1">The Full Picture</p>
                    <p className="text-red-700 font-semibold">{item.reality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-6">Source: CRPD Q2–Q4 2025 Quarterly Reports; The Guardian 2025; EyesOffCR research</p>
        </Card>

      </main>
    </motion.div>
  );
}
