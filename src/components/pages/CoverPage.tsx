import React from 'react';
import { PageId } from '../../types/planner';
import { BotanicalFlower } from '../StickerElement';
import { Sparkles, ArrowRight, BookOpen, Calendar, Target, DollarSign, CheckSquare, Heart } from 'lucide-react';

interface CoverPageProps {
  onNavigate: (page: PageId) => void;
  onLoadDemo: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onNavigate, onLoadDemo }) => {
  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col justify-between bg-paper-cream select-text relative overflow-hidden">
      {/* Decorative top flower & badge */}
      <div className="flex items-start justify-between border-b border-[#ded7cc] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#2c332e] text-[#f4efe8] text-[10px] tracking-widest uppercase font-serif-title font-semibold rounded-xs shadow-xs">
              NON DATÉ + TRACKERS
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#796d5e]">
              105 PAGES DIGITAL PLANNER
            </span>
          </div>

          <h1 className="font-serif-title text-3xl sm:text-5xl tracking-[0.2em] uppercase text-[#232b26] font-normal leading-tight">
            AGENDA DIGITAL
          </h1>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#7a6452] mt-0.5">
            + Aesthetic Interactive Stickers
          </p>
        </div>

        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
          <BotanicalFlower type="daisy" width={60} />
        </div>
      </div>

      {/* Center Overview & Table of Contents */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-stretch">
        {/* Left Column: Quick Features & Demo button */}
        <div className="md:col-span-5 bg-[#f6eee5] p-5 rounded-sm border border-[#e5ded4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#735946] mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="font-serif-title text-xs uppercase tracking-widest font-semibold">
                YOUR MINDFUL COMPANION
              </span>
            </div>

            <p className="text-sm font-handwriting text-[#3d332a] leading-relaxed mb-4 text-base">
              Welcome to your complete aesthetic digital sanctuary. Designed with intentional French stationery elegance,
              realistic spiral binding, draggable stickers, and high-fidelity PDF exporting for your tablet or print.
            </p>

            <div className="space-y-2 text-xs font-serif-title text-[#524436]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7a9485]" />
                <span>12 Interactive Undated Monthly Spreads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7a9485]" />
                <span>Habit, Finance &amp; Priority Eisenhower Matrices</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7a9485]" />
                <span>Washi Tapes, Dried Flowers &amp; Affirmation Stickers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7a9485]" />
                <span>300-DPI Multi-Page &amp; Single-Page PDF Export</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e2d6c8] flex flex-col gap-2">
            <button
              type="button"
              onClick={onLoadDemo}
              className="w-full py-2 bg-[#425248] hover:bg-[#344139] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Load Aesthetic Demo (Like Image)</span>
            </button>
            <span className="text-[10px] text-center text-[#8a7b6c] font-handwriting">
              Pre-fills appointments, cute polaroids, flowers, and habits!
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Table of Contents */}
        <div className="md:col-span-7 bg-white/80 p-5 rounded-sm border border-[#e5ded4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#eee6dc] pb-2 mb-3">
              <span className="font-serif-title text-xs uppercase tracking-widest font-semibold text-[#45382b]">
                SOMMAIRE · TABLE OF CONTENTS
              </span>
              <span className="text-[10px] font-mono text-[#8f8171]">Jump to page</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'vision' as PageId, icon: Target, title: 'Vision Board', desc: 'Aspirations & pillars' },
                { id: 'month_jan' as PageId, icon: Calendar, title: 'Monthly Calendar', desc: '12-Month Spreads' },
                { id: 'habits' as PageId, icon: CheckSquare, title: 'Habit Tracker', desc: '31-day consistency' },
                { id: 'finance' as PageId, icon: DollarSign, title: 'Finance & Budget', desc: 'Income, bills & savings' },
                { id: 'todo' as PageId, icon: CheckSquare, title: 'To-Do & Priorities', desc: 'Eisenhower grid' },
                { id: 'meals' as PageId, icon: Heart, title: 'Meal Planner', desc: 'Menu & market list' },
                { id: 'reading' as PageId, icon: BookOpen, title: 'Reading Log', desc: 'Bookshelf & reviews' },
                { id: 'notes' as PageId, icon: BookOpen, title: 'Notes & Journal', desc: 'Lined, dotted & blank' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="p-2.5 rounded-xs border border-[#ebe2d5] hover:border-[#b09e8b] bg-[#faf7f2] hover:bg-white text-left transition-all group flex items-start justify-between cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <Icon className="w-3.5 h-3.5 mt-0.5 text-[#735e4e] group-hover:text-[#232b26]" />
                      <div>
                        <div className="font-serif-title text-xs font-semibold text-[#382d22] group-hover:text-[#1c241f]">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[#857666] font-handwriting">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#b5a796] group-hover:text-[#382d22] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#eee6dc] flex items-center justify-between text-[11px] font-handwriting text-[#7a6b5c]">
            <span>Click any tab on top or right edge at any time</span>
            <span>Aura 105 Pages Edition</span>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="pt-3 border-t border-[#ded7cc] flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-[11px] font-handwriting text-[#695a4c] gap-1">
        <span>"Your future is created by what you do today, not tomorrow."</span>
        <span className="font-serif-title uppercase text-[10px] tracking-widest text-[#938576]">
          ✦ Crafted for intentional living
        </span>
      </div>
    </div>
  );
};
