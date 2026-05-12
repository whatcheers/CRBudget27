import React from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Landmark,
  Leaf,
  ShieldCheck,
  Droplets,
  BookOpen,
  DollarSign,
  TrendingUp,
  Flame,
  Wrench,
  MessageSquare,
  Home as HomeIcon,
  Building,
  Factory,
  Sparkles,
  ArrowRight,
  Waves,
  PiggyBank,
  Receipt,
  Hammer,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { DEPARTMENTS } from './data';

// ---------------- Data ----------------

const GENERAL_FUND_TOTAL = 178.6;

const generalFundDepts = [
  { name: 'Police',         value: 52.4, color: '#1e3a8a', icon: ShieldCheck, id: 'police' },
  { name: 'Public Works',   value: 28.2, color: '#ea580c', icon: Wrench,      id: 'publicWorks' },
  { name: 'Fire',           value: 26.9, color: '#dc2626', icon: Flame,       id: 'fire' },
  { name: 'Parks & Rec',    value: 13.3, color: '#16a34a', icon: Leaf,        id: 'parks' },
  { name: 'Info Tech',      value:  9.3, color: '#0891b2', icon: Building2,   id: 'infoTech' },
  { name: 'Library',        value:  9.1, color: '#4f46e5', icon: BookOpen,    id: 'library' },
  { name: 'Everything else',value: 39.4, color: '#64748b', icon: Landmark },
];

const genFundRevenues = [
  { name: 'Taxes',                value: 80.4, color: '#0f766e' },
  { name: 'Transfers In',         value: 58.3, color: '#0284c7' },
  { name: 'Charges for Services', value: 18.8, color: '#eab308' },
  { name: 'Other Revenue',        value:  6.9, color: '#8b5cf6' },
  { name: 'Fines & Forfeits',     value:  6.3, color: '#ef4444' },
  { name: 'Licenses & Permits',   value:  4.0, color: '#f97316' },
  { name: 'Intergovernmental',    value:  4.0, color: '#10b981' },
];

const totalCIPData = [
  { name: 'Water Pollution Control', value: 106.7 },
  { name: 'Flood Control',           value:  70.6 },
  { name: 'Water System',            value:  48.0 },
  { name: 'Street Imprv.',           value:  39.2 },
  { name: 'Airport',                 value:  38.9 },
  { name: 'Sanitary Sewer',          value:   7.1 },
  { name: 'Trails',                  value:   6.3 },
  { name: 'Recreation',              value:   5.5 },
];

const surveyPriorities = [
  { name: 'Streets',              value: 433 },
  { name: 'Police/Fire',          value: 285 },
  { name: 'Parks',                value: 273 },
  { name: 'Affordable Housing',   value: 249 },
  { name: 'Recreation/Comm Ctr',  value: 212 },
];

const levyHistory = [
  { year: '2018', rate: 15.22 },
  { year: '2019', rate: 15.22 },
  { year: '2020', rate: 15.44 },
  { year: '2021', rate: 15.66 },
  { year: '2022', rate: 15.88 },
  { year: '2023', rate: 16.03 },
  { year: '2024', rate: 16.25 },
  { year: '2025', rate: 16.47 },
  { year: '2026', rate: 16.66 },
  { year: '2027', rate: 16.66 },
];

const levyAllocation = [
  { name: 'Consolidated General Fund',      rate: 8.15440, fill: '49%' },
  { name: 'Debt Service (Non-Flood)',       rate: 2.49725, fill: '15%' },
  { name: 'Other Employee Benefits',        rate: 1.75480, fill: '10%' },
  { name: 'Debt Service (Flood Control)',   rate: 1.47000, fill: '9%'  },
  { name: 'Police & Fire Retirement',       rate: 0.94000, fill: '6%'  },
  { name: 'FICA & IPERS',                   rate: 0.79997, fill: '5%'  },
  { name: 'Transit',                        rate: 0.77787, fill: '5%'  },
  { name: 'Liability & Property Self-Ins.', rate: 0.26191, fill: '1%'  },
];

