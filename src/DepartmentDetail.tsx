import React from 'react';
import { motion } from 'motion/react';
import { DEPARTMENTS } from './data';
import { 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from 'recharts';
import { ArrowLeft, Users, Zap, CheckCircle2, Bookmark, Flame, ShieldCheck, Wrench, Leaf, Plane, Bus, Recycle, Droplets, Waves, Building2, TrendingUp, TrendingDown, Coins, PieChart, Sparkles, FileText } from 'lucide-react';

type SourceCitation = {
  page: number | null;
  account: string | null;
  label: string;
  amount: number;
  amountFormatted: string;
  column: string;
  diffPct: number;
  extractLine: number;
  layoutLine: number;
  document: string;
};
type SourcesFile = {
  deptId: string;
  document: string;
  pdf: string;
  totalExpenditures: SourceCitation | null;
  totalRevenues: SourceCitation | null;
  revenueSources: (SourceCitation | null)[];
  expenditureBuckets: (SourceCitation | null)[];
  didYouKnow: (SourceCitation | null)[];
  notableChanges: (SourceCitation | null)[];
};
const SOURCES_BY_DEPT = import.meta.glob<{ default: SourcesFile }>('./sources/*.json', { eager: true });
const SOURCES: Record<string, SourcesFile> = Object.fromEntries(
  Object.entries(SOURCES_BY_DEPT).map(([path, mod]) => {
    const id = path.replace(/^\.\/sources\//, '').replace(/\.json$/, '');
    return [id, mod.default];
  })
);

function SourceChip({ source }: { source: SourceCitation | null | undefined }) {
  if (!source) return null;
  const bits = [`p.${source.page}`];
  if (source.account) bits.push(source.account);
  const title = `${source.document} — ${source.label} (${source.column}): ${source.amountFormatted}`;
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide text-slate-500 bg-slate-100 border border-slate-200 align-middle"
    >
      <FileText size={10} className="opacity-60" />
      {bits.join(' · ')}
    </span>
  );
}

function splitLabel(label: string): [string, string?] {
  if (label.length <= 14) return [label];
  const breakChars = ['/', '&', ' '];
  for (const ch of breakChars) {
    const idx = label.lastIndexOf(ch, Math.ceil(label.length / 2) + 3);
    if (idx > 2 && idx < label.length - 2) {
      const left = label.slice(0, ch === ' ' ? idx : idx + 1).trim();
      const right = label.slice(idx + 1).trim();
      if (left && right) return [left, right];
    }
  }
  const mid = Math.ceil(label.length / 2);
  return [label.slice(0, mid), label.slice(mid)];
}

function YAxisWrappedTick(props: any) {
  const { x, y, payload } = props;
  const lines = splitLabel(String(payload.value));
  const style = { fill: '#475569', fontSize: 13, fontWeight: 600 } as const;
  if (lines.length === 1) {
    return (
      <text x={x} y={y} dy={4} textAnchor="end" style={style}>
        {lines[0]}
      </text>
    );
  }
  return (
    <text x={x} y={y} textAnchor="end" style={style}>
      <tspan x={x} dy={-2}>{lines[0]}</tspan>
      <tspan x={x} dy={14}>{lines[1]}</tspan>
    </text>
  );
}

export default function DepartmentDetail({ 
  deptId, 
  onBack 
}: { 
  deptId: string, 
  onBack: () => void,
  key?: string
}) {
  const dept = DEPARTMENTS[deptId as keyof typeof DEPARTMENTS] as (typeof DEPARTMENTS)[keyof typeof DEPARTMENTS] & {
    supplementalFY27?: {
      totalExpenditures: number;
      totalRevenues: number;
      generalFundGap: number;
      revenueSources: { name: string; value: number }[];
      expenditureBuckets: { name: string; value: number; share: number }[];
      didYouKnow: { label: string; value: string; sub: string }[];
      notableChanges: { name: string; delta: string; note: string }[];
    };
  };
  if (!dept) return null;
  const Icon = dept.icon;
  const supp = dept.supplementalFY27;
  const srcs = SOURCES[dept.id] as SourcesFile | undefined;

  // Extract core services from highlights if they exist
  let coreServicesStr = '';
  const pureHighlights = dept.highlights.filter(h => {
    if (h.startsWith('Core Services:') || h.startsWith('Core services:')) {
      coreServicesStr = h.replace(/^Core [sS]ervices:\s*/, '');
      return false;
    }
    return true;
  });

  const coreServices = coreServicesStr.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen border-none bg-slate-50 font-sans text-slate-900 pb-20 overflow-x-hidden"
    >
      <header className="text-white pt-12 pb-28 px-6 shadow-md relative overflow-hidden" style={{ backgroundColor: dept.color }}>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent z-0"></div>
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
                  <Icon size={36} className="text-white" />
                </div>
                <h2 className="text-emerald-100 font-bold tracking-widest uppercase text-xs opacity-90 border border-white/20 rounded-full px-3 py-1 bg-white/5 backdrop-blur-md">{dept.fundType}</h2>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">{dept.name}</h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-8">
                {dept.description}
              </p>

              {coreServices.length > 0 && (
                 <div className="flex flex-wrap gap-2">
                   {coreServices.map((service, i) => (
                     <div key={i} className="px-3 py-1.5 bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg backdrop-blur-sm flex items-center gap-2 hover:bg-white/20 transition-colors">
                       <Bookmark size={14} className="opacity-70" />
                       {service}
                     </div>
                   ))}
                 </div>
              )}
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-center shadow-2xl w-full md:min-w-[280px] md:w-auto">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-3">Total Department Budget</p>
              <p className="text-4xl sm:text-6xl font-black text-white tracking-tight">${dept.budget}<span className="text-2xl sm:text-3xl text-white/70">M</span></p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/70">{dept.fundType}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 space-y-8">
        
        {/* At a glance stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dept.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (idx * 0.1) }}
              className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-slate-50 border border-slate-100" style={{ color: dept.color }}>
                <Icon size={24} />
              </div>
              <div className="text-4xl font-black text-slate-800 mb-2 tracking-tight">{stat.value}</div>
              <p className="font-semibold text-slate-500 uppercase tracking-widest text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Expenditures */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 md:sticky md:top-8"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700">
                <Zap size={24} style={{ color: dept.color }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Expenditures</h3>
                <p className="text-slate-500 text-sm font-medium">Breakdown of the ${dept.budget}M allocation</p>
              </div>
            </div>
            
            <div className="h-[260px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[...dept.expenses].sort((a,b) => b.value - a.value)} 
                  layout="vertical" 
                  margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f8fafc" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `$${val}M`} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={<YAxisWrappedTick />} width={140} interval={0} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9', radius: 8 }}
                    formatter={(value: number) => [`$${value.toFixed(2)}M`, 'Budget']}
                    contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 'bold', color: '#0f172a' }}
                    itemStyle={{ color: dept.color, fontSize: '16px' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                    {dept.expenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? dept.color : `${dept.color}80`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Key Initiatives</h3>
                <p className="text-slate-500 text-sm font-medium">Major projects and goals for FY27</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {pureHighlights.map((item, idx) => (
                <div key={idx} className="group flex gap-5 bg-slate-50/50 hover:bg-slate-50 p-6 rounded-3xl transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-200 bg-white shadow-sm" style={{ color: dept.color }}>
                    <span className="font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed pt-1.5">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        
        </div>

        {supp && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100" style={{ color: dept.color }}>
                  <Coins size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Where the Money Comes From</h3>
                  <p className="text-slate-500 text-sm font-medium">FY27 revenue sources, totaling ${supp.totalRevenues.toFixed(2)}M</p>
                </div>
              </div>
              <div className="space-y-4">
                {supp.revenueSources.map((r, i) => {
                  const pct = (r.value / supp.totalRevenues) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-semibold text-slate-800">
                          {r.name}
                          <SourceChip source={srcs?.revenueSources?.[i]} />
                        </p>
                        <p className="font-bold tabular-nums text-slate-900">${r.value.toFixed(2)}M <span className="text-slate-400 font-medium text-sm">({pct.toFixed(0)}%)</span></p>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: dept.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 p-5 rounded-2xl border-2 border-dashed flex items-start gap-3" style={{ borderColor: `${dept.color}40`, backgroundColor: `${dept.color}08` }}>
                <div className="shrink-0 mt-0.5" style={{ color: dept.color }}>
                  <TrendingDown size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">${supp.generalFundGap.toFixed(2)}M General Fund Subsidy</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-1">
                    Department revenues (${supp.totalRevenues.toFixed(2)}M) cover most expenses, but the remaining ${supp.generalFundGap.toFixed(2)}M comes from the City's General Fund — supported primarily by property and franchise taxes.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100" style={{ color: dept.color }}>
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Where the Money Goes</h3>
                  <p className="text-slate-500 text-sm font-medium">FY27 spending across ${supp.totalExpenditures.toFixed(2)}M total</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supp.expenditureBuckets.map((b, i) => (
                  <div key={i} className="p-6 rounded-2xl border-2 transition-colors" style={{ borderColor: `${dept.color}30`, backgroundColor: `${dept.color}06` }}>
                    <div className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: dept.color }}>{b.share}%</div>
                    <div className="mt-2 font-bold text-slate-900">{b.name}</div>
                    <div className="text-slate-500 text-sm font-medium tabular-nums">${b.value.toFixed(2)}M</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Did You Know?</h3>
                  <p className="text-slate-500 text-sm font-medium">FY27 line items that keep the City running</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supp.didYouKnow.map((d, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors">
                    <div className="text-3xl font-black tracking-tight" style={{ color: dept.color }}>{d.value}</div>
                    <div className="mt-1 font-bold text-slate-900 text-sm">{d.label}</div>
                    <div className="text-slate-500 text-xs leading-relaxed mt-1">{d.sub}</div>
                    {srcs?.didYouKnow?.[i] && <div className="mt-2"><SourceChip source={srcs.didYouKnow[i]} /></div>}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100" style={{ color: dept.color }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Notable Budget Changes</h3>
                  <p className="text-slate-500 text-sm font-medium">Biggest movers in the FY27 adopted budget</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {supp.notableChanges.map((c, i) => {
                  const isUp = c.delta.trim().startsWith('+');
                  return (
                    <div key={i} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800">
                          {c.name}
                          <SourceChip source={srcs?.notableChanges?.[i]} />
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">{c.note}</p>
                      </div>
                      <div
                        className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold tabular-nums flex items-center gap-1.5"
                        style={{
                          backgroundColor: isUp ? '#dcfce7' : '#fee2e2',
                          color: isUp ? '#15803d' : '#b91c1c'
                        }}
                      >
                        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {c.delta}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {srcs && (
              <div className="text-center text-xs text-slate-500 px-4">
                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200">
                  <FileText size={12} className="opacity-60" />
                  Figures sourced from <span className="font-semibold text-slate-700">{srcs.document}</span>
                  <span className="text-slate-400">— hover a chip to see the page, account, and amount</span>
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </motion.div>
  );
}

