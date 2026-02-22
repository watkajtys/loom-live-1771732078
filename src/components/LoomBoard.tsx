import { useStore, type Thread } from '../store';
import { useDroppable } from '@dnd-kit/core';
import { useMemo, useState, useEffect, useRef } from 'react';

// Helper to format time
const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}${m.toString().padStart(2, '0')}`;
};

interface ThreadWithLayout extends Thread {
  style: React.CSSProperties;
  layoutClass: string;
  colIndex: number;
  svgLeft: number;
  svgWidth: number;
}

// Layout algorithm for overlapping threads
const calculateThreadLayout = (threads: Thread[]): ThreadWithLayout[] => {
  if (threads.length === 0) return [];

  const sorted = [...threads].sort((a, b) => (a.startTime || 0) - (b.startTime || 0));

  const groups: ThreadWithLayout[][] = [];
  let currentGroup: ThreadWithLayout[] = [];
  let groupEndTime = -1;

  for (const thread of sorted) {
    if (currentGroup.length === 0) {
      currentGroup.push({ ...thread, style: {}, layoutClass: '', colIndex: 0 } as ThreadWithLayout);
      groupEndTime = thread.startTime! + thread.duration;
    } else {
       if (thread.startTime! < groupEndTime) {
         currentGroup.push({ ...thread, style: {}, layoutClass: '', colIndex: 0 } as ThreadWithLayout);
         groupEndTime = Math.max(groupEndTime, thread.startTime! + thread.duration);
       } else {
         groups.push(currentGroup);
         currentGroup = [{ ...thread, style: {}, layoutClass: '', colIndex: 0 } as ThreadWithLayout];
         groupEndTime = thread.startTime! + thread.duration;
       }
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup);

  const finalResult: ThreadWithLayout[] = [];

  for (const group of groups) {
    // Assign columns within group
    const groupColumns: ThreadWithLayout[][] = [];
    for (const thread of group) {
       let placed = false;
       for (let i = 0; i < groupColumns.length; i++) {
         const col = groupColumns[i];
         const last = col[col.length - 1];
         if ((last.startTime! + last.duration) <= thread.startTime!) {
           col.push(thread);
           thread.colIndex = i;
           placed = true;
           break;
         }
       }
       if (!placed) {
         groupColumns.push([thread]);
         thread.colIndex = groupColumns.length - 1;
       }
    }
    
    const numCols = groupColumns.length;
    for (const thread of group) {
      let style: React.CSSProperties = {
        top: `${thread.startTime}px`,
        height: `${thread.duration}px`,
        zIndex: thread.title === 'Frontend Impl.' ? 40 : (thread.colIndex > 0 ? 20 : 10),
      };
      let layoutClass = 'cyber-ribbon';
      let svgLeft = 0;
      let svgWidth = 100;

      if (numCols === 1) {
        style = { ...style, left: '1.5rem', right: '2.5rem' }; // Standard margins
        svgLeft = 0;
        svgWidth = 100;
      } else if (numCols === 2) {
        if (thread.colIndex === 0) {
          // Left column
          style = { ...style, left: '2rem', right: '50%', marginRight: '1rem' };
          layoutClass = 'cyber-ribbon-reverse';
          svgLeft = 0;
          svgWidth = 50;
        } else {
          // Right column
          style = { ...style, left: '50%', right: '1rem', marginLeft: '-1.25rem' };
          layoutClass = 'cyber-ribbon';
          svgLeft = 50;
          svgWidth = 50;
        }
      } else {
        // Fallback for > 2 columns (simple split)
        const width = 100 / numCols;
        const left = thread.colIndex * width;
        style = { ...style, left: `${left}%`, width: `${width}%` };
        svgLeft = left;
        svgWidth = width;
      }

      thread.style = style;
      thread.layoutClass = layoutClass;
      thread.svgLeft = svgLeft;
      thread.svgWidth = svgWidth;
      finalResult.push(thread);
    }
  }

  return finalResult;
};

interface Spark {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
}

function SparksContainer({ sparks }: { sparks: Spark[] }) {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {sparks.map((spark) => (
                <div 
                    key={spark.id} 
                    className="spark" 
                    style={{ 
                        left: spark.x, 
                        top: spark.y, 
                        backgroundColor: spark.color,
                        boxShadow: `0 0 12px ${spark.color}`,
                        '--tx': `${spark.tx}px`, 
                        '--ty': `${spark.ty}px` 
                    } as React.CSSProperties}
                ></div>
            ))}
        </div>
    );
}

function ScalpelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        if (ref.current) {
            ref.current.style.left = `${e.clientX}px`;
            ref.current.style.top = `${e.clientY}px`;
        }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
        ref={ref}
        className="fixed z-[9999] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" 
        style={{ left: -100, top: -100 }}
    >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyber-magenta/20 blur-xl rounded-full animate-pulse"></div>
        <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-12 drop-shadow-[0_0_8px_rgba(255,113,206,0.8)]"
        >
            <path d="M40 24L56 8" stroke="#00ffff" strokeWidth="4" strokeLinecap="round" />
            <path d="M52 28L44 20" stroke="#00ffff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="20" cy="44" r="8" stroke="#ff71ce" strokeWidth="4" />
            <circle cx="44" cy="44" r="8" stroke="#ff71ce" strokeWidth="4" />
            <path d="M26 38L48 16" stroke="#00ffff" strokeWidth="4" strokeLinecap="round" />
            <path d="M44 36L22 14" stroke="#00ffff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="32" cy="26" r="3" fill="#fff05a" className="animate-pulse" />
        </svg>
    </div>
  );
}


function BoardThread({ thread, isActive, isScalpelMode, onSplit }: { 
    thread: ThreadWithLayout; 
    isActive: boolean; 
    isScalpelMode: boolean;
    onSplit: (id: string, x: number, y: number) => void;
}) {
  const colors = {
    'cyber-cyan': { bg: 'bg-cyber-cyan/10', border: 'border-cyber-cyan', text: 'text-cyber-cyan', indicator: 'bg-cyber-cyan' },
    'cyber-magenta': { bg: 'bg-cyber-magenta/10', border: 'border-cyber-magenta', text: 'text-cyber-magenta', indicator: 'bg-cyber-magenta' },
    'cyber-yellow': { bg: 'bg-cyber-yellow/10', border: 'border-cyber-yellow', text: 'text-cyber-yellow', indicator: 'bg-cyber-yellow' },
  }[thread.category];

  const isFrontendImpl = thread.title === 'Frontend Impl.';
  const isProjectAlpha = thread.title.includes('Project Alpha'); // Or rely on ID/duration
  const displayActive = isActive || isFrontendImpl;

  // Calculate split line position
  const [splitLineTop, setSplitLineTop] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScalpelMode) {
        setSplitLineTop(null);
        return;
    }

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        const rect = timelineContainer.getBoundingClientRect();
        const absoluteMinutes = e.clientY - rect.top;
        const snappedMinutes = Math.round(absoluteMinutes / 15) * 15;
        
        // Check if snap is within this thread
        if (snappedMinutes > (thread.startTime || 0) && snappedMinutes < ((thread.startTime || 0) + thread.duration)) {
                setSplitLineTop(snappedMinutes - (thread.startTime || 0));
        } else {
            setSplitLineTop(null);
        }
    }
  };


  const patternStyle = thread.category === 'cyber-cyan' 
    ? { backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,255,255,1) 1px, transparent 0)", backgroundSize: "20px 20px", opacity: 0.1 }
    : thread.category === 'cyber-magenta'
      ? { backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmY3MWNlIiAvPgo8cGF0aCBkPSJNLTQgOEw4IC00IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=')", opacity: 0.2 }
      : { backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 8px)" };

  const meltClass = thread.isCutTop && thread.isCutBottom 
    ? 'melt-both' 
    : thread.isCutTop 
      ? 'melt-top' 
      : thread.isCutBottom 
        ? 'melt-bottom' 
        : '';

  return (
    <div
      style={thread.style}
      className={`absolute px-1 group cursor-pointer hover:z-50 transition-all origin-left ${thread.layoutClass} ${isProjectAlpha ? 'hover:bg-cyber-magenta/20' : ''} ${meltClass}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setSplitLineTop(null); }}
      onClick={(e) => {
          if (isScalpelMode) {
              e.stopPropagation();
              e.preventDefault();
              onSplit(thread.id, e.clientX, e.clientY);
          }
      }}
    >
        <div className={`relative w-full h-full overflow-hidden backdrop-blur-sm transition-all group-hover:bg-opacity-30 ${isFrontendImpl ? 'bg-gradient-to-r from-cyber-cyan/20 to-blue-900/40' : colors.bg}`}>
            {/* Border Left/Right handled by ribbon classes or internal border */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.indicator}`}></div>
            
            {/* Split Line Indicator */}
            {isScalpelMode && splitLineTop !== null && (
                <div 
                    className="absolute w-full h-1 border-t-2 border-dashed border-cyber-magenta z-[60] pointer-events-none flex items-center justify-end pr-2 shadow-[0_0_10px_#ff71ce,0_0_5px_#ff71ce]"
                    style={{ top: `${splitLineTop}px` }}
                >
                    <span className="text-[10px] font-mono font-bold bg-cyber-magenta text-deep-void px-2 py-0.5 rounded-sm transform -translate-y-1/2 shadow-sm">
                        SPLIT
                    </span>
                </div>
            )}
            
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none" style={patternStyle}></div>

            <div className={`relative p-2 h-full flex flex-col ${isProjectAlpha || isFrontendImpl ? 'pl-8' : 'pl-4'}`}>
                <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider font-display drop-shadow-md truncate leading-tight">{thread.title}</h3>
                        {!isFrontendImpl && <p className={`${colors.text} text-[9px] mt-0.5 font-mono tracking-tight truncate opacity-80`}>{thread.description || 'ACTIVE_THREAD'}</p>}
                        {isFrontendImpl && <p className="text-cyan-200/60 text-[9px] mt-0.5 font-mono tracking-tight truncate opacity-80">{thread.description}</p>}
                    </div>
                    {displayActive && (
                        <span className={`flex-shrink-0 ml-1 px-1.5 py-0.5 ${isFrontendImpl ? 'text-cyber-cyan border border-cyber-cyan bg-transparent' : 'bg-cyber-magenta text-black'} text-[9px] font-bold font-mono animate-pulse rounded-sm`}>
                            RUNNING
                        </span>
                    )}
                </div>

                {isFrontendImpl ? (
                    <>
                        <div className="w-full bg-black/50 h-1 mt-auto mb-2 relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[65%] bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>
                        </div>
                        <div className="flex items-center gap-3">
                             <div className="flex -space-x-2">
                                <div className="size-4 border border-cyber-cyan bg-slate-800 bg-center bg-cover grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYcrXwUFdeiewT9s5Kvnqqd6alj_zNs-eg8kBL98eTl7fJDgbZFU5c3rmS5McE-vsiq_hWWNv1fYgKlYE2oRLzFJI4-5H1WNJAho_LZt26G_11KIYzMKsc82Svc1Vb9LfKJczyqp1A71czgwlZ_1g4L_mXe_nHiuYCULcq9bkuLS3E85_EfsjPDZ2er7rwfAvD3ryLGZjfBnVkpwe5KHmzjN8MZI37kZg2LJBj6pcKvv7EJFFjpl3RbOhfcASeuL3-YyJdhkUGim8')", transform: "skewX(-15deg)" }}></div>
                                <div className="size-4 border border-cyber-cyan bg-slate-800 bg-center bg-cover grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrPe6pUPkfZYi2EAsikd2c3ghaxamxnjRnCIi9lLNQ3sffHMz7Po4kK185EPr8E-RmRF4KsNBmhdN97C_XtcB60ivAvtBrRmAJHScEKKu34ml-A9A-93bvbBygKOdAmchMcqkBDx0kXikv10tS69vk18Owl8c-6lKktU8AT2LxufdNtlXs3CWnisr9jATJoam42f5KEO7SXlsT6UuvkyRrDMAYIRJUUcM-zvMovt1RuykJtkSz72aPpTgEwyJV0t_zW7GT2YwNdfs')", transform: "skewX(-15deg)" }}></div>
                            </div>
                            <div className="text-[8px] text-cyber-cyan font-mono">STATUS: COMPILING...</div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-between mt-auto pt-2">
                         {/* Only show time range for Project Alpha or long tasks */}
                         {isProjectAlpha ? (
                            <span className="bg-black/60 text-cyber-magenta text-[9px] px-2 py-0.5 border border-cyber-magenta/30 font-mono">
                                {formatTime(thread.startTime!)} - {formatTime(thread.startTime! + thread.duration)}
                            </span>
                         ) : (
                            <span></span>
                         )}
                        
                        {/* Avatar */}
                        {isProjectAlpha ? (
                             <div className="flex -space-x-3">
                                <div 
                                    className="size-8 border-2 border-black bg-slate-700 bg-center bg-cover grayscale group-hover:grayscale-0 transition-all" 
                                    style={{ 
                                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHkkUmEf5zaPERwUWT8VHLpf9k0Q5xGOxYLvQrqcWiWEQ7QqdIrugSUrhvAF0GQHujf-P26M91ZuSoNPKMX0uadGHNywX6cWZuqgav1jmO7Wvp9Pm82_vUk-5z8djgN3QITCNJOIT91CCjADPAxwxCqmRMulsoTdfNt-C-kTBXxkwSoF0jrmVzj0V7y4qft9P63ihcuJfwLJYy2sTnUu4xmPU7ihVls-qdnKoEZ0kPV9TC8Eq4SUlK71CuweR3fIZcR_spRY28rD4')",
                                        clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)"
                                    }}
                                ></div>
                            </div>
                        ) : (
                            // Use hidden or different avatar for others if needed, but for now only Project Alpha has explicit design
                            <div className="size-6 rounded-full border border-white/20 overflow-hidden bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <img 
                                    src={`https://i.pravatar.cc/150?u=${thread.id}`} 
                                    alt="U" 
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default function LoomBoard() {
  const threads = useStore((state) => state.threads);
  const splitThread = useStore((state) => state.splitThread);
  const activeThreads = threads.filter((t) => t.startTime !== null);
  const { setNodeRef } = useDroppable({
    id: 'loom-board',
  });

  const [isScalpelMode, setIsScalpelMode] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleSplit = (threadId: string, clientX: number, clientY: number) => {
    if (!isScalpelMode) return;

    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;

    const rect = timelineContainer.getBoundingClientRect();
    const relativeY = clientY - rect.top; // Relative to timeline container top (which is 00:00 visual start)
    // Note: timeline-container is the relative parent for absolute positioning of threads.
    
    const snappedTime = Math.round(relativeY / 15) * 15;
    
    // Add sparks
    const id = Date.now();
    const colors = ['#00ffff', '#ff71ce', '#fff05a', '#ffffff'];
    const newSparks = Array.from({ length: 12 }).map((_, i) => ({
        id: id + i,
        x: clientX,
        y: clientY,
        tx: (Math.random() - 0.5) * 150,
        ty: (Math.random() - 0.5) * 150,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id < id || s.id >= id + 12));
    }, 800);

    splitThread(threadId, snappedTime);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsScalpelMode(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsScalpelMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Calculate layout
  const layoutThreads = useMemo(() => calculateThreadLayout(activeThreads), [activeThreads]);

  // Current time simulation (approx 10:15 AM = 615 mins)
  const currentTime = 615;

  const generateMarkers = () => {
    const markers = [];
    for (let i = 0; i < 24; i++) {
      const isCurrentHour = Math.floor(currentTime / 60) === i;
      markers.push(
        <div key={i} className={`absolute w-full text-right pr-4 text-xs font-mono ${isCurrentHour ? 'text-cyber-cyan font-bold' : (i >= 8 && i <= 17 ? 'text-white/40' : 'text-white/10')}`} style={{ top: `${i * 60}px` }}>
          {i.toString().padStart(2, '0')}00
        </div>
      );
    }
    return markers;
  };

  return (
    <main 
        className={`flex-1 flex flex-col h-full bg-deep-void relative overflow-hidden ${isScalpelMode ? 'cursor-scalpel' : ''}`}
    >
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
          </div>
        </header>
        <div className="flex-1 overflow-y-auto cyber-scrollbar relative">
          {isScalpelMode && <ScalpelCursor />}
          <SparksContainer sparks={sparks} />
          <div className="flex min-h-[1440px] relative pb-20">
            <div className="w-20 flex-shrink-0 border-r border-white/10 bg-panel-bg z-10">
              <div className="relative h-full pt-2">
                {generateMarkers()}
              </div>
            </div>
            <div ref={setNodeRef} id="timeline-container" className="flex-1 relative pr-12">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "100% 60px" }}></div>
              
              {/* NOW Indicator (Hardcoded for visual at 10:15 AM) */}
              <div className="absolute top-[615px] left-0 w-full flex items-center z-40 pointer-events-none">
                <div className="absolute -left-1.5 size-3 bg-cyber-magenta shadow-[0_0_10px_#ff71ce] rotate-45"></div>
                <div className="h-[1px] w-full bg-cyber-magenta shadow-[0_0_8px_#ff71ce]"></div>
                <div className="absolute right-0 bg-cyber-magenta text-black text-[10px] font-bold px-1 font-mono">NOW</div>
              </div>

              {layoutThreads.map(thread => {
                  const isActive = currentTime >= thread.startTime! && currentTime < (thread.startTime! + thread.duration);
                  return (
                    <BoardThread 
                        key={thread.id} 
                        thread={thread} 
                        isActive={isActive} 
                        isScalpelMode={isScalpelMode}
                        onSplit={handleSplit}
                    />
                  );
              })}
              
            </div>
          </div>
        </div>
      </main>
  );
}
