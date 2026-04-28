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
import { ArrowLeft, Users, Zap, CheckCircle2, Bookmark, Flame, ShieldCheck, Wrench, Leaf, Plane, Bus, Recycle, Droplets, Waves, Building2 } from 'lucide-react';

export default function DepartmentDetail({ 
  deptId, 
  onBack 
}: { 
  deptId: string, 
  onBack: () => void,
  key?: string
}) {
  const dept = DEPARTMENTS[deptId as keyof typeof DEPARTMENTS];
  if (!dept) return null;
  const Icon = dept.icon;

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
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">{dept.name}</h1>
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
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] text-center shadow-2xl min-w-[280px]">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-3">Total Department Budget</p>
              <p className="text-6xl font-black text-white tracking-tight">${dept.budget}<span className="text-3xl text-white/70">M</span></p>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm bg-black/20 rounded-xl px-4 py-3">
                  <span className="text-white/70 font-medium">Full-Time Equivalent</span>
                  <span className="font-bold flex items-center gap-2"><Users size={16} className="text-white/60"/> {dept.ftes}</span>
                </div>
              </div>
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
             className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-8"
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
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[...dept.expenses].sort((a,b) => b.value - a.value)} 
                  layout="vertical" 
                  margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f8fafc" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `$${val}M`} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 600}} width={120} />
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
      </main>
    </motion.div>
  );
}

