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
  MapPin,
  Flame,
  Wrench,
  AlertTriangle,
  MessageSquare,
  Home as HomeIcon,
  Building,
  Factory,
  Sparkles,
  ArrowRight
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
  Label,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';
import { DEPARTMENTS } from './data';

const generalFundData = [
  { name: 'Police', value: 52.4, color: '#1e3a8a', icon: ShieldCheck, id: 'police' },
  { name: 'Public Works', value: 28.2, color: '#ea580c', icon: Wrench, id: 'publicWorks' },
  { name: 'Fire', value: 26.9, color: '#dc2626', icon: Flame, id: 'fire' },
  { name: 'Parks & Rec', value: 13.3, color: '#16a34a', icon: Leaf, id: 'parks' },
  { name: 'Info Tech', value: 9.3, color: '#0891b2', icon: Building2 },
  { name: 'Library', value: 9.1, color: '#4f46e5', icon: BookOpen },
  { name: 'Other', value: 39.4, color: '#64748b', icon: Landmark },
];

const genFundRevenues = [
  { name: 'Taxes', value: 80.4, color: '#0f766e' },
  { name: 'Transfers In', value: 58.3, color: '#0284c7' },
  { name: 'Charges for Services', value: 18.8, color: '#eab308' },
  { name: 'Other Revenue', value: 6.9, color: '#8b5cf6' },
  { name: 'Fines & Forfeits', value: 6.3, color: '#ef4444' },
  { name: 'Licenses & Permits', value: 4.0, color: '#f97316' },
  { name: 'Intergovernmental', value: 4.0, color: '#10b981' },
];

const totalCIPData = [
  { name: 'Water Pollution Control', value: 106.7 },
  { name: 'Flood Control', value: 70.6 },
  { name: 'Water System', value: 48.0 },
  { name: 'Street Imprv.', value: 39.2 },
  { name: 'Airport', value: 38.9 },
  { name: 'Sanitary Sewer', value: 7.1 },
  { name: 'Trails', value: 6.3 },
  { name: 'Recreation', value: 5.5 },
];

const surveyPriorities = [
  { name: 'Streets', value: 433 },
  { name: 'Police/Fire', value: 285 },
  { name: 'Parks', value: 273 },
  { name: 'Affordable Housing', value: 249 },
  { name: 'Recreation/Comm Ctr', value: 212 },
];

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

