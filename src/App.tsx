import './index.css';

function App() {
  return (
    <div className="bg-black text-slate-100 font-display overflow-hidden h-screen w-full relative">
      {/* Background Layer: The Void */}
      <div className="absolute inset-0 w-full h-full z-0 bg-cosmic-gradient overflow-hidden">
        {/* Stars/Particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-3/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-primary rounded-full opacity-50 blur-[1px]"></div>
        <div className="absolute top-10 left-10 w-0.5 h-0.5 bg-white rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
        {/* Perspective Grid Floor */}
        <div className="absolute -bottom-[20%] -left-[25%] w-[150%] h-[80%] perspective-grid pointer-events-none"></div>
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Header / Status Bar Area */}
        <div className="flex items-start justify-between p-4 pt-12 pointer-events-auto bg-gradient-to-b from-background-dark/80 to-transparent">
          {/* Mini-Map / Radar */}
          <div className="flex flex-col gap-1">
            <div className="relative w-24 h-24 rounded-full border border-primary/20 bg-surface-dark/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
              {/* Radar Sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full animate-spin [animation-duration:4s]"></div>
              {/* Map Dots */}
              <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(19,200,236,0.8)]"></div>
              {/* Center user dot */}
              <div className="w-1.5 h-1.5 bg-white rounded-full z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              {/* Grid lines */}
              <div className="absolute inset-0 border-[0.5px] border-primary/10 rounded-full scale-50"></div>
              <div className="absolute inset-0 border-[0.5px] border-primary/10 rounded-full scale-75"></div>
              <span className="absolute bottom-1 text-[8px] text-primary/60 tracking-widest font-mono">X:42 Y:19</span>
            </div>
          </div>
          {/* Collaborators */}
          <div className="flex items-center -space-x-3">
            <div className="relative group cursor-pointer transition-transform hover:scale-110 z-30">
              <div
                className="w-10 h-10 rounded-full border-2 border-surface-dark bg-surface-dark bg-cover bg-center"
                data-alt="Avatar of collaborator 1"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZwW6sRqpqH0_oJu_DZvUXFN8DYSSu2eawINypukU1usoPRrXYIUL2jgyc8NOc2neGJald6NqJF0VD0yOlrnrikJ-818C_MsAX5s2LrWRvnJoedfkfh5y4alZ29xcYC3vE7iuMkcuqtJuh13BktaH24JfkgmgL48kQ-ptpC8sBSliUGfyQ0KocWYtBfhL-mVWRHJQ70q2CnJptn_I3woEq6XTN8Gk4gpsnz14rK-O2yFs_rA3hAx7RhnmPZr9Z1N8RW68Y8TRPU5yS')" }}
              ></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface-dark rounded-full"></div>
            </div>
            <div className="relative group cursor-pointer transition-transform hover:scale-110 z-20">
              <div
                className="w-10 h-10 rounded-full border-2 border-surface-dark bg-surface-dark bg-cover bg-center"
                data-alt="Avatar of collaborator 2"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBH-foGAzcHuhb76Bt6fzty6uuC8PXZBzjN1TqJTyTgwzcoXMDB6P5h_K2q2Ndo8p4V_8y_qooh4D5SAEmzuJPIpD18Jid8Jq_dxzUo3AEK47wQ1UTBfmbZXrWvo1_3-iEfVEy8BatSqLw0gbI7_9nofetnSU_kX6RY0HDQYZglPLpIAep0as3HcFDkopBOfnibh0dn_bM8sFDqzeRfxU81P9az7k-DXum87pcR2TiCNziTFh7jVgl-7B6PybsqE1Aj1bnkBagpTb1S')" }}
              ></div>
            </div>
            <div className="relative group cursor-pointer transition-transform hover:scale-110 z-10">
              <div className="w-10 h-10 rounded-full border-2 border-surface-dark bg-surface-dark bg-cover bg-center flex items-center justify-center text-xs font-bold text-slate-300">
                +2
              </div>
            </div>
          </div>
        </div>
        {/* Central Viewport Area (Simulated 3D Content) */}
        <div className="flex-1 relative w-full h-full pointer-events-auto" id="canvas-area">
          {/* Connection Lines (Simulated SVG Overlay) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Line 1 */}
            <line stroke="#13c8ec" strokeDasharray="4 2" strokeOpacity="0.3" strokeWidth="1" x1="50%" x2="20%" y1="45%" y2="30%"></line>
            {/* Line 2 */}
            <line stroke="#13c8ec" strokeOpacity="0.3" strokeWidth="1" x1="50%" x2="80%" y1="45%" y2="35%"></line>
            {/* Line 3 */}
            <line stroke="#13c8ec" strokeOpacity="0.6" strokeWidth="2" x1="50%" x2="60%" y1="45%" y2="65%"></line>
          </svg>
          {/* Node 1: Main Focus (Center) */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10 animate-float cursor-pointer group">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#1e293b] to-black border border-primary shadow-[0_0_30px_rgba(19,200,236,0.2)] flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              {/* Inner holographic ring */}
              <div className="absolute inset-2 rounded-full border border-primary/30 border-dashed animate-spin [animation-duration:10s]"></div>
              <span className="material-symbols-outlined text-primary text-4xl group-hover:text-white transition-colors">hub</span>
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-black">3</div>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <h3 className="text-white text-sm font-bold tracking-wide">PROJECT_ALPHA</h3>
            </div>
          </div>
          {/* Node 2: Background Left */}
          <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-0 scale-75 opacity-70 cursor-pointer hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-surface-dark border border-slate-600 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">folder_open</span>
            </div>
            <span className="text-slate-400 text-xs font-mono">ASSETS</span>
          </div>
          {/* Node 3: Background Right */}
          <div className="absolute top-[35%] right-[20%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-0 scale-75 opacity-70 cursor-pointer hover:opacity-100 transition-opacity animate-float-delayed">
            <div className="w-16 h-16 rounded-full bg-surface-dark border border-slate-600 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">description</span>
            </div>
            <span className="text-slate-400 text-xs font-mono">DOCS_V2</span>
          </div>
          {/* Node 4: Foreground (Portal) */}
          <div className="absolute top-[65%] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer group">
            <div className="relative w-14 h-14 rounded-full bg-indigo-900/40 border border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.4)] flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse"></div>
              <span className="material-symbols-outlined text-indigo-300">public</span>
            </div>
            <span className="text-indigo-300 text-xs font-bold tracking-widest uppercase">External Link</span>
          </div>
        </div>
        {/* Selected Node Details (Context) */}
        <div className="absolute bottom-32 left-4 right-4 pointer-events-auto z-40">
          <div className="bg-surface-dark/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">Project Alpha Core</h4>
                <p className="text-slate-400 text-xs">Last edited by Sarah • 2m ago</p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
              <span className="material-symbols-outlined text-sm">more_vert</span>
            </button>
          </div>
        </div>
        {/* Bottom Controls / Floating Dock */}
        <div className="flex justify-center pb-8 pt-4 px-6 pointer-events-auto bg-gradient-to-t from-background-dark to-transparent z-50">
          <div className="flex items-center gap-2 bg-surface-dark/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <button className="flex flex-col items-center justify-center w-16 h-14 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
              <span className="material-symbols-outlined text-2xl mb-1 group-hover:scale-110 transition-transform">pan_tool</span>
              <span className="text-[9px] font-medium tracking-wide uppercase">Pan</span>
            </button>
            <div className="w-px h-8 bg-white/10 mx-1"></div>
            <button className="flex flex-col items-center justify-center w-16 h-14 rounded-xl hover:bg-white/5 text-primary hover:text-primary transition-all relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="material-symbols-outlined text-2xl mb-1 group-hover:scale-110 transition-transform">add_circle</span>
              <span className="text-[9px] font-medium tracking-wide uppercase">Sphere</span>
            </button>
            <button className="flex flex-col items-center justify-center w-16 h-14 rounded-xl hover:bg-white/5 text-slate-400 hover:text-indigo-300 transition-all group">
              <span className="material-symbols-outlined text-2xl mb-1 group-hover:scale-110 transition-transform">all_inclusive</span>
              <span className="text-[9px] font-medium tracking-wide uppercase">Portal</span>
            </button>
            <div className="w-px h-8 bg-white/10 mx-1"></div>
            <button className="flex flex-col items-center justify-center w-16 h-14 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
              <span className="material-symbols-outlined text-2xl mb-1 group-hover:scale-110 transition-transform">visibility</span>
              <span className="text-[9px] font-medium tracking-wide uppercase">Inspect</span>
            </button>
          </div>
        </div>
      </div>
      {/* Background texture overlay for grit */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-50"
        style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPgo8cmVjdCB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPScjZmZmJy8+CjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMwMDAnLz4KPC9zdmc+')" }}
      ></div>
    </div>
  )
}

export default App
