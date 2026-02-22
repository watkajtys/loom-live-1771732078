import { create } from 'zustand';

export interface Thread {
  id: string;
  title: string;
  duration: number; // in minutes
  category: 'cyber-cyan' | 'cyber-magenta' | 'cyber-yellow';
  startTime: number | null; // minutes from 00:00, or null if in spool
  description?: string;
}

interface Store {
  threads: Thread[];
  addThread: (thread: Omit<Thread, 'id'>) => void;
  updateThread: (id: string, updates: Partial<Thread>) => void;
  removeThread: (id: string) => void;
  setThreadTime: (id: string, startTime: number | null) => void;
  clearThreads: () => void;
}

export const useStore = create<Store>((set) => ({
  threads: [
    {
      id: '1',
      title: 'Q3 Strategy Review',
      duration: 90,
      category: 'cyber-magenta',
      startTime: null,
      description: '90 MIN // DEEP_WORK',
    },
    {
      id: '2',
      title: 'Client Sync: Alpha',
      duration: 30,
      category: 'cyber-cyan',
      startTime: null,
      description: '30 MIN // COMMS',
    },
    {
      id: '3',
      title: 'Gym Session',
      duration: 60,
      category: 'cyber-yellow',
      startTime: null,
      description: '60 MIN // BIO_MAINTENANCE',
    },
    {
      id: '4',
      title: 'Project Alpha: Deep Work',
      duration: 120,
      category: 'cyber-magenta',
      startTime: 540, // 09:00
      description: '<MODE: FOCUS_LOCK />',
    },
    {
        id: '5',
        title: 'Weekly Design Sync',
        duration: 60,
        category: 'cyber-cyan',
        startTime: 690, // 11:30
        description: 'NET_ID: ZOOM_882',
    },
    {
        id: '6',
        title: 'Lunch with Client',
        duration: 60,
        category: 'cyber-yellow',
        startTime: 720, // 12:00
        description: 'LOC: DOWNTOWN_SECTOR',
    },
    {
        id: '7',
        title: 'Frontend Impl.',
        duration: 150,
        category: 'cyber-cyan',
        startTime: 840, // 14:00
        description: 'SYS.VER: 2.0 // RIBBON_UI',
    }
  ],
  addThread: (thread) =>
    set((state) => ({
      threads: [
        ...state.threads,
        { ...thread, id: crypto.randomUUID() },
      ],
    })),
  updateThread: (id, updates) =>
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
  removeThread: (id) =>
    set((state) => ({
      threads: state.threads.filter((t) => t.id !== id),
    })),
  setThreadTime: (id, startTime) =>
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === id ? { ...t, startTime } : t
      ),
    })),
  clearThreads: () => set({ threads: [] }),
}));
