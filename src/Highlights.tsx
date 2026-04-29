import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Home as HomeIcon,
  Droplets,
  Receipt,
  Hammer,
  Landmark,
  MessageSquare,
  ShieldCheck,
  Flame,
  Wrench,
  Leaf,
  BookOpen,
  Building2,
  Bus,
  Waves,
  TreePine,
} from 'lucide-react';

type Props = {
  onBack: () => void,
  onSelectDept: (id: string) => void,
  key?: string,
};

const GENERAL_FUND_TOTAL = 178.6;

const generalFundShare = [
  { name: 'Police', value: 52.4, color: '#1e3a8a', icon: ShieldCheck, id: 'police' },
  { name: 'Public Works', value: 28.2, color: '#ea580c', icon: Wrench, id: 'publicWorks' },
  { name: 'Fire', value: 26.9, color: '#dc2626', icon: Flame, id: 'fire' },
  { name: 'Parks & Rec', value: 13.3, color: '#16a34a', icon: Leaf, id: 'parks' },
  { name: 'Info Tech', value: 9.3, color: '#0891b2', icon: Building2, id: 'infoTech' },
  { name: 'Library', value: 9.1, color: '#4f46e5', icon: BookOpen },
  { name: 'Everything else', value: 39.4, color: '#64748b', icon: Landmark },
];

type Project = {
  title: string,
  blurb: string,
  amount: string,
  deptId?: string,
  deptName: string,
  icon: any,
  accent: string,
  bg: string,
};

const projects: Project[] = [
  {
    title: 'Northwest Water Treatment Plant',
    blurb: 'Major expansion that drives the FY27 utility bill increase. Adds long-term capacity for Cedar Rapids, Robins, and Poweshiek.',
    amount: '$28M',
    deptId: 'water',
    deptName: 'Water',
    icon: Droplets,
    accent: '#0284c7',
    bg: 'from-sky-50 to-blue-50',
  },
  {
    title: 'Sewer solids-handling & nutrient reduction',
    blurb: 'The single biggest capital line in the budget. Drives the 9% sewer rate increase, but keeps the plant in 100% permit compliance.',
    amount: '$103.5M',
    deptId: 'wpc',
    deptName: 'Pollution Control',
    icon: Waves,
    accent: '#0d9488',
    bg: 'from-teal-50 to-emerald-50',
  },
  {
    title: 'Flood Control System & 8th Avenue Bridge',
    blurb: 'Walls, levees, and gates protecting downtown — plus replacement of the 8th Avenue Bridge as part of the system.',
    amount: '$70.6M',
    deptId: 'publicWorks',
    deptName: 'Public Works',
    icon: Hammer,
    accent: '#0369a1',
    bg: 'from-blue-50 to-indigo-50',
  },
  {
    title: 'Street improvements (Paving for Progress)',
    blurb: 'The #1 thing residents asked for in the survey. 49 paving projects plus 34 maintenance projects shipped in the last year.',
    amount: '$39.2M',
    deptId: 'publicWorks',
    deptName: 'Public Works',
    icon: Wrench,
    accent: '#ea580c',
    bg: 'from-orange-50 to-amber-50',
  },
  {
    title: 'Mays Island river activation',
    blurb: 'Phase one of turning Mays Island and the downtown riverfront into a public space with year-round programming.',
    amount: '$5M',
    deptId: 'parks',
    deptName: 'Parks & Rec',
    icon: TreePine,
    accent: '#16a34a',
    bg: 'from-emerald-50 to-green-50',
  },
  {
    title: 'Czech Village & NewBo street lighting',
    blurb: 'Neighborhood-scale lighting upgrades in two of the city’s busiest cultural districts.',
    amount: '$1.1M',
    deptId: 'publicWorks',
    deptName: 'Public Works',
    icon: Wrench,
    accent: '#a16207',
    bg: 'from-yellow-50 to-amber-50',
  },
  {
    title: 'Two new hybrid transit buses',
    blurb: 'Heavy-duty hybrid buses for fixed-route service. Cash fare stays at $1.00; students, seniors, and Medicare riders ride free.',
    amount: '$2.5M',
    deptId: 'transit',
    deptName: 'Transit',
    icon: Bus,
    accent: '#d97706',
    bg: 'from-amber-50 to-orange-50',
  },
  {
    title: 'Citywide trails',
    blurb: 'Continued buildout of the trail network across all funds.',
    amount: '$6.3M',
    deptName: 'Capital Improvement Plan',
    icon: TreePine,
    accent: '#15803d',
    bg: 'from-green-50 to-emerald-50',
  },
];

