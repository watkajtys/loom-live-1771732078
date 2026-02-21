// --- Components ---

const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-50 pt-12 pb-4 px-6 flex justify-between items-center bg-gradient-to-b from-mono-bg/90 to-transparent pointer-events-none">
    <div className="flex items-center gap-3 text-mono-text-secondary pointer-events-auto">
      <span className="material-symbols-outlined text-sm opacity-70">menu_book</span>
      <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium">
        <span className="opacity-50">Eldoria</span>
        <span className="opacity-30">/</span>
        <span className="opacity-50">Fractured Lands</span>
        <span className="opacity-30">/</span>
        <span className="text-white border-b border-white/20 pb-0.5">Whispering Woods</span>
      </div>
    </div>
    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-mono-border hover:bg-white/5 transition-colors text-mono-text-primary pointer-events-auto">
      <span className="material-symbols-outlined text-sm">settings</span>
    </button>
  </header>
);

const ConnectionLayer = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
    <path className="connector-line" d="M180,300 C250,300 150,520 220,520" fill="none" stroke="#888"></path>
    <path className="connector-line" d="M220,520 C280,520 300,450 340,400" fill="none" stroke="#888" strokeOpacity="0.5"></path>
    <rect fill="#1c1c1e" height="18" rx="4" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" width="90" x="185" y="383"></rect>
    <text fill="#ccc" fontFamily="Inter" fontSize="9" letterSpacing="0.5" textAnchor="middle" x="230" y="396">CORRUPTION</text>
  </svg>
);

const ObsidianSpireNode = () => (
  <div className="absolute top-[220px] left-6 w-64 glass-panel rounded-sm p-5 cursor-grab active:cursor-grabbing hover:border-white/30 transition-colors group">
    <div className="active-node-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex items-start justify-between mb-4">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-mono-text-secondary">Location</span>
        <h3 className="text-white font-serif font-normal text-xl leading-tight italic">The Obsidian Spire</h3>
      </div>
      <span className="material-symbols-outlined text-mono-text-secondary text-base opacity-50">castle</span>
    </div>
    <div className="h-20 w-full bg-black/40 mb-4 overflow-hidden relative border border-white/5 grayscale hover:grayscale-0 transition-all duration-500">
      <img
        alt="Dark gothic spire silhouette against a purple night sky"
        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAByVTR-yxgCClyixotMUZlPor2O-lqoFPHuXmgVjWa4bFIy_XOXtFuDFgEpSxw9jT2LbYlAUdQ6_jrnu2IC7WYOEozccyXXobBTeyyixE_B9_SnkRIGd1IXmMVOVLZhrGxZMDqisvQxGzBcYenfCND1earVxqjOC5rYdJ96dVnhzBlMHchYwLidtYINofq5wxl9RBCCETqyug6U5ioV2hLz-xhcfr1b-_6WXJvMU-9P5k20l5aAECVQpD1NoTgoSqzCsTve9ON1cA"
      />
    </div>
    <div className="border-t border-white/10 pt-3 mt-1 flex justify-between items-center">
      <span className="text-[10px] text-mono-text-secondary">Magical Focus Point</span>
      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
    </div>
  </div>
);

