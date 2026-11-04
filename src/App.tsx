import React, { useState, useEffect, useRef } from 'react';
import {
  PageId,
  PlacedSticker,
  VisionBoardData,
  MonthData,
  HabitItem,
  FinanceData,
  TodoItem,
  NoteEntry,
} from './types/planner';
import {
  DEFAULT_VISION_BOARD,
  DEFAULT_MONTH_DATA,
  DEFAULT_HABITS,
  DEFAULT_FINANCE,
  DEFAULT_TODOS,
  DEFAULT_NOTE,
  DEFAULT_STICKERS,
} from './data/defaultData';
import { TopTabs, MonthTabs, MONTH_TABS } from './components/NavigationTabs';
import { SpiralBinding } from './components/SpiralBinding';
import { StickerCanvas } from './components/StickerCanvas';
import { StickerDrawer } from './components/StickerDrawer';
import { PdfExportModal } from './components/PdfExportModal';
import { CoverPage } from './components/pages/CoverPage';
import { VisionBoardPage } from './components/pages/VisionBoardPage';
import { MonthlyCalendarPage } from './components/pages/MonthlyCalendarPage';
import { HabitTrackerPage } from './components/pages/HabitTrackerPage';
import { FinancePage } from './components/pages/FinancePage';
import { TodoListPage } from './components/pages/TodoListPage';
import { NotesPage } from './components/pages/NotesPage';
import { LifestyleTrackers } from './components/pages/LifestyleTrackers';
import { StickerDefinition } from './data/stickers';
import {
  FileDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';

const STORAGE_KEY = 'aura_digital_planner_v1';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<PageId>('month_jan');
  const [isStickerDrawerOpen, setIsStickerDrawerOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  // Planner Data States with LocalStorage Persistence
  const [visionData, setVisionData] = useState<VisionBoardData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_vision`);
    return saved ? JSON.parse(saved) : DEFAULT_VISION_BOARD;
  });

  const [monthsData, setMonthsData] = useState<Record<number, MonthData>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_months`);
    if (saved) return JSON.parse(saved);
    // Initialize 12 months
    const map: Record<number, MonthData> = {};
    for (let i = 0; i < 12; i++) {
      map[i] = {
        ...DEFAULT_MONTH_DATA,
        monthIndex: i,
        events: i === 0 ? DEFAULT_MONTH_DATA.events : [],
      };
    }
    return map;
  });

  const [habits, setHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_habits`);
    return saved ? JSON.parse(saved) : DEFAULT_HABITS;
  });

  const [finance, setFinance] = useState<FinanceData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_finance`);
    return saved ? JSON.parse(saved) : DEFAULT_FINANCE;
  });

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_todos`);
    return saved ? JSON.parse(saved) : DEFAULT_TODOS;
  });

  const [note, setNote] = useState<NoteEntry>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_note`);
    return saved ? JSON.parse(saved) : DEFAULT_NOTE;
  });

  const [stickers, setStickers] = useState<PlacedSticker[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stickers`);
    return saved ? JSON.parse(saved) : DEFAULT_STICKERS;
  });

  // Ref to the planner page spread for PDF generation
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_vision`, JSON.stringify(visionData));
  }, [visionData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_months`, JSON.stringify(monthsData));
  }, [monthsData]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_habits`, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_finance`, JSON.stringify(finance));
  }, [finance]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_todos`, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_note`, JSON.stringify(note));
  }, [note]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stickers`, JSON.stringify(stickers));
  }, [stickers]);

  // Current month index if active page is a month tab
  const currentMonthTab = MONTH_TABS.find((m) => m.id === activePage);
  const selectedMonthIndex = currentMonthTab ? currentMonthTab.index : 0;
  const currentMonthData = monthsData[selectedMonthIndex] || DEFAULT_MONTH_DATA;

  // Add Sticker to Current Page
  const handleAddSticker = (def: Partial<StickerDefinition>) => {
    const newSticker: PlacedSticker = {
      id: `stk-${Date.now()}`,
      pageId: activePage,
      type: def.type || 'badge',
      content: def.content || '★',
      x: 50 + (Math.random() * 10 - 5),
      y: 45 + (Math.random() * 10 - 5),
      width: def.defaultWidth || 100,
      rotation: Math.round(Math.random() * 12 - 6),
      zIndex: 20 + stickers.length,
      bgColor: def.bgColor,
      textColor: def.textColor,
      borderColor: def.borderColor,
      fontFamily: def.fontFamily,
    };
    setStickers([...stickers, newSticker]);
  };

  // Reset or load demo
  const handleLoadDemo = () => {
    setVisionData(DEFAULT_VISION_BOARD);
    const map: Record<number, MonthData> = {};
    for (let i = 0; i < 12; i++) {
      map[i] = {
        ...DEFAULT_MONTH_DATA,
        monthIndex: i,
        events: i === 0 ? DEFAULT_MONTH_DATA.events : [],
      };
    }
    setMonthsData(map);
    setHabits(DEFAULT_HABITS);
    setFinance(DEFAULT_FINANCE);
    setTodos(DEFAULT_TODOS);
    setNote(DEFAULT_NOTE);
    setStickers(DEFAULT_STICKERS);
    setActivePage('month_jan');
  };

  const handleResetBlank = () => {
    if (window.confirm('Reset planner back to fresh state?')) {
      handleLoadDemo();
    }
  };

  // Sequence of main pages for next/previous navigation
  const PAGE_SEQUENCE: PageId[] = [
    'home',
    'vision',
    'month_jan',
    'month_feb',
    'month_mar',
    'month_apr',
    'month_may',
    'month_jun',
    'month_jul',
    'month_aug',
    'month_sep',
    'month_oct',
    'month_nov',
    'month_dec',
    'habits',
    'finance',
    'todo',
    'meals',
    'reading',
    'mood',
    'notes',
  ];

  const currentPageIndex = PAGE_SEQUENCE.indexOf(activePage);

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setActivePage(PAGE_SEQUENCE[currentPageIndex - 1]);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < PAGE_SEQUENCE.length - 1) {
      setActivePage(PAGE_SEQUENCE[currentPageIndex + 1]);
    }
  };

  // Current page human readable title
  const getPageTitle = () => {
    if (activePage === 'home') return 'Cover & Index';
    if (activePage === 'vision') return 'Tableau de Vision';
    if (activePage === 'habits') return 'Habit Consistency Matrix';
    if (activePage === 'finance') return 'Budget & Finance';
    if (activePage === 'todo') return 'To Do & Priorities';
    if (activePage === 'notes') return 'Journal & Notes';
    if (activePage === 'meals') return 'Weekly Meal Planner';
    if (activePage === 'reading') return 'Reading Bookshelf';
    if (activePage === 'mood' || activePage === 'sleep' || activePage === 'water' || activePage === 'fitness')
      return 'Wellness & Rhythms';
    if (currentMonthTab) return `${currentMonthTab.full} Monthly Spread`;
    return 'Digital Planner';
  };

  return (
    <div className="min-h-screen bg-[#1c2321] text-[#2c332e] flex flex-col font-sans relative selection:bg-[#d8c3b0] selection:text-[#1c2321]">
      {/* Background Floral Wallpaper (Inspired by the reference image) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: `url('/assets/aistudio/Capture_d__cran_2026-10-21_214131_4d85d5e7.png')`,
        }}
      />

      {/* Top Bar Contract (§2):
          [Brand title, 1 line] — [4-5 nav links, 1-2 words, single line] — [1 primary action] */}
      <header className="relative z-40 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-white/10 bg-[#161c1a]/95 backdrop-blur-md no-print">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
            }}
            className="font-serif-title text-xl tracking-[0.18em] uppercase text-[#f7f3ee] whitespace-nowrap shrink-0 hover:text-[#d4bfab] transition-colors"
          >
            Aura Digital Planner
          </a>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[#c8bfb4]">
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'home' ? 'text-white border-b border-[#c8bfb4] pb-0.5' : ''
            }`}
          >
            Cover
          </button>
          <button
            type="button"
            onClick={() => setActivePage('vision')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'vision' ? 'text-white border-b border-[#c8bfb4] pb-0.5' : ''
            }`}
          >
            Vision Board
          </button>
          <button
            type="button"
            onClick={() => setActivePage('month_jan')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage.startsWith('month_') ? 'text-white border-b border-[#c8bfb4] pb-0.5' : ''
            }`}
          >
            Calendar
          </button>
          <button
            type="button"
            onClick={() => setActivePage('habits')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'habits' ? 'text-white border-b border-[#c8bfb4] pb-0.5' : ''
            }`}
          >
            Habit Matrix
          </button>
          <button
            type="button"
            onClick={() => setActivePage('finance')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'finance' ? 'text-white border-b border-[#c8bfb4] pb-0.5' : ''
            }`}
          >
            Finance
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1c2321] bg-[#d9c7b6] hover:bg-[#e8d8c9] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <FileDown className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Export to PDF</span>
          </button>
        </div>
      </header>

      {/* Floating Workspace Utility Bar (Below Header) */}
      <div className="relative z-30 px-4 sm:px-8 py-2 bg-[#121615]/80 border-b border-white/5 flex items-center justify-between gap-3 text-xs text-[#b8ada0] no-print">
        {/* Left: Current Page Label & Pagination */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPageIndex <= 0}
              onClick={handlePrevPage}
              title="Previous Page"
              className="p-1.5 rounded-sm hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPageIndex >= PAGE_SEQUENCE.length - 1}
              onClick={handleNextPage}
              title="Next Page"
              className="p-1.5 rounded-sm hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="font-serif-title uppercase tracking-widest text-[#dfd7cc] font-medium hidden sm:inline">
            {getPageTitle()}
          </span>
          <span className="text-[11px] font-mono text-[#8a7f72]">
            (Page {currentPageIndex + 1} of 105)
          </span>
        </div>

        {/* Right: Quick actions: Sticker Drawer, Reset demo, View mode */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsStickerDrawerOpen(true)}
            className="flex items-center gap-1 px-3 py-1 bg-[#293530] hover:bg-[#34433d] text-[#e8ded2] rounded-sm text-xs font-serif-title uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d8c3b0]" />
            <span>Stickers ({stickers.filter((s) => s.pageId === activePage).length})</span>
          </button>

          <button
            type="button"
            onClick={handleResetBlank}
            title="Reset to Demo Defaults"
            className="p-1.5 text-[#a89d90] hover:text-white hover:bg-white/10 rounded-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullView(!isFullView)}
            title={isFullView ? 'Show Tablet Frame' : 'Full-Spread Mode'}
            className="p-1.5 text-[#a89d90] hover:text-white hover:bg-white/10 rounded-sm cursor-pointer"
          >
            {isFullView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Digital Planner Canvas Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 relative z-20 overflow-x-hidden">
        {/* Tablet Frame Outer Container */}
        <div
          className={`w-full transition-all duration-300 relative ${
            isFullView
              ? 'max-w-[1400px]'
              : 'max-w-[1240px] bg-[#111614] p-3 sm:p-5 rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-[6px] sm:border-[10px] border-[#222a27]'
          }`}
        >
          {/* Top Camera Notch / Bezel dot on tablet */}
          {!isFullView && (
            <div className="w-2.5 h-2.5 bg-black/60 rounded-full mx-auto mb-2 no-print" />
          )}

          {/* Interactive Planner Spread Container */}
          <div className="relative w-full flex flex-col">
            {/* Top Pastel Navigation Tabs */}
            <div className="no-print">
              <TopTabs
                activePage={activePage}
                onSelectPage={setActivePage}
                selectedMonthIndex={selectedMonthIndex}
              />
            </div>

            {/* Notebook Paper Spread */}
            <div
              ref={pageContainerRef}
              className="planner-page-container relative w-full min-h-[640px] sm:min-h-[720px] bg-[#FAF7F2] rounded-b-md sm:rounded-b-lg border-x border-b border-[#ded7cc] shadow-xl overflow-hidden flex flex-col"
            >
              {/* Spiral binding rings along left edge */}
              <div className="no-print">
                <SpiralBinding ringCount={21} />
              </div>

              {/* Draggable & Placed Stickers Canvas Layer */}
              <StickerCanvas
                pageId={activePage}
                stickers={stickers}
                onUpdateStickers={setStickers}
                containerRef={pageContainerRef}
              />

              {/* Active Planner Page Content (Padding left accounts for spiral coils) */}
              <div className="w-full h-full pl-6 sm:pl-9 pr-2 sm:pr-4 py-2 flex-1 flex flex-col">
                {activePage === 'home' && (
                  <CoverPage
                    onNavigate={setActivePage}
                    onLoadDemo={handleLoadDemo}
                  />
                )}

                {activePage === 'vision' && (
                  <VisionBoardPage
                    data={visionData}
                    onChange={(updated) => setVisionData({ ...visionData, ...updated })}
                  />
                )}

                {activePage.startsWith('month_') && (
                  <MonthlyCalendarPage
                    monthData={currentMonthData}
                    monthName={currentMonthTab?.full || 'January'}
                    monthIndex={selectedMonthIndex}
                    onUpdateMonth={(updated) => {
                      setMonthsData({
                        ...monthsData,
                        [selectedMonthIndex]: { ...currentMonthData, ...updated },
                      });
                    }}
                  />
                )}

                {activePage === 'habits' && (
                  <HabitTrackerPage
                    habits={habits}
                    monthName={currentMonthTab?.full || 'January'}
                    onUpdateHabits={setHabits}
                  />
                )}

                {activePage === 'finance' && (
                  <FinancePage
                    data={finance}
                    onChange={(updated) => setFinance({ ...finance, ...updated })}
                  />
                )}

                {activePage === 'todo' && (
                  <TodoListPage
                    todos={todos}
                    onUpdateTodos={setTodos}
                  />
                )}

                {activePage === 'notes' && (
                  <NotesPage
                    note={note}
                    onChange={(updated) => setNote({ ...note, ...updated })}
                  />
                )}

                {(activePage === 'meals' ||
                  activePage === 'reading' ||
                  activePage === 'sleep' ||
                  activePage === 'mood' ||
                  activePage === 'fitness' ||
                  activePage === 'water' ||
                  activePage === 'routines' ||
                  activePage === 'goals' ||
                  activePage === 'weekly_review') && (
                  <LifestyleTrackers pageId={activePage} />
                )}
              </div>
            </div>

            {/* Right Month Navigation Tabs */}
            <div className="no-print hidden sm:block">
              <MonthTabs
                activePage={activePage}
                onSelectPage={setActivePage}
                selectedMonthIndex={selectedMonthIndex}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Quick Sticker Palette (Mobile / Tablet helper) */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden no-print">
        <button
          type="button"
          onClick={() => setIsStickerDrawerOpen(true)}
          className="w-12 h-12 bg-[#2d3a33] text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#d8c3b0]" />
        </button>
      </div>

      {/* Modals */}
      <StickerDrawer
        isOpen={isStickerDrawerOpen}
        onClose={() => setIsStickerDrawerOpen(false)}
        onAddSticker={handleAddSticker}
      />

      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        currentPageTitle={getPageTitle()}
        plannerContainerRef={pageContainerRef}
      />
    </div>
  );
}
