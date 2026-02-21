import { useState, MouseEvent } from 'react';
import './index.css';

function App() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark h-screen w-full overflow-hidden relative font-display text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      {/* Infinite Canvas Container */}
      <div 
        className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[30%] bg-grid-pattern origin-center cursor-grab active:cursor-grabbing"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* SVG Layer for Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Curve from Image to Text */}
          <path d="M 50 45 C 55 45, 60 50, 65 55" fill="none" stroke="#135bec" strokeOpacity="0.4" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
          {/* Curve from Text to Video */}
          <path d="M 65 58 C 65 65, 55 70, 50 75" fill="none" stroke="#135bec" strokeOpacity="0.4" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
          {/* Curve from Image to PDF */}
          <path d="M 48 45 C 40 45, 35 50, 30 60" fill="none" stroke="#135bec" strokeOpacity="0.4" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
        </svg>

        {/* Node 1: Image Card (Center-ish Top) */}
        <div className="absolute left-[45%] top-[40%] w-72 bg-[#192233] rounded-xl shadow-lg border border-slate-700/50 p-3 z-10 hover:border-primary/50 transition-colors group">
          <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-3 relative overflow-hidden" data-alt="Team brainstorming session on a whiteboard" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIWGZTeP8L2a2CinGR6wY8BIxzM-SSfav4Rzem8OQLrrysDGj_rT2Xx7IvHBUFsPdWmN34cpiRpPC3fmzgu6L66bknBVEMx3VWW8vjOeAX_hyFJxMW_U1-qlqtqs5ZuevZxUWn2JxTah50THIo_IVA-P7d-K5konp8oB_bV7tgXR0tMknAzxTxA43Msvslu7VJ9sp2ul12uTwaHNZo8mfsZBAzcl6ER6EvXTWHoidqXzgRfco9eky_3Wo_F8i5x9dcVsRU_hX8V44')" }}>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-white">Whiteboard Session</h3>
              <p className="text-xs text-slate-400">Captured 2h ago</p>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg">more_horiz</span>
            </button>
          </div>
        </div>

        {/* Node 2: Text Snippet (Right Side) */}
        <div className="absolute left-[65%] top-[55%] w-64 bg-[#192233] rounded-xl shadow-lg border border-slate-700/50 p-4 z-10 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-yellow-400">
            <span className="material-symbols-outlined text-base">sticky_note_2</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Note</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">
            Remember to check the API docs for the new endpoint regarding user authentication flows.
          </p>
          <div className="mt-3 flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-slate-600 border border-[#192233]" title="User A"></div>
            <div className="w-6 h-6 rounded-full bg-primary border border-[#192233] flex items-center justify-center text-[10px] text-white" title="User B">JP</div>
          </div>
        </div>

        {/* Node 3: Video Node (Bottom Center) */}
        <div className="absolute left-[45%] top-[72%] w-80 bg-[#192233] rounded-xl shadow-lg border border-slate-700/50 overflow-hidden z-10 hover:border-primary/50 transition-colors group">
          <div className="relative h-40 bg-cover bg-center" data-alt="User interview video recording thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9qD5piMG4PhpYIIOgSmoMNOiBwVI1UkREDz67f_uj_5254SXqbPCRkjZ5-u95KYRLnDCxwOHjK4JY4kTTfB96dqbIUnZi1nOHvoLJvm0mqZVBVcMa8wRNWL2zb-y5oZsU-6If21vmKqqTVxwjhNq6I4K0IOdeYilzMl1es0YxX-d4wLL4xf5h-EDxz4BTSf88p72dedN-SMcSSIGQ9br00SGn3GnwNv32zyHkSlr3_EWelTfNyYN2OlvZ6gt-Dr2klAIm5g3zKO4')" }}>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm shadow-xl transform group-hover:scale-110 transition-transform cursor-pointer">
                <span className="material-symbols-outlined filled">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-medium text-white">04:32</div>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-bold text-white mb-1">User Interview #4</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="material-symbols-outlined text-sm">videocam</span>
              <span>Zoom Recording</span>
            </div>
          </div>
        </div>

        {/* Node 4: PDF File (Left Side) */}
        <div className="absolute left-[25%] top-[58%] w-56 bg-[#192233] rounded-xl shadow-lg border border-slate-700/50 p-3 flex items-center gap-3 z-10 hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">picture_as_pdf</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white truncate">Competitor Analysis.pdf</h3>
            <p className="text-xs text-slate-400">2.4 MB</p>
          </div>
        </div>
      </div>

      {/* UI Overlay Layer (Fixed) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-50">
        {/* Top Left: Header / HUD */}
        <div className="pointer-events-auto self-start">
          <div className="flex items-center gap-3 bg-[#192233]/80 backdrop-blur-md border border-white/10 p-2 pr-4 rounded-xl shadow-lg">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-white transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-white leading-tight">Project Alpha</h1>
              <span className="text-[10px] text-slate-400 font-medium">Mind Map • Last edited just now</span>
            </div>
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-300 transition-colors">
              <span className="material-symbols-outlined text-lg">search</span>
            </button>
          </div>
        </div>

        {/* Right Side: Zoom Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto flex flex-col gap-2">
          <div className="flex flex-col bg-[#192233]/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden">
            <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors border-b border-white/5">
              <span className="material-symbols-outlined text-xl">add</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-xl">remove</span>
            </button>
          </div>
          <button className="w-10 h-10 bg-[#192233]/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-xl">center_focus_strong</span>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="pointer-events-auto w-full flex items-end justify-center relative pb-2">
          {/* Bottom Gradient for FAB contrast */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent pointer-events-none -z-10"></div>
          
          {/* FAB: Add Node */}
          <button className="w-16 h-16 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(19,91,236,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group z-20 cursor-pointer">
            <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
          </button>

          {/* Mini Map (Bottom Right) */}
          <div className="absolute right-0 bottom-0 pointer-events-auto">
            <div className="w-24 h-36 bg-[#192233]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl relative overflow-hidden group hover:border-white/20 transition-colors">
              {/* Mini Map Grid */}
              <div className="absolute inset-0 opacity-20 bg-grid-pattern" style={{ backgroundSize: "10px 10px" }}></div>
              {/* Mini Nodes (Simplified representation) */}
              <div className="absolute left-[45%] top-[40%] w-4 h-3 bg-slate-500 rounded-[1px]"></div>
              <div className="absolute left-[65%] top-[55%] w-3 h-3 bg-yellow-500/50 rounded-[1px]"></div>
              <div className="absolute left-[45%] top-[72%] w-4 h-4 bg-primary/50 rounded-[1px]"></div>
              <div className="absolute left-[25%] top-[58%] w-3 h-2 bg-red-500/50 rounded-[1px]"></div>
              {/* Viewport Indicator */}
              <div className="absolute left-[40%] top-[35%] w-1/3 h-1/3 border-2 border-primary rounded-sm bg-primary/10 shadow-[0_0_10px_rgba(19,91,236,0.3)] cursor-move"></div>
            </div>
          </div>

          {/* Zoom Level Badge (Bottom Left) */}
          <div className="absolute left-0 bottom-0 pointer-events-auto">
            <div className="bg-[#192233]/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md text-[10px] font-mono text-slate-400">
              100%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
