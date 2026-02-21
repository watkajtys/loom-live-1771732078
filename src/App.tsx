import React from 'react';

// --- Types ---

interface NodeData {
  id: string;
  type: 'start' | 'action' | 'ghost';
  title: string;
  subtitle?: string;
  act?: string;
  position: { x: number; y: number };
  status?: 'active' | 'future';
  paths?: number;
  opacity?: number;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  type: 'solid' | 'dashed';
  label?: string;
  path: string; // Using explicit path for now to match design exactly
  color?: string;
}

// --- Data ---

const NODES: NodeData[] = [
  {
    id: '1',
    type: 'start',
    title: 'The Discovery',
    subtitle: 'Detective Miller finds the clue.',
    act: 'Act 1',
    position: { x: 60, y: 100 },
    status: 'active',
  },
  {
    id: '2',
    type: 'action',
    title: 'Docks Encounter',
    subtitle: 'Confrontation with the suspect.',
    act: 'Act 1',
    position: { x: 200, y: 320 },
    status: 'active',
    paths: 2,
  },
  {
    id: '3',
    type: 'ghost',
    title: 'Alternate Ending',
    position: { x: 420, y: 130 },
    status: 'future',
    opacity: 0.6,
  },
];

const EDGES: EdgeData[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'solid',
    path: 'M 180 160 C 180 250, 180 250, 250 320',
    color: '#7311d4',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'dashed',
    path: 'M 180 160 C 350 160, 350 160, 420 160',
    color: '#4b5563',
  },
];

// --- Components ---

const Header = () => (
  <header className="flex items-center justify-between p-4 z-20 bg-background-light/90 dark:bg-surface-darker/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/30 shrink-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
        <span className="material-symbols-outlined text-sm">hub</span>
      </div>
      <div>
        <h1 className="text-lg font-bold leading-tight tracking-tight">The Obsidian Protocol</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">LAST EDITED: 2 MINS AGO</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors">
        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">share</span>
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
        <span className="material-symbols-outlined">play_arrow</span>
      </button>
    </div>
  </header>
);

const ConnectionLayer = ({ edges }: { edges: EdgeData[] }) => (
  <svg className="connector-svg">
    <defs>
      <marker id="arrowhead" markerHeight="7" markerWidth="10" orient="auto" refX="9" refY="3.5">
        <polygon fill="#7311d4" points="0 0, 10 3.5, 0 7"></polygon>
      </marker>
      <marker id="arrowhead-dim" markerHeight="7" markerWidth="10" orient="auto" refX="9" refY="3.5">
        <polygon fill="#4b5563" points="0 0, 10 3.5, 0 7"></polygon>
      </marker>
    </defs>
    {edges.map((edge) => (
      <path
        key={edge.id}
        d={edge.path}
        fill="none"
        markerEnd={edge.type === 'solid' ? 'url(#arrowhead)' : 'url(#arrowhead-dim)'}
        opacity={edge.type === 'solid' ? 1 : 0.5}
        stroke={edge.color}
        strokeDasharray={edge.type === 'dashed' ? '5,5' : undefined}
        strokeWidth="2"
      />
    ))}
  </svg>
);

