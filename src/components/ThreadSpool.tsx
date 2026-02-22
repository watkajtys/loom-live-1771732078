export default function ThreadSpool() {
  return (
    <aside className="thread-spool h-full bg-panel-bg border-r border-panel-border flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)] absolute md:relative">
      <div className="w-16 flex flex-col items-center py-6 gap-8 bg-panel-bg/50 backdrop-blur-sm z-20 absolute top-0 bottom-0 left-0 border-r border-white/5">
        <div className="size-10 flex items-center justify-center text-cyber-cyan">
          <span className="material-symbols-outlined text-3xl">all_inclusive</span>
        </div>
        <div className="flex flex-col gap-6 mt-4 w-full items-center">
          <button className="size-10 flex items-center justify-center hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors rounded-none border border-transparent hover:border-cyber-cyan/30">
            <span className="material-symbols-outlined">add</span>
          </button>
          <div className="w-8 h-px bg-white/10"></div>
          <button className="size-10 flex items-center justify-center text-cyber-magenta hover:text-white hover:bg-cyber-magenta/20 transition-colors">
            <span className="material-symbols-outlined">work</span>
          </button>
          <button className="size-10 flex items-center justify-center text-cyber-cyan hover:text-white hover:bg-cyber-cyan/20 transition-colors">
            <span className="material-symbols-outlined">groups</span>
          </button>
          <button className="size-10 flex items-center justify-center text-cyber-yellow hover:text-white hover:bg-cyber-yellow/20 transition-colors">
            <span className="material-symbols-outlined">fitness_center</span>
          </button>
        </div>
        <div className="mt-auto mb-4">
          <button className="size-10 flex items-center justify-center hover:text-cyber-cyan transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>
      <div className="pl-16 w-[320px] h-full flex flex-col bg-panel-bg border-r border-cyber-cyan/20">
        <div className="spool-content h-full flex flex-col p-6">
          <div className="mb-8 border-b border-white/10 pb-4">
            <h1 className="text-white text-2xl font-bold uppercase tracking-widest font-display glitch-text cursor-default">Loominal</h1>
            <p className="text-cyber-cyan text-xs font-mono tracking-tighter">SYS.THREAD_SPOOL.V2</p>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <label className="text-cyber-cyan text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-cyan"></span> Initialize Thread
            </label>
            <div className="relative">
              <textarea className="w-full bg-black/40 border border-white/20 p-3 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all resize-none h-24 rounded-none corner-cut" placeholder="INPUT_TASK_DATA..."></textarea>
              <div className="absolute -right-1 -bottom-1 w-3 h-3 border-r border-b border-cyber-cyan"></div>
            </div>
            <button className="w-full py-2 bg-cyber-cyan/10 border border-cyber-cyan/50 text-cyber-cyan font-mono text-xs hover:bg-cyber-cyan hover:text-black transition-all uppercase tracking-widest font-bold flex items-center justify-center gap-2 group">
              Execute <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto cyber-scrollbar pr-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-white/50 text-xs font-mono uppercase">Buffer Zone</span>
              <span className="text-cyber-cyan text-xs font-mono">[3]</span>
            </div>
            <div className="group relative p-3 bg-white/5 border-l-2 border-cyber-magenta hover:bg-white/10 cursor-grab active:cursor-grabbing transition-all flex gap-3 items-center clip-path-polygon">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white font-display uppercase tracking-wide">Q3 Strategy Review</h4>
                <p className="text-xs text-white/40 font-mono mt-1">90 MIN // DEEP_WORK</p>
              </div>
              <span className="material-symbols-outlined text-white/20 group-hover:text-cyber-magenta">drag_indicator</span>
            </div>
            <div className="group relative p-3 bg-white/5 border-l-2 border-cyber-cyan hover:bg-white/10 cursor-grab active:cursor-grabbing transition-all flex gap-3 items-center">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white font-display uppercase tracking-wide">Client Sync: Alpha</h4>
                <p className="text-xs text-white/40 font-mono mt-1">30 MIN // COMMS</p>
              </div>
              <span className="material-symbols-outlined text-white/20 group-hover:text-cyber-cyan">drag_indicator</span>
            </div>
            <div className="group relative p-3 bg-white/5 border-l-2 border-cyber-yellow hover:bg-white/10 cursor-grab active:cursor-grabbing transition-all flex gap-3 items-center">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white font-display uppercase tracking-wide">Gym Session</h4>
                <p className="text-xs text-white/40 font-mono mt-1">60 MIN // BIO_MAINTENANCE</p>
              </div>
              <span className="material-symbols-outlined text-white/20 group-hover:text-cyber-yellow">drag_indicator</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