const WhisperingWoodsNode = () => (
  <div className="absolute top-[480px] left-1/2 -translate-x-1/2 w-72 glass-panel rounded-sm p-6 cursor-grab active:cursor-grabbing hover:border-white/40 transition-colors group z-20">
    <div className="active-node-glow opacity-100"></div>
    <div className="flex items-start justify-between mb-4">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-mono-text-secondary">Territory</span>
        <h3 className="text-white font-serif font-semibold text-2xl leading-tight">Whispering Woods</h3>
      </div>
      <div className="w-6 h-6 border border-white/20 flex items-center justify-center text-white/70 rounded-full">
        <span className="material-symbols-outlined text-sm">forest</span>
      </div>
    </div>
    <p className="text-sm font-serif italic text-mono-text-secondary mb-5 leading-relaxed border-l-2 border-white/20 pl-3">
      "Home of the unseen fae. The trees themselves seem to shift when not observed directly."
    </p>
    <div className="flex items-center justify-between pt-2 border-t border-white/10">
      <div className="flex -space-x-3 opacity-70 grayscale group-hover:grayscale-0 transition-all">
        <div className="w-6 h-6 rounded-full bg-gray-600 border border-mono-bg"></div>
        <div className="w-6 h-6 rounded-full bg-gray-500 border border-mono-bg"></div>
        <div className="w-6 h-6 rounded-full bg-gray-800 border border-mono-bg flex items-center justify-center text-[8px] text-white">+3</div>
      </div>
      <button className="text-[10px] uppercase tracking-widest text-white hover:text-white/70 transition-colors border border-white/20 px-3 py-1 rounded-full hover:bg-white/5">
        Inspect
      </button>
    </div>
  </div>
);

const SunkenGrottoNode = () => (
  <div className="absolute top-[350px] left-[320px] w-48 glass-panel rounded-sm p-4 opacity-40 hover:opacity-100 transition-opacity scale-95 border-dashed border-white/20">
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-slate-200 font-serif text-lg italic">Sunken Grotto</h4>
      <span className="material-symbols-outlined text-xs text-mono-text-secondary">water_drop</span>
    </div>
    <div className="h-[1px] w-full bg-white/10 mt-2 mb-2">
      <div className="h-full bg-white w-1/3"></div>
    </div>
    <p className="text-[9px] uppercase tracking-widest text-mono-text-secondary text-right">Draft</p>
  </div>
);

const FloatingControls = () => (
  <div className="absolute bottom-10 right-8 z-50 flex flex-col items-end gap-4 group pointer-events-none">
    <div className="flex flex-col gap-3 items-end transition-all duration-300 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto mb-2">
      <button className="w-10 h-10 glass-panel rounded-full flex items-center justify-center text-mono-text-secondary hover:text-white hover:border-white transition-all shadow-lg pointer-events-auto" title="Add Node">
        <span className="material-symbols-outlined text-lg">add</span>
      </button>
      <button className="w-10 h-10 glass-panel rounded-full flex items-center justify-center text-mono-text-secondary hover:text-white hover:border-white transition-all shadow-lg pointer-events-auto" title="Search">
        <span className="material-symbols-outlined text-lg">search</span>
      </button>
      <button className="w-10 h-10 glass-panel rounded-full flex items-center justify-center text-mono-text-secondary hover:text-white hover:border-white transition-all shadow-lg pointer-events-auto" title="Zoom">
        <span className="material-symbols-outlined text-lg">center_focus_strong</span>
      </button>
    </div>
    <button className="w-14 h-14 bg-white text-mono-bg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50 pointer-events-auto">
      <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">more_horiz</span>
    </button>
  </div>
);

const Pagination = () => (
  <div className="absolute bottom-0 w-full z-40 flex justify-center pb-4 pointer-events-none">
    <div className="flex gap-1.5 pointer-events-auto glass-panel px-3 py-1.5 rounded-full border border-white/10">
      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      <div className="w-1.5 h-1.5 bg-white/20 rounded-full hover:bg-white/50 transition-colors cursor-pointer"></div>
      <div className="w-1.5 h-1.5 bg-white/20 rounded-full hover:bg-white/50 transition-colors cursor-pointer"></div>
    </div>
  </div>
);

function App() {
  return (
    <div className="h-full w-full flex flex-col bg-mono-bg text-mono-text-primary font-sans overflow-hidden relative antialiased selection:bg-white selection:text-mono-bg">
      <Header />
      <main className="flex-1 relative w-full h-full overflow-hidden z-10 touch-none">
        <ConnectionLayer />
        <ObsidianSpireNode />
        <WhisperingWoodsNode />
        <SunkenGrottoNode />
      </main>
      <FloatingControls />
      <Pagination />
    </div>
  );
}

export default App;
