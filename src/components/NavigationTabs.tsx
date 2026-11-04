import React from 'react';
import { PageId } from '../types/planner';
import {
  Home,
  PiggyBank,
  Utensils,
  BookOpen,
  Film,
  Bed,
  Smile,
  Dumbbell,
  Droplets,
  Sun,
  Clock,
  Trophy,
  CheckSquare,
} from 'lucide-react';

interface NavigationTabsProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
  selectedMonthIndex: number;
}

export const MONTH_TABS = [
  { id: 'month_jan' as PageId, label: 'JAN', full: 'January', index: 0 },
  { id: 'month_feb' as PageId, label: 'FEB', full: 'February', index: 1 },
  { id: 'month_mar' as PageId, label: 'MAR', full: 'March', index: 2 },
  { id: 'month_apr' as PageId, label: 'APR', full: 'April', index: 3 },
  { id: 'month_may' as PageId, label: 'MAY', full: 'May', index: 4 },
  { id: 'month_jun' as PageId, label: 'JUN', full: 'June', index: 5 },
  { id: 'month_jul' as PageId, label: 'JUL', full: 'July', index: 6 },
  { id: 'month_aug' as PageId, label: 'AUG', full: 'August', index: 7 },
  { id: 'month_sep' as PageId, label: 'SEP', full: 'September', index: 8 },
  { id: 'month_oct' as PageId, label: 'OCT', full: 'October', index: 9 },
  { id: 'month_nov' as PageId, label: 'NOV', full: 'November', index: 10 },
  { id: 'month_dec' as PageId, label: 'DEC', full: 'December', index: 11 },
];

export const TOP_MAIN_TABS = [
  { id: 'vision' as PageId, label: 'VISION', bg: '#bdd2cb', activeBg: '#9cbdb3', text: '#28443c' },
  { id: 'habits' as PageId, label: 'HABITS', bg: '#f2ddd5', activeBg: '#e8c5b8', text: '#5c392c' },
  { id: 'finance' as PageId, label: 'FINANCE', bg: '#9bb1a4', activeBg: '#7c9b88', text: '#1e3828' },
  { id: 'todo' as PageId, label: 'TO DO LIST', bg: '#c8d8d3', activeBg: '#a8c2ba', text: '#264239' },
  { id: 'notes' as PageId, label: 'NOTES', bg: '#f0d9d3', activeBg: '#e2beba', text: '#57332c' },
];

export const QUICK_ICONS = [
  { id: 'savings' as PageId, icon: PiggyBank, label: 'Savings' },
  { id: 'meals' as PageId, icon: Utensils, label: 'Meal Plan' },
  { id: 'reading' as PageId, icon: BookOpen, label: 'Reading' },
  { id: 'reading' as PageId, icon: Film, label: 'Watchlist' },
  { id: 'sleep' as PageId, icon: Bed, label: 'Sleep' },
  { id: 'mood' as PageId, icon: Smile, label: 'Mood' },
  { id: 'fitness' as PageId, icon: Dumbbell, label: 'Fitness' },
  { id: 'water' as PageId, icon: Droplets, label: 'Hydration' },
  { id: 'routines' as PageId, icon: Sun, label: 'Routines' },
  { id: 'goals' as PageId, icon: Trophy, label: 'Milestones' },
  { id: 'weekly_review' as PageId, icon: CheckSquare, label: 'Review' },
];

export const TopTabs: React.FC<NavigationTabsProps> = ({
  activePage,
  onSelectPage,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Primary Pastel Tabs along top edge */}
      <div className="w-full flex items-end justify-between px-6 pt-1">
        <div className="flex items-end gap-1.5 sm:gap-2.5">
          {TOP_MAIN_TABS.map((tab) => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectPage(tab.id)}
                style={{
                  backgroundColor: isActive ? tab.activeBg : tab.bg,
                  color: tab.text,
                }}
                className={`px-3 sm:px-5 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-t-md transition-all duration-150 shadow-xs cursor-pointer select-none ${
                  isActive
                    ? '-translate-y-0.5 shadow-sm font-bold border-t-2 border-black/10'
                    : 'opacity-85 hover:opacity-100 hover:-translate-y-0.5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Home / Cover Icon Button */}
        <button
          type="button"
          onClick={() => onSelectPage('home')}
          title="Cover & Index"
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer shadow-xs ${
            activePage === 'home'
              ? 'bg-[#2a332d] text-white ring-2 ring-[#a3806c]'
              : 'bg-[#3b473f] text-[#ede9e2] hover:bg-[#2a332d] hover:scale-105'
          }`}
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary Quick Icon Tracker Bar */}
      <div className="w-full bg-[#f2ede4] border-y border-[#dfd7cc] px-4 py-1.5 flex items-center justify-between sm:justify-start sm:gap-4 overflow-x-auto scrollbar-none text-[#574d42]">
        <div className="flex items-center gap-2 sm:gap-4 mx-auto sm:mx-0">
          {QUICK_ICONS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                onClick={() => onSelectPage(item.id)}
                title={item.label}
                className={`p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-[#d8c8b6] text-[#2c241c] shadow-xs'
                    : 'text-[#6e6355] hover:text-[#2c241c] hover:bg-[#e6ddce]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const MonthTabs: React.FC<NavigationTabsProps> = ({
  activePage,
  onSelectPage,
}) => {
  return (
    <div
      className="absolute -right-7 sm:-right-8 top-16 bottom-16 flex flex-col justify-between z-20 select-none pointer-events-auto"
      aria-label="Month Tabs"
    >
      {MONTH_TABS.map((month) => {
        const isActive = activePage === month.id;
        return (
          <button
            key={month.id}
            type="button"
            onClick={() => onSelectPage(month.id)}
            title={month.full}
            className={`w-7 sm:w-8 py-2 text-[10px] sm:text-[11px] font-semibold tracking-wider rounded-r-md transition-all duration-150 cursor-pointer shadow-xs border-r border-y border-black/10 flex items-center justify-center [writing-mode:vertical-lr] ${
              isActive
                ? 'bg-[#FAF7F2] text-[#2c332e] font-bold shadow-md -translate-x-0.5'
                : 'bg-[#ded6cb] text-[#615649] hover:bg-[#ece4d8] hover:text-[#2c332e]'
            }`}
          >
            {month.label}
          </button>
        );
      })}
    </div>
  );
};
