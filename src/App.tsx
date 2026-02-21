function App() {
  return (
    <>
      <main className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#08080a]">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Semantic Zoom Container */}
        <div className="absolute inset-0 transform -translate-x-[20%] transition-transform duration-700 ease-out">
          
          {/* Connection Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <path className="connector-line opacity-40" d="M380,450 C480,450 450,280 580,280" fill="none" stroke="#666"></path>
            <path className="drag-thread opacity-100" d="M1250,820 C1000,820 500,600 380,520" fill="none" stroke="#eab308" strokeLinecap="butt"></path>
            <rect className="animate-pulse" fill="#eab308" height="8" width="8" x="376" y="516"></rect>
          </svg>

          {/* Node: Obsidian Spire */}
          <div className="absolute top-[480px] left-[200px] w-64 bg-[#111] border-2 border-[#444] p-0 shadow-none">
            <div className="h-8 bg-[#222] border-b-2 border-[#444] flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">LOC-01</span>
              <div className="w-2 h-2 bg-red-500 rounded-none"></div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold text-lg leading-none mb-2 uppercase">Obsidian Spire</h3>
              <div className="h-20 w-full bg-[#000] border border-[#333] relative grayscale">
                <img 
                  alt="Dark gothic spire" 
                  className="w-full h-full object-cover opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAByVTR-yxgCClyixotMUZlPor2O-lqoFPHuXmgVjWa4bFIy_XOXtFuDFgEpSxw9jT2LbYlAUdQ6_jrnu2IC7WYOEozccyXXobBTeyyixE_B9_SnkRIGd1IXmMVOVLZhrGxZMDqisvQxGzBcYenfCND1earVxqjOC5rYdJ96dVnhzBlMHchYwLidtYINofq5wxl9RBCCETqyug6U5ioV2hLz-xhcfr1b-_6WXJvMU-9P5k20l5aAECVQpD1NoTgoSqzCsTve9ON1cA"
                />
              </div>
            </div>
          </div>

          {/* Node: Active Node (Whispering Woods) */}
          <div className="absolute top-[200px] left-[580px] w-72 bg-[#111] border-2 border-white shadow-[8px_8px_0px_rgba(0,0,0,1)] z-10">
            <div className="bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-wider border-b-2 border-white flex justify-between items-center">
              <span>Active Node</span>
              <span className="w-2 h-2 bg-black"></span>
            </div>
            <div className="h-32 w-full bg-[#000] border-b-2 border-white overflow-hidden relative">
              <img 
                alt="Mystical forest" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAByVTR-yxgCClyixotMUZlPor2O-lqoFPHuXmgVjWa4bFIy_XOXtFuDFgEpSxw9jT2LbYlAUdQ6_jrnu2IC7WYOEozccyXXobBTeyyixE_B9_SnkRIGd1IXmMVOVLZhrGxZMDqisvQxGzBcYenfCND1earVxqjOC5rYdJ96dVnhzBlMHchYwLidtYINofq5wxl9RBCCETqyug6U5ioV2hLz-xhcfr1b-_6WXJvMU-9P5k20l5aAECVQpD1NoTgoSqzCsTve9ON1cA"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="p-4 bg-[#111]">
              <h3 className="text-white font-black text-2xl mb-2 uppercase tracking-tight leading-none">Whispering<br/>Woods</h3>
              <p className="text-xs text-[#888] font-mono border-t border-[#333] pt-2 mt-2">ID: 8X-992 // SECTOR 4</p>
            </div>
          </div>

          {/* Node: Small Draft */}
          <div className="absolute top-[150px] left-[250px] w-40 border-2 border-[#333] bg-[#0a0a0a] p-2 opacity-50">
            <div className="h-2 w-full bg-[#222] mb-2"></div>
            <div className="h-12 w-full border border-[#222] bg-[#111]"></div>
          </div>

        </div>
      </main>

      {/* Sidebar (Codex) */}
      <aside className="absolute top-0 right-0 bottom-0 w-[600px] bg-[#111] z-50 flex flex-col border-l-2 border-[#333] shadow-none">
        
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b-2 border-[#333] bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wide">
            <span className="text-[#666]">ROOT</span>
            <span className="text-[#444]">/</span>
            <span className="text-[#888]">FRACTURED LANDS</span>
            <span className="text-[#444]">/</span>
            <span className="bg-white text-black px-1">WHISPERING WOODS</span>
          </div>
          <div className="flex gap-[-2px]"> 
            <button className="w-8 h-8 flex items-center justify-center border-2 border-[#333] bg-[#111] text-white hover:bg-white hover:text-black transition-colors -ml-[2px]">
              <span className="material-symbols-outlined text-lg">more_horiz</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center border-2 border-[#333] bg-[#111] text-white hover:bg-red-600 hover:text-white transition-colors -ml-[2px]">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </header>

        {/* Relational Matrix */}
        <div className="border-b-2 border-[#333] bg-[#16161a] p-6 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 inline-block"></span>
              Relational Matrix
            </h4>
            <button className="text-[10px] font-bold bg-transparent hover:bg-white hover:text-black text-white border border-[#444] px-3 py-1 uppercase transition-colors">
              Expand Graph
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between bg-[#0a0a0a] border border-[#333] p-3 group hover:border-white transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-base text-[#666]">water_drop</span>
                <span className="text-sm font-bold text-[#ccc]">Sunken Grotto</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#444] border border-[#333] px-1 bg-[#111] group-hover:bg-white group-hover:text-black">NEAR</span>
            </div>
            <div className="flex items-center justify-between bg-[#1a1a10] border border-yellow-500/50 p-3 relative overflow-hidden">
              <div className="flex items-center gap-3 z-10">
                <div className="w-2 h-2 bg-yellow-500 animate-pulse"></div>
                <span className="text-sm font-bold text-yellow-500 italic">Linking...</span>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-yellow-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-black font-bold">link</span>
              </div>
            </div>
            <button className="col-span-2 flex items-center justify-center py-2 border border-dashed border-[#444] text-[#444] hover:text-white hover:border-white transition-colors text-xs font-bold uppercase tracking-widest">
              + Add Connection
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar bg-[#0a0a0a]">
          <div className="h-48 w-full relative border-b-2 border-[#333]">
            <img 
              className="w-full h-full object-cover opacity-40 grayscale contrast-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAByVTR-yxgCClyixotMUZlPor2O-lqoFPHuXmgVjWa4bFIy_XOXtFuDFgEpSxw9jT2LbYlAUdQ6_jrnu2IC7WYOEozccyXXobBTeyyixE_B9_SnkRIGd1IXmMVOVLZhrGxZMDqisvQxGzBcYenfCND1earVxqjOC5rYdJ96dVnhzBlMHchYwLidtYINofq5wxl9RBCCETqyug6U5ioV2hLz-xhcfr1b-_6WXJvMU-9P5k20l5aAECVQpD1NoTgoSqzCsTve9ON1cA"
              alt="Whispering Woods Detail"
            />
            <div className="absolute inset-0 bg-[#0a0a0a] mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 bg-black text-white px-4 py-1 text-xs font-mono border-t border-r border-[#333]">IMG_REF_992</div>
            <button className="absolute top-4 right-4 bg-black border border-white text-white px-3 py-1 text-xs font-bold hover:bg-white hover:text-black transition-colors uppercase">
              Replace
            </button>
          </div>

          <div className="p-8 pb-32">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-16 h-16 bg-[#111] border-2 border-[#333] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl text-white">forest</span>
              </div>
              <div>
                <h1 className="font-black text-5xl text-white leading-[0.9] uppercase tracking-tighter mb-2">Whispering<br/>Woods</h1>
                <div className="text-[#666] font-mono text-xs">LAST EDITED: TODAY 14:02</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-px bg-[#333] border-2 border-[#333] mb-10">
              <div className="bg-[#111] p-3 hover:bg-[#161616] transition-colors">
                <span className="text-[9px] uppercase tracking-widest text-[#666] font-bold block mb-1">Type</span>
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <span className="material-symbols-outlined text-xs">terrain</span>
                  Territory
                </div>
              </div>
              <div className="bg-[#111] p-3 hover:bg-[#161616] transition-colors">
                <span className="text-[9px] uppercase tracking-widest text-[#666] font-bold block mb-1">Status</span>
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <span className="w-2 h-2 bg-green-500"></span>
                  Active
                </div>
              </div>
              <div className="bg-[#111] p-3 hover:bg-[#161616] transition-colors">
                <span className="text-[9px] uppercase tracking-widest text-[#666] font-bold block mb-1">Owner</span>
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <span className="text-indigo-400 font-black">GM</span>
                  System
                </div>
              </div>
            </div>

            <div className="tiptap-editor outline-none max-w-none">
              <p>The Whispering Woods is not merely a forest, but a sentient organism of vast proportions. Travelers report that the trees themselves seem to shift positions when not directly observed, creating a labyrinth that defies traditional cartography.</p>
              <blockquote>
                "The leaves don't rustle with the wind; they rustle with intent. Watch your periphery, for that is where the Unseen Fae dwell."
                <footer className="mt-2 text-sm text-[#666] not-italic font-mono uppercase">— Elder Kaelen's Journal, Entry 402</footer>
              </blockquote>
              <h2>Flora &amp; Fauna</h2>
              <p>Notable species include the <span className="bg-emerald-900/30 text-emerald-400 border-b border-emerald-500 font-medium px-1">Silver-Barked Oak</span> and the luminous <span className="bg-purple-900/30 text-purple-400 border-b border-purple-500 font-medium px-1">Ghost Ferns</span>, which glow faintly in the presence of latent magic.</p>
              <p>Recent scouting expeditions have uncovered ruins near the northern edge, suggesting a civilization pre-dating the Age of Dust.</p>
              <div className="my-8 border-l-4 border-yellow-600 bg-[#161610] p-4 flex gap-4">
                <span className="material-symbols-outlined text-yellow-600">lightbulb</span>
                <div className="text-sm text-[#ccc]">
                  <strong className="text-yellow-600 uppercase block text-xs tracking-wider mb-1">GM Note</strong>
                  Players with Perception &gt; 15 may notice the subtle hum of the leylines converging here.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0a0a0a] border-t-2 border-[#333] p-4 flex justify-between items-center shrink-0">
          <div className="text-[10px] font-mono text-[#444] uppercase">
            v3.0.2 // BRUTAL_MOD
          </div>
          <div className="flex gap-2">
            <button className="bg-[#111] border border-[#333] text-[#888] px-3 py-1.5 text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors">
              Discard
            </button>
            <button className="bg-white text-black border border-white px-3 py-1.5 text-xs font-bold uppercase hover:bg-[#ccc] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default App;