const surveyResponse = [
  {
    name: 'Streets',
    votes: 433,
    response: '$39.2M for street improvements — the single largest tax-supported capital line.',
    deptId: 'publicWorks',
    color: '#ea580c',
  },
  {
    name: 'Police & Fire',
    votes: 285,
    response: 'Police ($52.4M) and Fire ($26.9M) together are 44% of every General Fund dollar.',
    deptId: 'police',
    color: '#dc2626',
  },
  {
    name: 'Parks',
    votes: 273,
    response: '$13.3M operating + $5M for Mays Island + $5.5M recreation CIP. ReLeaf planted 8,000 trees.',
    deptId: 'parks',
    color: '#16a34a',
  },
  {
    name: 'Affordable Housing',
    votes: 249,
    response: 'No dedicated FY27 line in the operating budget. Funded through TIF, ARPA carryover, and federal grants — not the property-tax bill.',
    color: '#7c3aed',
  },
  {
    name: 'Recreation / Community Centers',
    votes: 212,
    response: '$5.5M in CIP for recreation facilities; $300K for mold remediation and drainage at Tait Cummins and Usher Ferry.',
    deptId: 'parks',
    color: '#0891b2',
  },
];

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

export default function Highlights({ onBack, onSelectDept }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 pb-20"
    >
      <header className="relative overflow-hidden bg-emerald-900 px-6 pb-24 pt-12 text-white shadow-md">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={16} /> Budget Overview
          </button>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-300 opacity-90">
            FY27 · Resident's Guide
          </h2>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            What FY27 means for Cedar Rapids
          </h1>
          <p className="max-w-3xl text-lg font-light leading-relaxed text-emerald-100">
            What you'll pay, what's getting built, and how the city responded to what residents asked for in the survey.
          </p>
        </div>
      </header>

      <main className="relative z-20 mx-auto -mt-12 max-w-6xl space-y-8 px-6">
        {/* Your bill */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-lg"
          >
            <div className="mb-4 w-max rounded-xl bg-white/70 p-3 text-emerald-700">
              <HomeIcon size={24} />
            </div>
            <p className="mb-1 text-sm font-semibold text-slate-500">Your property tax bill</p>
            <h3 className="text-3xl font-bold text-slate-800">$1,484<span className="text-base font-medium text-slate-400">/yr</span></h3>
            <p className="mt-2 text-sm font-medium text-emerald-700">
              -$97 vs FY26 on a typical $200,000 home.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Levy rate held flat; residential rollback dropped what's actually taxable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-6 shadow-lg"
          >
            <div className="mb-4 w-max rounded-xl bg-white/70 p-3 text-sky-700">
              <Droplets size={24} />
            </div>
            <p className="mb-1 text-sm font-semibold text-slate-500">Your monthly utility bill</p>
            <h3 className="text-3xl font-bold text-slate-800">$144.81<span className="text-base font-medium text-slate-400">/mo</span></h3>
            <p className="mt-2 text-sm font-medium text-sky-700">
              +$7.90 (+5.8%) vs FY26.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Sewer +9%, water +6%, solid waste & stormwater unchanged. Funds the NW Water Treatment Plant.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
          >
            <div className="mb-4 w-max rounded-xl bg-slate-100 p-3 text-slate-700">
              <Receipt size={24} />
            </div>
            <p className="mb-1 text-sm font-semibold text-slate-500">City levy rate</p>
            <h3 className="text-3xl font-bold text-slate-800">$16.6562</h3>
            <p className="mt-2 text-sm font-medium text-slate-600">
              per $1,000 of taxable value.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Unchanged for the second year in a row.
            </p>
          </motion.div>
        </div>

        {/* What's getting built */}
        <Card>
          <SectionHeader
            title="What's actually getting built"
            subtitle="The visible projects in the FY27 budget. Not every line item — the ones residents will see, drive over, or pay for."
            icon={Hammer}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((p) => {
              const Icon = p.icon;
              const interactive = !!p.deptId;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  className={`flex flex-col gap-3 rounded-2xl border border-slate-100 bg-gradient-to-br ${p.bg} p-5 shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                        style={{ backgroundColor: p.accent }}
                      >
                        <Icon size={20} />
                      </div>
                      <h4 className="text-base font-bold leading-tight text-slate-800">{p.title}</h4>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-2xl font-black tracking-tight" style={{ color: p.accent }}>{p.amount}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{p.blurb}</p>
                  {interactive ? (
                    <button
                      onClick={() => onSelectDept(p.deptId!)}
                      className="mt-1 inline-flex items-center gap-1 self-start text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900"
                    >
                      Part of: {p.deptName} <ArrowRight size={12} />
                    </button>
                  ) : (
                    <span className="mt-1 inline-flex items-center gap-1 self-start text-xs font-bold uppercase tracking-wider text-slate-400">
                      {p.deptName}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Where every $100 goes */}
        <Card>
          <SectionHeader
            title="Where every $100 of your city tax goes"
            subtitle="General Fund operating spending only. The other 60% of city activity — water, sewer, transit, airport — is paid by user fees, not your tax bill."
            icon={Landmark}
          />
          <div className="space-y-3">
            {generalFundShare.map((d) => {
              const Icon = d.icon;
              const dollars = (d.value / GENERAL_FUND_TOTAL) * 100;
              const interactive = !!d.id;
              return (
                <div
                  key={d.name}
                  onClick={() => d.id && onSelectDept(d.id)}
                  className={`group flex items-center gap-4 rounded-xl p-3 transition-colors ${interactive ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: d.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="font-semibold text-slate-700">
                        {d.name}
                        {interactive && <span className="ml-2 text-xs font-normal text-slate-400">Click for details →</span>}
                      </span>
                      <span className="font-black text-slate-900">${dollars.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${dollars}%`, backgroundColor: d.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
            Out of every $100 in General Fund spending. Total General Fund: ${GENERAL_FUND_TOTAL}M.
          </p>
        </Card>

        {/* What residents asked for vs what got funded */}
        <Card>
          <SectionHeader
            title="What residents asked for, and what got funded"
            subtitle="The 2025 citizen survey asked residents what they'd pay more in property taxes for. Here's how each of those priorities shows up in the FY27 budget."
            icon={MessageSquare}
          />
          <div className="space-y-4">
            {surveyResponse.map((s) => {
              const interactive = !!s.deptId;
              return (
                <div
                  key={s.name}
                  className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 md:grid-cols-[220px_1fr] md:items-center"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Resident priority</p>
                    <p className="mt-1 text-lg font-bold text-slate-800">{s.name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(s.votes / 433) * 100}%`, backgroundColor: s.color }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{s.votes} votes</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">FY27 response</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{s.response}</p>
                    {interactive && (
                      <button
                        onClick={() => onSelectDept(s.deptId!)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-700 transition-colors hover:text-emerald-900"
                      >
                        See the department <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col items-center gap-3 pt-4 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
          >
            <ArrowLeft size={16} /> Back to the full budget overview
          </button>
          <p className="text-xs text-slate-400">Source: City of Cedar Rapids FY27 Council Book.</p>
        </div>
      </main>
    </motion.div>
  );
}