const NodeComponent = ({ node }: { node: NodeData }) => {
  const style = {
    top: `${node.position.y}px`,
    left: `${node.position.x}px`,
    opacity: node.opacity,
    zIndex: 10,
  };

  // Render logic based on node type
  if (node.type === 'ghost') {
    return (
      <div className="absolute w-52" style={style}>
        <div className="node-card bg-surface-darker border border-dashed border-slate-600 rounded-xl p-3 flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0 text-slate-500">
            <span className="material-symbols-outlined text-lg">question_mark</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-300 font-medium text-sm leading-tight italic">{node.title}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute w-60" style={style}>
      <div className={`node-card bg-surface-dark dark:bg-surface-dark ${node.type === 'start' ? 'border-2 border-primary ring-4 ring-primary/20' : 'border border-slate-700/50 hover:border-primary/50'} rounded-xl p-3 flex items-start gap-3 cursor-pointer transition-colors`}>
        <div className={`w-10 h-10 rounded-full ${node.type === 'start' ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-400'} flex items-center justify-center shrink-0`}>
          <span className="material-symbols-outlined">{node.type === 'start' ? 'search' : 'location_on'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <span className={`text-xs font-bold ${node.type === 'start' ? 'text-primary' : 'text-slate-500'} uppercase tracking-wider`}>{node.act}</span>
            {node.type === 'start' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
          </div>
          <h3 className="text-slate-100 font-bold text-sm leading-tight truncate">{node.title}</h3>
          <p className="text-slate-400 text-xs mt-1 truncate">{node.subtitle}</p>
        </div>
      </div>
      {node.paths && (
        <div className="absolute -bottom-3 right-4 bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
          {node.paths} PATHS
        </div>
      )}
    </div>
  );
};

const Toolbar = () => (
  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
    <div className="glass-panel p-2 rounded-full flex flex-col gap-2 shadow-xl shadow-black/50">
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/40 group relative">
        <span className="material-symbols-outlined">add</span>
        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Node</span>
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all group relative">
        <span className="material-symbols-outlined">timeline</span>
        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Connect</span>
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all group relative">
        <span className="material-symbols-outlined">call_split</span>
        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Branch</span>
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all group relative">
        <span className="material-symbols-outlined">label</span>
        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Tags</span>
      </button>
    </div>
    <div className="glass-panel p-2 rounded-full flex flex-col gap-2 shadow-xl shadow-black/50 mt-2">
      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
        <span className="material-symbols-outlined">settings</span>
      </button>
    </div>
  </div>
);

const NodeInspector = () => (
  <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 md:top-4 z-40 flex flex-col justify-end md:justify-start pointer-events-none">
    <div className="glass-panel rounded-lg md:rounded-xl p-0 shadow-2xl shadow-black/80 flex flex-col max-h-[50vh] md:max-h-[calc(100vh-8rem)] pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-surface-darker/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">edit_note</span>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Node Details</h2>
        </div>
        <button className="text-slate-400 hover:text-white">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
      {/* Panel Content */}
      <div className="overflow-y-auto p-4 flex flex-col gap-4">
        {/* Cover Image */}
        <div className="w-full aspect-video rounded-lg bg-slate-800 relative overflow-hidden group">
          <img
            alt="Futuristic neon city street at night with cyber noir atmosphere"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-MN91fAShROkg_UQI4bPSGYwlr350NdQGXU9v3bqWJA34wKntLDJ7IXX7WLomCEORInKQ_xw_HwKEMZ-emYGOmvTTumwekeCQ_Yf-YoAg7uSGClKSfQ68hw6n6sKdiAQrn3PkQI1VePqaSOumrnxt6nvFeYbpyWD-e4UIw02UIs8Ms7JC5O8mx6OeNbsY7siVzFs804R2fdHgkWpFN_6A9nC6LdxsZzTw-ChJhg4AWJzatz1utMUGwQCuQn7h3I8pb32hWkF3kw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-primary transition-colors">
            <span className="material-symbols-outlined text-sm">image</span>
          </button>
        </div>
        {/* Title Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</label>
          <input
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            type="text"
            defaultValue="The Discovery"
          />
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
            Act 1
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            Detective Miller
          </span>
          <button className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 border-dashed">
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
        {/* Synopsis */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synopsis</label>
          <textarea
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-24 resize-none leading-relaxed"
            defaultValue="Detective Miller finds a encrypted data drive hidden in the rain gutter of the abandoned warehouse."
          ></textarea>
        </div>
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">
            <span className="material-symbols-outlined text-sm">delete</span>
            Delete
          </button>
          <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined text-sm">save</span>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ZoomControls = () => (
  <div className="absolute bottom-24 right-4 md:bottom-4 md:right-auto md:left-20 z-30 flex flex-col md:flex-row gap-2">
    <div className="glass-panel p-1 rounded-full flex flex-col md:flex-row gap-1 shadow-lg">
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
        <span className="material-symbols-outlined text-lg">add</span>
      </button>
      <div className="w-8 h-8 flex items-center justify-center text-xs font-mono text-slate-500 select-none">
        100%
      </div>
      <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
        <span className="material-symbols-outlined text-lg">remove</span>
      </button>
    </div>
  </div>
);

function App() {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <main className="relative flex-1 w-full overflow-hidden bg-background-light dark:bg-background-dark grid-background group/canvas">
        <ConnectionLayer edges={EDGES} />

        {/* Condition Label - Hardcoded for now as it's a specific UI element overlaid */}
        <div className="absolute top-[230px] left-[150px] z-[15] transform translate-x-3 translate-y-1">
          <button className="group flex items-center gap-2 bg-surface-darker border border-primary text-xs text-primary font-medium px-3 py-1.5 rounded-full glow-effect hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[14px] text-primary group-hover:text-white transition-colors">alt_route</span>
            <span className="text-primary group-hover:text-white transition-colors">Choice: Hack the Drive</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-1"></span>
          </button>
        </div>
        
        {NODES.map((node) => (
          <NodeComponent key={node.id} node={node} />
        ))}

        <Toolbar />
        <NodeInspector />
        <ZoomControls />
      </main>
    </div>
  );
}

export default App;