const topTaxpayers = [
  { name: 'Interstate Power & Light Co', value: '$1.19B',  fill: '100%' },
  { name: 'ADM Corn Processing',         value: '$109.0M', fill: '9%'   },
  { name: 'St. Lukes Methodist Hospital',value: '$87.5M',  fill: '7%'   },
  { name: 'Fedex Warehouse',             value: '$65.1M',  fill: '6%'   },
  { name: 'Vantage Corn Processors',     value: '$63.4M',  fill: '5%'   },
  { name: 'Quaker Distributing',         value: '$53.8M',  fill: '5%'   },
  { name: 'Transamerica Life Ins.',      value: '$53.1M',  fill: '4%'   },
  { name: 'Rockwell Collins',            value: '$48.4M',  fill: '4%'   },
  { name: 'International Paper',         value: '$37.0M',  fill: '3%'   },
  { name: 'Altorfer Inc',                value: '$36.2M',  fill: '3%'   },
];

const valuationByClass = [
  { name: 'Residential', assessed: '+6.7%',  taxable: '-0.6%',  assessedPos: true,  taxablePos: false },
  { name: 'Commercial',  assessed: '+4.5%',  taxable: '+3.0%',  assessedPos: true,  taxablePos: true  },
  { name: 'Industrial',  assessed: '+21.3%', taxable: '+16.3%', assessedPos: true,  taxablePos: true  },
  { name: 'Railroads',   assessed: '-11.3%', taxable: '-11.3%', assessedPos: false, taxablePos: false },
  { name: 'Utilities',   assessed: '+0.5%',  taxable: '+0.3%',  assessedPos: true,  taxablePos: true  },
];

const utilityLines = [
  { name: 'Water Pollution & Sewer',     amount: '$56.90', delta: '+9.0%',     up: true  },
  { name: 'Water (inc. tax)',            amount: '$56.51', delta: '+6.0%',     up: true  },
  { name: 'Solid & Yard Waste, Recycling', amount: '$23.32', delta: 'Unchanged', up: false },
  { name: 'Stormwater',                  amount: '$8.08',  delta: 'Unchanged', up: false },
];

const iowaUtilityComparison = [
  { city: 'Des Moines',          rate: 184.26 },
  { city: 'Dubuque',             rate: 182.05 },
  { city: 'Cedar Rapids (FY27)', rate: 144.81, highlight: true },
  { city: 'West Des Moines',     rate: 141.24 },
  { city: 'Marion',              rate: 140.52 },
  { city: 'Iowa City',           rate: 130.69 },
];


const infographicStory = [
  { label: 'Public Safety', value: '$79.3M', note: 'Police + Fire = 44% of General Fund', color: 'bg-rose-500' },
  { label: 'Infrastructure', value: '$109.8M', note: 'Flood control + street improvements', color: 'bg-amber-500' },
  { label: 'Utility Capacity', value: '$131.5M', note: 'Water + WPC flagship projects', color: 'bg-cyan-500' },
];


const infographicTopCIP = [
  { name: 'WPC', value: 106.7 },
  { name: 'Flood Ctrl', value: 70.6 },
  { name: 'Water Sys', value: 48.0 },
  { name: 'Streets', value: 39.2 },
  { name: 'Airport', value: 38.9 },
];

// ---------------- Reusable bits ----------------

