import { useStore, type Thread } from '../store';
import { useDroppable } from '@dnd-kit/core';

// Helper to format time
const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}${m.toString().padStart(2, '0')}`;
};

function BoardThread({ thread }: { thread: Thread }) {
  // Styles based on category
   const colors = {
    'cyber-cyan': { bg: 'bg-cyber-cyan/10', border: 'border-cyber-cyan', text: 'text-cyber-cyan' },
    'cyber-magenta': { bg: 'bg-cyber-magenta/10', border: 'border-cyber-magenta', text: 'text-cyber-magenta' },
    'cyber-yellow': { bg: 'bg-cyber-yellow/10', border: 'border-cyber-yellow', text: 'text-cyber-yellow' },
  }[thread.category];

  return (
    <div
      style={{
        top: `${thread.startTime}px`,
        height: `${thread.duration}px`,
      }}
      className="absolute left-4 right-12 group cursor-pointer hover:z-30 transition-all cyber-ribbon"
    >
        <div className={`absolute inset-0 ${colors.bg} border-l-4 ${colors.border} backdrop-blur-sm transition-all group-hover:bg-opacity-30`}></div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)", backgroundSize: "4px 4px"}}></div>

        <div className="relative p-2 h-full flex flex-col justify-between pl-4 overflow-hidden">
            <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider font-display drop-shadow-md truncate">{thread.title}</h3>
                <p className={`${colors.text} text-[10px] mt-0.5 font-mono tracking-tight truncate`}>{thread.description || 'ACTIVE_THREAD'}</p>
            </div>
             <div className="flex items-center justify-between mt-auto">
                <span className="bg-black/60 text-white/50 text-[10px] px-1 font-mono">
                    {formatTime(thread.startTime!)} - {formatTime(thread.startTime! + thread.duration)}
                </span>
            </div>
        </div>
    </div>
  );
}

export default function LoomBoard() {
  const threads = useStore((state) => state.threads);
  const activeThreads = threads.filter((t) => t.startTime !== null);
  const { setNodeRef } = useDroppable({
    id: 'loom-board',
  });

  const generateMarkers = () => {
    const markers = [];
    for (let i = 0; i < 24; i++) {
      markers.push(
        <div key={i} className={`absolute w-full text-right pr-4 text-xs font-mono ${i >= 8 && i <= 17 ? 'text-white/40' : 'text-white/10'}`} style={{ top: `${i * 60}px` }}>
          {i.toString().padStart(2, '0')}00
        </div>
      );
    }
    return markers;
  };

    const handleSeverThreads = () => {
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1440" viewBox="0 0 800 1440" style="background-color: #05050a; font-family: monospace;">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.1)" stroke-width="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                ${activeThreads.map(t => {
                    const color = t.category === 'cyber-cyan' ? '#00f0ff' : t.category === 'cyber-magenta' ? '#ff0055' : '#fcee0a';
                    return `
                        <g transform="translate(100, ${t.startTime})">
                            <rect width="600" height="${t.duration}" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="2" />
                            <text x="10" y="20" fill="white" font-size="14" font-weight="bold">${t.title}</text>
                            <text x="10" y="40" fill="${color}" font-size="10">${formatTime(t.startTime!)} - ${formatTime(t.startTime! + t.duration)}</text>
                        </g>
                    `;
                }).join('')}
            </svg>
        `;
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `loominal-export-${new Date().toISOString().split('T')[0]}.svg`;
        a.click();
        URL.revokeObjectURL(url);
    };

  return (
    <main className="flex-1 flex flex-col h-full bg-deep-void relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-void via-transparent to-deep-void pointer-events-none"></div>
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-deep-void/90 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-6">
            <div className="flex gap-1">
              <button className="size-8 flex items-center justify-center border border-white/10 text-white/60 hover:text-cyber-cyan hover:border-cyber-cyan transition-all">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="size-8 flex items-center justify-center border border-white/10 text-white/60 hover:text-cyber-cyan hover:border-cyber-cyan transition-all">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest font-display">Cycle: Today</h2>
              <p className="text-[10px] text-cyber-cyan font-mono">TUE 24 OCT // 14:35:22</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/50 border border-white/10 skew-x-[-12deg]">
              <span className="material-symbols-outlined text-white/40 text-sm skew-x-[12deg]">search</span>
              <input className="bg-transparent border-none text-sm text-white placeholder:text-white/30 focus:ring-0 w-48 p-0 font-mono skew-x-[12deg]" placeholder="SCAN_THREADS..." type="text" />
            </div>
            <button 
                onClick={handleSeverThreads}
                className="relative px-6 py-2 bg-transparent text-cyber-yellow text-sm font-bold font-mono tracking-widest uppercase border border-cyber-yellow/30 hover:bg-cyber-yellow/10 hover:border-cyber-yellow hover:shadow-[0_0_15px_rgba(252,238,10,0.4)] transition-all group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">content_cut</span>
                Sever Threads
              </span>
              <div className="absolute inset-0 bg-cyber-yellow/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto cyber-scrollbar relative">
          <div className="flex min-h-[1440px] relative pb-20">
            <div className="w-20 flex-shrink-0 border-r border-white/10 bg-panel-bg z-10">
              <div className="relative h-full pt-2">
                {generateMarkers()}
              </div>
            </div>
            <div ref={setNodeRef} id="timeline-container" className="flex-1 relative">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "100% 60px" }}></div>
              
              {/* NOW Indicator (Hardcoded for visual, could be dynamic) */}
              <div className="absolute top-[615px] left-0 w-full flex items-center z-40 pointer-events-none">
                <div className="absolute -left-1.5 size-3 bg-cyber-magenta shadow-[0_0_10px_#ff0055] rotate-45"></div>
                <div className="h-[1px] w-full bg-cyber-magenta shadow-[0_0_8px_#ff0055]"></div>
                <div className="absolute right-0 bg-cyber-magenta text-black text-[10px] font-bold px-1 font-mono">NOW</div>
              </div>

              {activeThreads.map(thread => (
                  <BoardThread key={thread.id} thread={thread} />
              ))}
              
            </div>
          </div>
        </div>
      </main>
  );
}
