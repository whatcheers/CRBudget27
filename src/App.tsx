import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './Home';
import DepartmentDetail from './DepartmentDetail';
import Highlights from './Highlights';
import Surveillance from './Surveillance';

type View =
  | { kind: 'home' }
  | { kind: 'highlights' }
  | { kind: 'surveillance' }
  | { kind: 'detail', deptId: string };

const BASE = '/budget';

const viewToPath = (v: View): string => {
  if (v.kind === 'home') return `${BASE}/`;
  if (v.kind === 'highlights') return `${BASE}/highlights`;
  if (v.kind === 'surveillance') return `${BASE}/surveillance`;
  return `${BASE}/dept/${v.deptId}`;
};

const pathToView = (path: string): View => {
  const p = path.replace(BASE, '') || '/';
  if (p === '/highlights') return { kind: 'highlights' };
  if (p === '/surveillance') return { kind: 'surveillance' };
  const m = /^\/dept\/([^/]+)$/.exec(p);
  if (m) return { kind: 'detail', deptId: decodeURIComponent(m[1]) };
  return { kind: 'home' };
};

export default function App() {
  const [view, setView] = useState<View>(() => pathToView(window.location.pathname));

  // Push view changes into browser history so the back button works.
  const navigate = useCallback((next: View) => {
    setView((prev) => {
      const prevPath = viewToPath(prev);
      const nextPath = viewToPath(next);
      if (prevPath !== nextPath) {
        window.history.pushState(next, '', nextPath);
      }
      return next;
    });
  }, []);

  // React to browser back/forward.
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const next = (e.state as View | null) ?? pathToView(window.location.pathname);
      setView(next);
    };
    window.addEventListener('popstate', onPop);
    // Seed initial history entry so popstate has something to restore to.
    if (window.history.state == null) {
      window.history.replaceState(view, '', viewToPath(view));
    }
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Scroll to top whenever the view changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <AnimatePresence mode="wait">
      {view.kind === 'home' && (
        <Home
          key="home"
          onSelectDept={(deptId) => navigate({ kind: 'detail', deptId })}
          onShowHighlights={() => navigate({ kind: 'highlights' })}
          onShowSurveillance={() => navigate({ kind: 'surveillance' })}
        />
      )}
      {view.kind === 'highlights' && (
        <Highlights
          key="highlights"
          onBack={() => window.history.back()}
          onSelectDept={(deptId) => navigate({ kind: 'detail', deptId })}
        />
      )}
      {view.kind === 'surveillance' && (
        <Surveillance
          key="surveillance"
          onBack={() => window.history.back()}
        />
      )}
      {view.kind === 'detail' && (
        <DepartmentDetail
          key="detail"
          deptId={view.deptId}
          onBack={() => window.history.back()}
        />
      )}
    </AnimatePresence>
  );
}