export default function Home({ onSelectDept, onShowHighlights }: {
  onSelectDept: (id: string) => void,
  onShowHighlights: () => void,
  key?: string,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 pb-20"
    >
      {/* Header Section */}
      <header className="relative overflow-hidden bg-emerald-900 px-6 pb-24 pt-16 text-white shadow-md">
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/40 to-transparent"></div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-400 opacity-90">
              City of Cedar Rapids, Iowa
            </h2>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl">
              FY 2027 Budget
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-emerald-100 md:text-xl">
              Overview of the Fiscal Year 2027 Budget for the City of Cedar Rapids, outlining allocations across general operations, enterprise funds, and capital improvements.
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
          <div className="min-w-[280px] rounded-3xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-200">
              Total Assessed Value
            </p>
            <p className="text-5xl font-black tracking-tight text-white">$16.9B</p>
            <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200">
              <TrendingUp size={16} /> +6.1% from FY26
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-20 mx-auto -mt-12 max-w-6xl space-y-8 px-6">
        {/* Top Highlights Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
          >
            <div className="mb-4 w-max rounded-xl bg-blue-50 p-3 text-blue-600">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-slate-500">Property Tax Levy Rate</p>
              <h3 className="text-3xl font-bold text-slate-800">$16.6562</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                per $1,000 taxable value. <span className="text-emerald-600">Unchanged.</span> A typical $200k home will pay $97 less.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
          >
            <div className="mb-4 w-max rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Building2 size={24} />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-slate-500">General Fund</p>
              <h3 className="text-3xl font-bold text-slate-800">$178.6M</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Operations. <span className="text-emerald-600">+6% ($10M)</span>.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
          >
            <div className="mb-4 w-max rounded-xl bg-orange-50 p-3 text-orange-600">
              <Wrench size={24} />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-slate-500">Total Capital Projects</p>
              <h3 className="text-3xl font-bold text-slate-800">$361.2M</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">
                Across all funds. Tax-supported: $152.5M.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Economy & Tax Base */}
        <Card>
          <SectionHeader
            title="Economy & Tax Base"
            subtitle="Cedar Rapids has a large and varied tax base due to a variety of commercial, health care, food processing, manufacturing, telecommunication and aerospace companies."
            icon={Factory}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 justify-center">
               <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                 <h4 className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-1">Total Assessed Value (FY27)</h4>
                 <p className="text-4xl font-black text-slate-800 tracking-tight">$16.85B <span className="text-emerald-500 text-lg ml-2 font-bold">+6.1%</span></p>
                 <p className="text-sm text-slate-500 mt-2 font-medium">Assessed value increased $975.1M from FY26. Industrial value jumped an impressive 21.3%.</p>
               </div>
               <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                 <h4 className="text-slate-500 font-bold tracking-widest text-xs uppercase mb-1">Total Taxable Value (FY27)</h4>
                 <p className="text-4xl font-black text-slate-800 tracking-tight">$7.93B <span className="text-emerald-500 text-lg ml-2 font-bold">+1.45%</span></p>
                 <p className="text-sm text-slate-500 mt-2 font-medium">Taxable value is smaller due to state rollback percentages reducing the taxable portion.</p>
               </div>
            </div>

            <div className="flex flex-col">
              <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wider">Top 10 Principal Property Taxpayers (2025)</h4>
              <div className="space-y-3 flex-grow overflow-hidden">
                {[
                  { name: 'Interstate Power & Light Co', value: '$1.19B', fill: '100%' },
                  { name: 'ADM Corn Processing', value: '$109.0M', fill: '9%' },
                  { name: 'St. Lukes Methodist Hospital', value: '$87.5M', fill: '7%' },
                  { name: 'Fedex Warehouse', value: '$65.1M', fill: '6%' },
                  { name: 'Vantage Corn Processors', value: '$63.4M', fill: '5%' },
                  { name: 'Quaker Distributing', value: '$53.8M', fill: '5%' },
                  { name: 'Transamerica Life Ins.', value: '$53.1M', fill: '4%' },
                  { name: 'Rockwell Collins', value: '$48.4M', fill: '4%' },
                  { name: 'International Paper', value: '$37.0M', fill: '3%' },
                  { name: 'Altorfer Inc', value: '$36.2M', fill: '3%' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1.5">
                       <span className="text-xs font-semibold text-slate-700">{idx + 1}. {item.name}</span>
                       <span className="text-xs font-bold text-slate-900">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                       <div className="bg-indigo-500 h-full rounded-full" style={{ width: item.fill }}></div>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right pt-2 border-t border-slate-100">Combined Top 10 = 11% of Total Valuation</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Property Valuations by Class */}
        <Card>
          <SectionHeader
            title="Property Valuation Growth by Class"
            subtitle="Comparing Net Assessed vs. Taxable valuation changes from FY26 to FY27 across property types."
            icon={TrendingUp}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Property Class</th>
                  <th className="py-3 px-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Assessed Valuation</th>
                  <th className="py-3 px-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Taxable Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Residential', assessed: '+6.7%', taxable: '-0.6%', assessedPos: true, taxablePos: false },
                  { name: 'Commercial', assessed: '+4.5%', taxable: '+3.0%', assessedPos: true, taxablePos: true },
                  { name: 'Industrial', assessed: '+21.3%', taxable: '+16.3%', assessedPos: true, taxablePos: true },
                  { name: 'Railroads', assessed: '-11.3%', taxable: '-11.3%', assessedPos: false, taxablePos: false },
                  { name: 'Utilities', assessed: '+0.5%', taxable: '+0.3%', assessedPos: true, taxablePos: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-700">{row.name}</td>
                    <td className="py-4 px-4 text-right font-medium">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-sm ${row.assessedPos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {row.assessed}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-sm ${row.taxablePos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {row.taxable}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-200">
                  <td className="py-4 px-4 font-bold text-slate-800">Total Net Valuation</td>
                  <td className="py-4 px-4 text-right font-bold text-emerald-700">+6.1%</td>
                  <td className="py-4 px-4 text-right font-bold text-emerald-700">+1.45%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* TIF Addition */}
          <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
            <h4 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">
              <TrendingUp size={18} /> Tax Increment Financing (TIF) Areas
            </h4>
            <p className="text-sm text-indigo-700 leading-relaxed mb-4">
              TIF area assessed valuations increased <strong>$124.8M (17.4%)</strong> to a total of <strong>$843.8M</strong>. This growth represents significant reinvestment and new development within the city's designated districts.
            </p>
            <div className="grid grid-cols-3 gap-4">
               <div className="bg-white/60 p-3 rounded-lg border border-indigo-100/50 text-center">
                 <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Residential</p>
                 <p className="text-xl font-black text-indigo-700">+17.7%</p>
               </div>
               <div className="bg-white/60 p-3 rounded-lg border border-indigo-100/50 text-center">
                 <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Commercial</p>
                 <p className="text-xl font-black text-indigo-700">+11.4%</p>
               </div>
               <div className="bg-white/60 p-3 rounded-lg border border-indigo-100/50 text-center">
                 <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Industrial</p>
                 <p className="text-xl font-black text-indigo-700">+78.1%</p>
               </div>
            </div>
          </div>
        </Card>

        {/* Tax Impact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HomeIcon className="text-emerald-600" /> Residential Tax Impact
            </h3>
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">
              Despite the total assessed property value growing by 6.1%, changes to the state residential rollback rate mean the taxable value of residential properties actually decreased.
            </p>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100/50">
              <p className="text-sm font-semibold text-slate-500 mb-1">For a typical $200,000 home:</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-emerald-600">-$97</p>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Annual Change</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-700">$1,484</p>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Total City Tax</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building className="text-blue-600" /> Commercial Tax Impact
            </h3>
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">
              Commercial and industrial properties see a two-tiered rollback. Industrial assessed property value led the city's growth, jumping a massive 21.3% this year.
            </p>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100/50">
              <p className="text-sm font-semibold text-slate-500 mb-1">For a typical $1,000,000 property:</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-blue-600">-$72</p>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Annual Change</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-700">$13,855</p>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Total City Tax</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Levy Rate Breakdown & History */}
        <Card>
          <SectionHeader
            title="City Property Tax Levy Rate"
            subtitle="The levy rate remains $16.6562 per $1,000 of taxable value, maintaining stability over the last two years."
            icon={TrendingUp}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h4 className="font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">Levy Rate History</h4>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { year: '2018', rate: 15.22 },
                      { year: '2019', rate: 15.22 },
                      { year: '2020', rate: 15.44 },
                      { year: '2021', rate: 15.66 },
                      { year: '2022', rate: 15.88 },
                      { year: '2023', rate: 16.03 },
                      { year: '2024', rate: 16.25 },
                      { year: '2025', rate: 16.47 },
                      { year: '2026', rate: 16.66 },
                      { year: '2027', rate: 16.66 }
                    ]}
                    margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.2']} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Levy Rate']}
                    />
                    <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#0ea5e9' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#0284c7' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wider">FY 2027 Allocation</h4>
              <div className="space-y-3">
                {[
                  { name: 'Consolidated General Fund', rate: 8.15440, fill: '49%' },
                  { name: 'Debt Service (Non-Flood)', rate: 2.49725, fill: '15%' },
                  { name: 'Other Employee Benefits', rate: 1.75480, fill: '10%' },
                  { name: 'Debt Service (Flood Control)', rate: 1.47000, fill: '9%' },
                  { name: 'Police & Fire Retirement', rate: 0.94000, fill: '6%' },
                  { name: 'FICA & IPERS', rate: 0.79997, fill: '5%' },
                  { name: 'Transit', rate: 0.77787, fill: '5%' },
                  { name: 'Liability & Property Self-Ins.', rate: 0.26191, fill: '1%' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                       <span className="text-sm font-bold text-slate-900">${item.rate.toFixed(5)}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-blue-500 h-full rounded-full" style={{ width: item.fill }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Utility Bills */}
        <Card>
          <SectionHeader
            title="Monthly Utility Rates"
            subtitle="Combined fees for water, sewer, solid waste, and stormwater."
            icon={Droplets}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <p className="mb-4 text-sm text-slate-600">The typical residential customer will see their combined monthly utility bill increase by <strong>$7.90 (5.8%)</strong> to fund ongoing operations and major capital improvements like the Northwest Water Treatment Plant.</p>
               
               <div className="space-y-3">
                 <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <span className="font-medium text-slate-700">Water Pollution & Sewer</span>
                   <span className="font-bold text-slate-900">$56.90 <span className="text-xs font-normal text-slate-500">(+9.0%)</span></span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <span className="font-medium text-slate-700">Water (inc. tax)</span>
                   <span className="font-bold text-slate-900">$56.51 <span className="text-xs font-normal text-slate-500">(+6.0%)</span></span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <span className="font-medium text-slate-700">Solid & Yard Waste, Recycling</span>
                   <span className="font-bold text-slate-900">$23.32 <span className="text-xs font-normal text-slate-500">(Unchanged)</span></span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <span className="font-medium text-slate-700">Stormwater</span>
                   <span className="font-bold text-slate-900">$8.08 <span className="text-xs font-normal text-slate-500">(Unchanged)</span></span>
                 </div>
                 <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-lg border border-emerald-100 mt-4">
                   <span className="font-bold text-emerald-800">Total Monthly Charge</span>
                   <span className="font-black text-emerald-700 text-xl">$144.81</span>
                 </div>
               </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">How We Compare (Iowa Cities)</h4>
              <div className="space-y-4">
                {[
                  { city: 'Des Moines', rate: 184.26 },
                  { city: 'Dubuque', rate: 182.05 },
                  { city: 'Cedar Rapids (FY27)', rate: 144.81, highlight: true },
                  { city: 'West Des Moines', rate: 141.24 },
                  { city: 'Marion', rate: 140.52 },
                  { city: 'Iowa City', rate: 130.69 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-1">
                      <span className={`text-sm font-semibold ${item.highlight ? 'text-emerald-700' : 'text-slate-600'}`}>{item.city}</span>
                      <span className={`text-sm font-bold ${item.highlight ? 'text-emerald-700' : 'text-slate-800'}`}>${item.rate.toFixed(2)}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.highlight ? 'bg-emerald-500' : 'bg-slate-300'}`} 
                        style={{ width: `${(item.rate / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* General Fund Deep Dive */}
        <Card>
          <SectionHeader
            title="General Fund Breakdown"
            subtitle="Where the operating money comes from and where it goes."
            icon={Landmark}
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Revenues */}
            <div>
              <h4 className="mb-6 text-center text-lg font-bold text-slate-800">
                Revenues ($178.6M)
              </h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genFundRevenues}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {genFundRevenues.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`$${value}M`, 'Revenue']}
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Expenditures */}
            <div>
              <h4 className="mb-6 text-center text-lg font-bold text-slate-800">
                Expenditures by Department
              </h4>
              <div className="space-y-4">
                {generalFundData.map((dept, idx) => {
                  const Icon = dept.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center group p-2 -mx-2 rounded-xl transition-colors ${dept.id ? 'cursor-pointer hover:bg-slate-50' : ''}`}
                      onClick={() => dept.id && onSelectDept(dept.id)}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: dept.color }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="mb-1 flex items-end justify-between">
                          <span className={`font-semibold text-slate-700 ${dept.id ? 'group-hover:text-emerald-700 transition-colors' : ''}`}>
                            {dept.name} {dept.id && <span className="text-xs text-slate-400 font-normal ml-1">Click for details &rarr;</span>}
                          </span>
                          <span className="font-bold text-slate-900">${dept.value}M</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${(dept.value / 178.6) * 100}%`,
                              backgroundColor: dept.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* Capital Improvement Projects */}
        <Card>
          <SectionHeader
            title="Capital Improvement Plan (CIP)"
            subtitle="Planned investments across all funds ($361.2M total)."
            icon={Wrench}
          />

          <div className="mt-6 h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={totalCIPData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}M`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={150}
                  style={{ fill: '#475569', fontSize: 13, fontWeight: 600 }}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(value: number) => [`$${value}M`, 'Allocated']}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="value" fill="#0ea5e9" radius={[0, 6, 6, 0]} barSize={28}>
                  {totalCIPData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 2 ? '#0369a1' : '#38bdf8'} />
                  ))}
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
                Ongoing construction of walls, levees, and gates to protect the city. Key FY27
                projects include the 8th Avenue Bridge and USACE construction matches.
              </p>
              <div className="text-2xl font-black text-blue-700">$70.6M</div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h5 className="mb-2 flex items-center gap-2 font-bold text-slate-800">
                <Leaf size={18} className="text-emerald-600" /> River Activation
              </h5>
              <p className="mb-3 text-sm text-slate-600">
                Transforming Mays Island into a culturally significant public space and energizing
                the downtown riverfront with distinctive amenities and events.
              </p>
              <div className="text-2xl font-black text-emerald-700">$5.0M</div>
            </div>
          </div>
        </Card>

        {/* Citizen Survey */}
        <Card>
          <SectionHeader
            title="Citizen Survey"
            subtitle="Summary of responses from the annual resident budget survey."
            icon={MessageSquare}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                "How do you feel about City Taxes?"
              </h4>
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
                <span className="flex items-center gap-1 text-rose-600">
                  <div className="h-2 w-2 rounded-full bg-rose-500"></div>Too High (51%)
                </span>
                <span className="flex items-center gap-1 text-sky-600">
                  <div className="h-2 w-2 rounded-full bg-sky-400"></div>About Right (46%)
                </span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <div className="h-2 w-2 rounded-full bg-emerald-400"></div>Too Low (3%)
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                "Willing to pay more property taxes for..."
              </h4>
              <div className="space-y-4">
                {surveyPriorities.map((item, idx) => (
                  <div key={idx}>
                    <div className="mb-1 flex items-end justify-between text-sm font-semibold">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-400">{item.value} votes</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(item.value / 433) * 100}%`,
                          backgroundColor: idx === 0 ? '#ea580c' : '#94a3b8',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </main>

      <footer className="mt-16 border-t border-slate-200 px-6 pt-8 text-center max-w-6xl mx-auto">
        <p className="text-sm font-medium tracking-widest text-slate-400 uppercase">
          City of Cedar Rapids, Iowa
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Data sourced from FY 2027 Budget Document. All figures are estimates as provided to City
          Council.
        </p>
      </footer>
    </motion.div>
  );
}
