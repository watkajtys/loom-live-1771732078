export default function LoomBoard() {
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
            <button className="relative px-6 py-2 bg-transparent text-cyber-yellow text-sm font-bold font-mono tracking-widest uppercase border border-cyber-yellow/30 hover:bg-cyber-yellow/10 hover:border-cyber-yellow hover:shadow-[0_0_15px_rgba(252,238,10,0.4)] transition-all group overflow-hidden">
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
              <div className="relative h-full text-xs font-mono text-white/40 text-right pr-4 pt-2">
                <div className="absolute top-[480px]">0800</div>
                <div className="absolute top-[540px]">0900</div>
                <div className="absolute top-[600px] text-cyber-cyan font-bold">1000</div>
                <div className="absolute top-[660px]">1100</div>
                <div className="absolute top-[720px]">1200</div>
                <div className="absolute top-[780px]">1300</div>
                <div className="absolute top-[840px]">1400</div>
                <div className="absolute top-[900px]">1500</div>
                <div className="absolute top-[960px]">1600</div>
                <div className="absolute top-[1020px]">1700</div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "100% 60px" }}></div>
              <div className="absolute top-[615px] left-0 w-full flex items-center z-40 pointer-events-none">
                <div className="absolute -left-1.5 size-3 bg-cyber-magenta shadow-[0_0_10px_#ff0055] rotate-45"></div>
                <div className="h-[1px] w-full bg-cyber-magenta shadow-[0_0_8px_#ff0055]"></div>
                <div className="absolute right-0 bg-cyber-magenta text-black text-[10px] font-bold px-1 font-mono">NOW</div>
              </div>
              <div className="absolute top-[540px] left-4 right-12 h-[120px] group cursor-pointer hover:z-30 transition-all cyber-ribbon">
                <div className="absolute inset-0 bg-cyber-magenta/10 border-l-4 border-cyber-magenta backdrop-blur-sm transition-all group-hover:bg-cyber-magenta/20"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmYwMDU1IiAvPgo8cGF0aCBkPSJNLTQgOEw4IC00IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=')]"></div>
                <div className="relative p-4 h-full flex flex-col justify-between pl-8">
                  <div>
                    <h3 className="text-white font-bold text-xl uppercase tracking-wider font-display drop-shadow-md">Project Alpha: Deep Work</h3>
                    <p className="text-cyber-magenta text-sm mt-1 font-mono tracking-tight">&lt;MODE: FOCUS_LOCK /&gt;</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-black/60 text-cyber-magenta text-xs px-2 py-0.5 border border-cyber-magenta/30 font-mono">0900 - 1100</span>
                    <div className="flex -space-x-3">
                      <div className="size-8 border-2 border-black bg-slate-700 bg-center bg-cover grayscale group-hover:grayscale-0 transition-all" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHkkUmEf5zaPERwUWT8VHLpf9k0Q5xGOxYLvQrqcWiWEQ7QqdIrugSUrhvAF0GQHujf-P26M91ZuSoNPKMX0uadGHNywX6cWZuqgav1jmO7Wvp9Pm82_vUk-5z8djgN3QITCNJOIT91CCjADPAxwxCqmRMulsoTdfNt-C-kTBXxkwSoF0jrmVzj0V7y4qft9P63ihcuJfwLJYy2sTnUu4xmPU7ihVls-qdnKoEZ0kPV9TC8Eq4SUlK71CuweR3fIZcR_spRY28rD4')", clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[690px] left-8 right-1/2 mr-4 h-[60px] group cursor-pointer hover:z-30 cyber-ribbon-reverse transition-transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-cyber-cyan/10 border-r-4 border-cyber-cyan backdrop-blur-sm group-hover:bg-cyber-cyan/20"></div>
                <div className="relative px-6 py-2 h-full flex flex-col justify-center text-right pr-8">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide font-display">Weekly Design Sync</h3>
                  <p className="text-cyber-cyan/70 text-xs font-mono">NET_ID: ZOOM_882</p>
                </div>
              </div>
              <div className="absolute top-[720px] left-1/2 right-4 ml-[-20px] h-[60px] group cursor-pointer hover:z-30 cyber-ribbon transition-transform hover:-translate-y-1 z-20">
                <div className="absolute inset-0 bg-cyber-yellow/10 border-l-4 border-cyber-yellow backdrop-blur-sm group-hover:bg-cyber-yellow/20"></div>
                <div className="relative px-6 py-2 h-full flex flex-col justify-center pl-8">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide font-display">Lunch with Client</h3>
                  <p className="text-cyber-yellow/70 text-xs font-mono">LOC: DOWNTOWN_SECTOR</p>
                </div>
              </div>
              <div className="absolute top-[840px] left-6 right-10 h-[150px] group cursor-pointer hover:z-30 cyber-ribbon transition-all hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-blue-900/40 border-l-4 border-cyber-cyan backdrop-blur-md"></div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,240,255,1) 1px, transparent 0)", backgroundSize: "20px 20px" }}></div>
                <div className="relative p-5 h-full flex flex-col justify-between pl-10">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-bold text-xl uppercase tracking-wider font-display">Frontend Impl.</h3>
                      <span className="text-cyber-cyan text-[10px] font-mono border border-cyber-cyan px-1 animate-pulse">RUNNING</span>
                    </div>
                    <p className="text-cyan-200/60 text-sm mt-1 font-mono">SYS.VER: 2.0 // RIBBON_UI</p>
                  </div>
                  <div className="w-full bg-black/50 h-1 mt-4 mb-auto relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-[65%] bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex -space-x-2">
                      <div className="size-6 border border-cyber-cyan bg-slate-800 bg-center bg-cover grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYcrXwUFdeiewT9s5Kvnqqd6alj_zNs-eg8kBL98eTl7fJDgbZFU5c3rmS5McE-vsiq_hWWNv1fYgKlYE2oRLzFJI4-5H1WNJAho_LZt26G_11KIYzMKsc82Svc1Vb9LfKJczyqp1A71czgwlZ_1g4L_mXe_nHiuYCULcq9bkuLS3E85_EfsjPDZ2er7rwfAvD3ryLGZjfBnVkpwe5KHmzjN8MZI37kZg2LJBj6pcKvv7EJFFjpl3RbOhfcASeuL3-YyJdhkUGim8')", transform: "skewX(-15deg)" }}></div>
                      <div className="size-6 border border-cyber-cyan bg-slate-800 bg-center bg-cover grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrPe6pUPkfZYi2EAsikd2c3ghaxamxnjRnCIi9lLNQ3sffHMz7Po4kK185EPr8E-RmRF4KsNBmhdN97C_XtcB60ivAvtBrRmAJHScEKKu34ml-A9A-93bvbBygKOdAmchMcqkBDx0kXikv10tS69vk18Owl8c-6lKktU8AT2LxufdNtlXs3CWnisr9jATJoam42f5KEO7SXlsT6UuvkyRrDMAYIRJUUcM-zvMovt1RuykJtkSz72aPpTgEwyJV0t_zW7GT2YwNdfs')", transform: "skewX(-15deg)" }}></div>
                    </div>
                    <div className="text-[10px] text-cyber-cyan font-mono">STATUS: COMPILING...</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[1020px] left-4 right-8 h-[60px] border border-dashed border-white/20 bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none skew-x-[-10deg]">
                <span className="text-white/30 text-xs font-mono tracking-widest">[ SLOT AVAILABLE: 1700 ]</span>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
