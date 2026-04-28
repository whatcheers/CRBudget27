import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './Home';
import DepartmentDetail from './DepartmentDetail';

export default function App() {
  const [activeDept, setActiveDept] = useState<string | null>(null);
  
  // scroll to top on nav
  useEffect(() => {
    window.scrollTo(0,0);
  }, [activeDept])

  return (
    <AnimatePresence mode="wait">
      {activeDept === null ? (
        <Home key="home" onSelectDept={setActiveDept} />
      ) : (
        <DepartmentDetail key="detail" deptId={activeDept} onBack={() => setActiveDept(null)} />
      )}
    </AnimatePresence>
  );
}