const SectionHeader = ({ title, subtitle, icon: Icon }: any) => (
  <div className="mb-8 flex items-center gap-4 border-b border-slate-200 pb-4">
    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      {subtitle && <p className="text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

const Card = ({ children, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5 }}
    className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 ${className}`}
  >
    {children}
  </motion.div>
);

const KpiTile = ({
  icon: Icon, label, value, sub, accent, delay = 0,
}: { icon: any; label: string; value: string; sub: React.ReactNode; accent: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
  >
    <div className={`mb-4 w-max rounded-xl p-3 ${accent}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="mb-1 text-sm font-semibold text-slate-500">{label}</p>
      <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
      <p className="mt-2 text-sm font-medium text-slate-500">{sub}</p>
    </div>
  </motion.div>
);

// ---------------- Main ----------------

export default function Home({ onSelectDept, onShowHighlights, onShowSurveillance }: {
  onSelectDept: (id: string) => void,
  onShowHighlights: () => void,
  onShowSurveillance: () => void,
  key?: string,
}) {
  // Dept directory: every entry in DEPARTMENTS that has a budget, sorted big → small
  const allDepts = Object.values(DEPARTMENTS as any)
    .filter((d: any) => d && typeof d.budget === 'number' && d.budget > 0)
    .sort((a: any, b: any) => b.budget - a.budget);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 pb-20"
    >
      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden bg-emerald-900 px-6 pb-28 pt-16 text-white shadow-md">
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/40 to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-400 opacity-90">
              City of Cedar Rapids, Iowa
            </h2>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">FY 2027 Budget</h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-emerald-100 md:text-xl">
              An interactive look at how Cedar Rapids will spend, invest, and tax in fiscal year 2027 — across the General Fund, enterprise utilities, and a $361M capital plan.
            </p>
            <button
              onClick={onShowHighlights}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-white/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Sparkles size={16} className="text-emerald-300" />
              What's New in FY27
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <div className="w-full md:min-w-[280px] md:w-auto rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-200">Total Assessed Value</p>
            <p className="text-3xl font-black tracking-tight text-white sm:text-5xl">$16.85B</p>
            <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200">
              <TrendingUp size={16} /> +6.1% from FY26
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-20 mx-auto -mt-16 max-w-6xl space-y-8 px-6">
        {/* ---------- At a Glance ---------- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KpiTile
            icon={Landmark}
            label="General Fund"
            value="$178.6M"
            sub={<><span className="text-emerald-600">+6%</span> ($10M) for day-to-day operations.</>}
            accent="bg-emerald-50 text-emerald-600"
            delay={0.05}
          />
          <KpiTile
            icon={DollarSign}
            label="Property Tax Levy"
            value="$16.6562"
            sub={<>per $1,000 taxable value. <span className="text-emerald-600">Unchanged</span>.</>}
            accent="bg-blue-50 text-blue-600"
            delay={0.1}
          />
          <KpiTile
            icon={Wrench}
            label="Capital Plan"
            value="$361.2M"
            sub={<>across all funds. <span className="text-slate-700 font-semibold">$152.5M</span> tax-supported.</>}
            accent="bg-orange-50 text-orange-600"
            delay={0.15}
          />
          <KpiTile
            icon={HomeIcon}
            label="Typical Home Tax"
            value="−$97"
            sub={<>annual change for a $200K home, vs. <span className="text-slate-700 font-semibold">$1,484</span> total.</>}
            accent="bg-rose-50 text-rose-600"
            delay={0.2}
          />
        </div>


        {/* ---------- Executive Infographic ---------- */}
        <Card className="overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-white/20 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Executive Snapshot</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">FY27 Budget Infographic</h3>
              <p className="mt-2 max-w-2xl text-sm text-emerald-100/90">The city's biggest budget moves in one view: core services, major construction, and resident impact.</p>
            </div>
            <button
              type="button"
              onClick={onShowHighlights}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider transition hover:bg-white/20 sm:w-auto"
            >
              Resident Guide <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">General Fund</p>
              <p className="mt-1 text-4xl font-black">$178.6M</p>
              <p className="mt-3 text-sm text-emerald-100">Levy remains <span className="font-bold text-white">unchanged at $16.6562</span> per $1,000 taxable value.</p>
              <div className="mt-4 space-y-3">
                {infographicStory.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="font-bold text-emerald-200">{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/20">
                      <div className={`h-full ${item.color}`} style={{ width: `${(Number(item.value.replace(/[$M]/g, '')) / 178.6) * 100}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-emerald-100/80">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 text-slate-900">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Capital Projects ($M)</p>
              <div className="overflow-x-auto">
                <div className="h-[220px] min-w-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={infographicTopCIP} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                      <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v: number) => [`$${v}M`, 'CIP']} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {infographicTopCIP.map((entry, i) => <Cell key={entry.name} fill={['#0ea5e9', '#14b8a6', '#22c55e', '#f59e0b', '#f97316'][i]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Resident Impact</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-100">Typical Home</p>
                  <p className="text-2xl font-black text-white">-$97</p>
                  <p className="text-[11px] text-emerald-100/80">Annual tax change</p>
                </div>
                <div className="rounded-xl bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-100">Utilities</p>
                  <p className="text-2xl font-black text-white">+$7.90</p>
                  <p className="text-[11px] text-emerald-100/80">Monthly change</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-3 text-xs text-emerald-100">
                Cedar Rapids remains below Des Moines and Dubuque on monthly utility cost while funding major long-term infrastructure.
              </div>
            </div>
          </div>
        </Card>

        {/* ---------- Where Every Dollar Goes ---------- */}
        <Card>
          <SectionHeader
            title="Where Every General-Fund Dollar Goes"
            subtitle="Each segment is one department's share of the $178.6M General Fund. Click for detail."
            icon={PiggyBank}
          />

          <div className="flex h-12 w-full overflow-hidden rounded-2xl shadow-inner border border-slate-200">
            {generalFundDepts.map((d) => {
              const pct = (d.value / GENERAL_FUND_TOTAL) * 100;
              const Icon = d.icon;
              const clickable = !!d.id;
              return (
                <div
                  key={d.name}
                  onClick={() => clickable && onSelectDept(d.id!)}
                  className={`group relative flex items-center justify-center transition-opacity ${clickable ? 'cursor-pointer hover:opacity-90' : ''}`}
                  style={{ width: `${pct}%`, backgroundColor: d.color }}
                  title={`${d.name} — $${d.value}M (${pct.toFixed(1)}%)`}
                >
                  {pct > 9 && (
                    <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/95">
                      <Icon size={13} /> {d.name}
                    </span>
                  )}
                  <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {d.name}: ${d.value}M ({pct.toFixed(1)}%)
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {generalFundDepts.map((d) => {
              const Icon = d.icon;
              const clickable = !!d.id;
              const pct = (d.value / GENERAL_FUND_TOTAL) * 100;
              return (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => clickable && onSelectDept(d.id!)}
                  disabled={!clickable}
                  className={`flex flex-col items-start rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition-colors ${clickable ? 'hover:border-slate-300 hover:bg-white' : 'cursor-default opacity-90'}`}
                >
                  <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm" style={{ backgroundColor: d.color }}>
                    <Icon size={15} />
                  </span>
                  <span className="text-xs font-semibold text-slate-700">{d.name}</span>
                  <span className="text-sm font-black text-slate-900">${d.value}M</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">{pct.toFixed(1)}%</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={onShowSurveillance}
              className="flex flex-col items-start rounded-xl border-2 border-red-700 bg-red-50 p-3 text-left transition-colors hover:border-red-900 hover:bg-red-100"
            >
              <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white shadow-sm">
                <Eye size={15} />
              </span>
              <span className="text-xs font-semibold text-slate-700">Surveillance</span>
              <span className="text-sm font-black text-red-700">$499K</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Flock ALPR</span>
            </button>
          </div>
        </Card>

        {/* ---------- Revenue vs Spending donuts ---------- */}
        <Card>
          <SectionHeader
            title="Revenue vs. Spending"
            subtitle="The General Fund's $178.6M, viewed as where money comes from and where it goes."
            icon={Receipt}
          />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h4 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-slate-500">Revenues</h4>
              <div className="relative h-[220px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genFundRevenues} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={2} dataKey="value" stroke="none">
                      {genFundRevenues.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`$${v}M`, 'Revenue']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total</span>
                  <span className="text-2xl font-black text-slate-800">$178.6M</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-slate-500">Spending by Department</h4>
              <div className="relative h-[220px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={generalFundDepts} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={2} dataKey="value" stroke="none">
                      {generalFundDepts.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`$${v}M`, 'Spending']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total</span>
                  <span className="text-2xl font-black text-slate-800">$178.6M</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ---------- Resident Impact ---------- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
              <HomeIcon className="text-emerald-600" /> Residential Tax Impact
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              Total assessed property value grew 6.1%, but a state residential rollback change pulled taxable value down — so the bill drops slightly.
            </p>
            <div className="rounded-2xl border border-emerald-100/50 bg-white p-5 shadow-sm">
              <p className="mb-1 text-sm font-semibold text-slate-500">For a typical $200,000 home:</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-emerald-600">−$97</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">Annual Change</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-700">$1,484</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">Total City Tax</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
              <Building className="text-blue-600" /> Commercial Tax Impact
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              Commercial and industrial properties see a two-tiered rollback. Industrial assessed value led the city's growth this year, jumping 21.3%.
            </p>
            <div className="rounded-2xl border border-blue-100/50 bg-white p-5 shadow-sm">
              <p className="mb-1 text-sm font-semibold text-slate-500">For a typical $1,000,000 property:</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-blue-600">−$72</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">Annual Change</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-700">$13,855</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">Total City Tax</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ---------- Utility bill ---------- */}
        <Card>
          <SectionHeader
            title="Monthly Utility Rates"
            subtitle="Combined fees for water, sewer, solid waste, and stormwater."
            icon={Droplets}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm text-slate-600">
                The typical residential customer's combined monthly utility bill rises <strong>$7.90 (5.8%)</strong> to <strong>$144.81</strong>, funding ongoing operations and major capital projects.
              </p>
              <div className="space-y-3">
                {utilityLines.map((u) => (
                  <div key={u.name} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <span className="font-medium text-slate-700">{u.name}</span>
                    <span className="font-bold text-slate-900">
                      {u.amount}{' '}
                      <span className={`text-xs font-normal ${u.up ? 'text-orange-600' : 'text-slate-500'}`}>({u.delta})</span>
                    </span>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                  <span className="font-bold text-emerald-800">Total Monthly Charge</span>
                  <span className="text-xl font-black text-emerald-700">$144.81</span>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <Waves size={18} className="mt-0.5 shrink-0 text-amber-700" />
                <p className="text-xs leading-relaxed text-amber-900">
                  <strong>What's driving the increase:</strong> the Northwest Water Treatment Plant expansion ($28M FY27) and a $103.5M sewer solids-handling and nutrient-reduction project keeping the plant in 100% permit compliance.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-slate-700">How We Compare (Iowa Cities)</h4>
              <div className="space-y-4">
                {iowaUtilityComparison.map((c, i) => (
                  <div key={i}>
                    <div className="mb-1 flex items-end justify-between">
                      <span className={`text-sm font-semibold ${c.highlight ? 'text-emerald-700' : 'text-slate-600'}`}>{c.city}</span>
                      <span className={`text-sm font-bold ${c.highlight ? 'text-emerald-700' : 'text-slate-800'}`}>${c.rate.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${c.highlight ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        style={{ width: `${(c.rate / 200) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ---------- Tax base & valuations ---------- */}
        <Card>
          <SectionHeader
            title="Tax Base & Valuations"
            subtitle="Cedar Rapids has a varied tax base — manufacturing, food processing, healthcare, telecom, and aerospace all play a role."
            icon={Factory}
          />

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Total Assessed Value (FY27)</h4>
              <p className="text-4xl font-black tracking-tight text-slate-800">$16.85B <span className="ml-2 text-lg font-bold text-emerald-500">+6.1%</span></p>
              <p className="mt-2 text-sm font-medium text-slate-500">+$975.1M from FY26. Industrial value alone jumped 21.3%.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">Total Taxable Value (FY27)</h4>
              <p className="text-4xl font-black tracking-tight text-slate-800">$7.93B <span className="ml-2 text-lg font-bold text-emerald-500">+1.45%</span></p>
              <p className="mt-2 text-sm font-medium text-slate-500">Smaller than assessed because state rollbacks reduce the taxable portion.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">Top 10 Principal Property Taxpayers</h4>
              <div className="space-y-2.5">
                {topTaxpayers.map((t, i) => (
                  <div key={i} className="flex flex-col rounded-lg border border-slate-100 bg-white p-2.5">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">{i + 1}. {t.name}</span>
                      <span className="text-xs font-bold text-slate-900">{t.value}</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: t.fill }} />
                    </div>
                  </div>
                ))}
                <p className="border-t border-slate-100 pt-2 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Combined Top 10 = 11% of Total Valuation
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">Valuation Growth by Class (FY26 → FY27)</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Class</th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Assessed</th>
                      <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Taxable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {valuationByClass.map((row, i) => (
                      <tr key={i} className="transition-colors hover:bg-slate-50">
                        <td className="px-4 py-4 font-semibold text-slate-700">{row.name}</td>
                        <td className="px-4 py-4 text-right">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-sm ${row.assessedPos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{row.assessed}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-sm ${row.taxablePos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{row.taxable}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200 bg-slate-50">
                      <td className="px-4 py-4 font-bold text-slate-800">Total Net</td>
                      <td className="px-4 py-4 text-right font-bold text-emerald-700">+6.1%</td>
                      <td className="px-4 py-4 text-right font-bold text-emerald-700">+1.45%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <h4 className="mb-3 flex items-center gap-2 font-bold text-indigo-800">
              <TrendingUp size={18} /> Tax Increment Financing (TIF) Areas
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-indigo-700">
              TIF area assessed valuations grew <strong>$124.8M (17.4%)</strong> to a total of <strong>$843.8M</strong> — major reinvestment in designated districts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-indigo-100/50 bg-white/60 p-3 text-center">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">Residential</p>
                <p className="text-xl font-black text-indigo-700">+17.7%</p>
              </div>
              <div className="rounded-lg border border-indigo-100/50 bg-white/60 p-3 text-center">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">Commercial</p>
                <p className="text-xl font-black text-indigo-700">+11.4%</p>
              </div>
              <div className="rounded-lg border border-indigo-100/50 bg-white/60 p-3 text-center">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">Industrial</p>
                <p className="text-xl font-black text-indigo-700">+78.1%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* ---------- Levy rate ---------- */}
        <Card>
          <SectionHeader
            title="City Property Tax Levy Rate"
            subtitle="The levy holds at $16.6562 per $1,000 of taxable value — flat for the second year in a row."
            icon={TrendingUp}
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-700">Levy Rate History</h4>
              <div className="h-[200px] sm:h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={levyHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.2']} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                      contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(v: number) => [`$${v.toFixed(2)}`, 'Levy Rate']}
                    />
                    <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#0ea5e9' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#0284c7' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">FY 2027 Allocation</h4>
              <div className="space-y-3">
                {levyAllocation.map((item, i) => (
                  <div key={i} className="flex flex-col rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                      <span className="text-sm font-bold text-slate-900">${item.rate.toFixed(5)}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: item.fill }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ---------- Capital plan ---------- */}
        <Card>
          <SectionHeader
            title="Capital Improvement Plan"
            subtitle="Planned investments across all funds — $361.2M total."
            icon={Hammer}
          />

          <div className="mt-6 h-[260px] sm:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalCIPData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} style={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(v: number) => [`$${v}M`, 'Allocated']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[0, 6, 6, 0]} barSize={28}>
                  {totalCIPData.map((_, i) => <Cell key={i} fill={i < 2 ? '#0369a1' : '#38bdf8'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h5 className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                <Droplets size={18} className="text-blue-600" /> Flood Control System
              </h5>
              <p className="mb-3 text-sm text-slate-600">
                Ongoing construction of walls, levees, and gates protecting the city. Key FY27 work: 8th Avenue Bridge replacement and USACE construction matches.
              </p>
              <div className="text-2xl font-black text-blue-700">$70.6M</div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h5 className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                <Leaf size={18} className="text-emerald-600" /> River Activation
              </h5>
              <p className="mb-3 text-sm text-slate-600">
                Transforming Mays Island into a culturally significant public space and energizing the downtown riverfront with distinctive amenities and events.
              </p>
              <div className="text-2xl font-black text-emerald-700">$5.0M</div>
            </div>
          </div>
        </Card>

        {/* ---------- Explore departments ---------- */}
        <Card>
          <SectionHeader
            title="Explore Every Department"
            subtitle={`All ${allDepts.length} budgeted departments and divisions, biggest first. Click any tile for detail.`}
            icon={Building2}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allDepts.map((d: any) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelectDept(d.id)}
                  className="group flex flex-col items-start rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <span
                    className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
                    style={{ backgroundColor: d.color }}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700">{d.name}</span>
                  <span className="mt-1 text-lg font-black text-slate-900">${d.budget}M</span>
                  <div className="mt-2 flex items-center justify-between gap-2 self-stretch">
                    {d.fundType ? (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {d.fundType}
                      </span>
                    ) : <span />}
                    <ChevronRight size={14} className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* ---------- Citizen survey ---------- */}
        <Card>
          <SectionHeader
            title="Citizen Survey"
            subtitle="Summary of responses from the annual resident budget survey."
            icon={MessageSquare}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">"How do you feel about City Taxes?"</h4>
              <div className="flex h-4 overflow-hidden rounded-full shadow-inner">
                <div style={{ width: '51%' }} className="group relative bg-rose-500">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Too High: 51%
                  </div>
                </div>
                <div style={{ width: '46%' }} className="group relative bg-sky-400">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    About Right: 46%
                  </div>
                </div>
                <div style={{ width: '3%' }} className="group relative bg-emerald-400">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Too Low: 3%
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1 text-rose-600"><div className="h-2 w-2 rounded-full bg-rose-500" />Too High (51%)</span>
                <span className="flex items-center gap-1 text-sky-600"><div className="h-2 w-2 rounded-full bg-sky-400" />About Right (46%)</span>
                <span className="flex items-center gap-1 text-emerald-600"><div className="h-2 w-2 rounded-full bg-emerald-400" />Too Low (3%)</span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">"Willing to pay more property taxes for…"</h4>
              <div className="space-y-4">
                {surveyPriorities.map((item, i) => (
                  <div key={i}>
                    <div className="mb-1 flex items-end justify-between text-sm font-semibold">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-400">{item.value} votes</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${(item.value / 433) * 100}%`, backgroundColor: i === 0 ? '#ea580c' : '#94a3b8' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </main>

      <footer className="mx-auto mt-16 max-w-6xl border-t border-slate-200 px-6 pt-8 text-center">
        <p className="text-xs text-slate-500">
          Data sourced from the Cedar Rapids FY 2027 Budget Documents
        </p>
      </footer>
    </motion.div>
  );
}
