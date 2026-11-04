import React, { useState } from 'react';
import { MonthData, CalendarEvent } from '../../types/planner';
import { BotanicalFlower } from '../StickerElement';
import { Plus, X } from 'lucide-react';

interface MonthlyCalendarPageProps {
  monthData: MonthData;
  monthName: string;
  monthIndex: number;
  onUpdateMonth: (updated: Partial<MonthData>) => void;
}

const DAYS_OF_WEEK = [
  { short: 'MON', alt: 'LUN' },
  { short: 'TUE', alt: 'MAR' },
  { short: 'WED', alt: 'MER' },
  { short: 'THU', alt: 'JEU' },
  { short: 'FRI', alt: 'VEN' },
  { short: 'SAT', alt: 'SAM' },
  { short: 'SUN', alt: 'DIM' },
];

export const MonthlyCalendarPage: React.FC<MonthlyCalendarPageProps> = ({
  monthData,
  monthName,
  monthIndex,
  onUpdateMonth,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newEventText, setNewEventText] = useState('');
  const [newEventType, setNewEventType] = useState<'appointment' | 'work' | 'personal' | 'health'>('appointment');

  // Days in month logic (for the specified year & month)
  const daysInMonth = new Date(monthData.year, monthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(monthData.year, monthIndex, 1).getDay(); // 0 is Sun
  // Adjust so Monday is 0
  const startOffset = (firstDayOfWeek + 6) % 7;

  // Calendar cells generation (5 or 6 weeks)
  const totalCells = Math.ceil((daysInMonth + startOffset) / 7) * 7;
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const dayNumber = i - startOffset + 1;
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
    return {
      index: i,
      dayNumber: isCurrentMonth ? dayNumber : null,
      weekNumber: Math.floor(i / 7) + 1,
    };
  });

  const handleAddEvent = (day: number) => {
    if (!newEventText.trim()) return;
    const newEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      day,
      text: newEventText.trim(),
      category: newEventType,
    };
    onUpdateMonth({
      events: [...monthData.events, newEvent],
    });
    setNewEventText('');
    setSelectedDay(null);
  };

  const handleDeleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateMonth({
      events: monthData.events.filter((ev) => ev.id !== id),
    });
  };

  return (
    <div className="w-full h-full p-3 sm:p-6 flex flex-col justify-between bg-paper-cream select-text relative">
      {/* Top Header: Citation & Year/Month Selector */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 border-b border-[#ded7cc] pb-3 mb-2">
        {/* Quote / Citation Card */}
        <div className="relative flex-1 bg-white/70 border border-[#e5ded4] p-3 rounded-xs flex items-center justify-between shadow-2xs">
          <div className="flex-1 pr-2">
            <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#736353] font-semibold block mb-0.5">
              CITATION · QUOTE OF THE MONTH
            </span>
            <input
              type="text"
              value={monthData.quote}
              onChange={(e) => onUpdateMonth({ quote: e.target.value })}
              placeholder="Don't be afraid to go slowly, be afraid only of standing still."
              className="w-full font-handwriting text-base sm:text-lg text-[#38322c] bg-transparent border-0 focus:outline-hidden focus:ring-0 placeholder:text-[#a89d91]"
            />
          </div>
          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
            <BotanicalFlower type="daisy" width={36} />
          </div>
        </div>

        {/* Year & Month badge */}
        <div className="flex md:flex-col justify-between md:justify-center items-end bg-[#f3ede4] px-4 py-2 rounded-xs border border-[#e0d6cb] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase font-serif-title text-[#695c4e]">
              ANNÉE / YEAR:
            </span>
            <input
              type="number"
              value={monthData.year}
              onChange={(e) => onUpdateMonth({ year: parseInt(e.target.value) || 2025 })}
              className="w-16 font-serif-title text-base font-semibold text-[#2b2520] bg-transparent border-b border-[#695c4e] text-center focus:outline-hidden"
            />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] tracking-widest uppercase font-serif-title text-[#695c4e]">
              MOIS / MONTH:
            </span>
            <span className="font-handwriting text-xl text-[#3d332a] font-semibold capitalize">
              {monthName}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Calendar Table */}
      <div className="w-full flex-1 border border-[#d8cfc2] bg-white/80 rounded-xs overflow-hidden flex flex-col shadow-xs">
        {/* Days of week header */}
        <div className="grid grid-cols-[38px_repeat(7,1fr)] bg-[#ede6db] border-b border-[#d8cfc2] text-center text-[10px] sm:text-xs font-serif-title tracking-wider text-[#4d4235] font-semibold py-1.5">
          <div className="border-r border-[#d8cfc2] text-[#857564]">W#</div>
          {DAYS_OF_WEEK.map((d, idx) => (
            <div key={idx} className={idx < 6 ? 'border-r border-[#d8cfc2]' : ''}>
              <span className="hidden sm:inline">{d.short}</span>
              <span className="sm:hidden">{d.short[0]}</span>
              <span className="text-[9px] text-[#8a7b6c] ml-1 hidden md:inline">({d.alt})</span>
            </div>
          ))}
        </div>

        {/* Calendar Rows */}
        <div className="grid grid-cols-[38px_repeat(7,1fr)] flex-1 auto-rows-fr divide-y divide-[#e5ded4]">
          {cells.map((cell) => {
            const isWeekLabel = cell.index % 7 === 0;
            const dayEvents = cell.dayNumber
              ? monthData.events.filter((ev) => ev.day === cell.dayNumber)
              : [];

            return (
              <React.Fragment key={cell.index}>
                {isWeekLabel && (
                  <div className="bg-[#f7f2ea] border-r border-[#d8cfc2] flex items-center justify-center text-[9px] font-serif-title uppercase text-[#887867] select-none">
                    W{cell.weekNumber}
                  </div>
                )}

                <div
                  onClick={() => cell.dayNumber && setSelectedDay(cell.dayNumber)}
                  className={`min-h-[64px] sm:min-h-[78px] p-1 sm:p-1.5 flex flex-col justify-between border-r border-[#e5ded4] last:border-r-0 transition-colors cursor-pointer relative group ${
                    cell.dayNumber ? 'bg-white hover:bg-[#faf6f0]' : 'bg-[#faf6f0]/50 cursor-default'
                  }`}
                >
                  {/* Day Number Header */}
                  {cell.dayNumber && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-xs font-semibold text-[#54483b] font-serif-title">
                        {cell.dayNumber}
                      </span>
                      <button
                        type="button"
                        title="Add event or note"
                        className="opacity-0 group-hover:opacity-100 text-[#887867] hover:text-[#2c241c] transition-opacity p-0.5 rounded-full"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Day Events list */}
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[50px] scrollbar-none my-0.5">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="group/item text-[10px] sm:text-[11px] leading-tight px-1.5 py-0.5 rounded-xs bg-[#f4ebe3] text-[#4f3e30] border border-[#e8ded3] flex items-center justify-between font-handwriting"
                      >
                        <span className="truncate">{ev.text}</span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteEvent(ev.id, e)}
                          className="opacity-0 group-hover/item:opacity-100 text-red-500 hover:text-red-700 ml-1 cursor-pointer"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Empty spacer for drop aesthetic */}
                  <div />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bottom Notes & Objectives Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        {/* Aperçu du mois (Month Overview) */}
        <div className="p-3 bg-white/70 border border-[#e5ded4] rounded-xs shadow-2xs">
          <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#695b4c] font-semibold block mb-1">
            APERÇU DU MOIS · OVERVIEW
          </span>
          <textarea
            rows={2}
            value={monthData.overviewNotes}
            onChange={(e) => onUpdateMonth({ overviewNotes: e.target.value })}
            placeholder="Focus themes, energy of the month, intentions..."
            className="w-full text-xs font-handwriting text-[#3d342c] resize-none bg-transparent border-0 focus:outline-hidden focus:ring-0 placeholder:text-[#a89d91]"
          />
        </div>

        {/* Objectifs (Month Objectives) */}
        <div className="p-3 bg-white/70 border border-[#e5ded4] rounded-xs shadow-2xs">
          <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#695b4c] font-semibold block mb-1">
            OBJECTIFS · TOP 3 GOALS
          </span>
          <div className="space-y-1">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#918172] font-mono">0{idx + 1}.</span>
                <input
                  type="text"
                  value={monthData.objectives[idx] || ''}
                  onChange={(e) => {
                    const updated = [...(monthData.objectives || [])];
                    updated[idx] = e.target.value;
                    onUpdateMonth({ objectives: updated });
                  }}
                  placeholder={`Monthly priority ${idx + 1}...`}
                  className="w-full text-xs font-handwriting text-[#3d342c] bg-transparent border-b border-[#eee6dc] focus:outline-hidden"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates / Birthdays */}
        <div className="p-3 bg-[#f7f2ea] border border-[#e5ded4] rounded-xs shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#695b4c] font-semibold">
              DATES IMPORTANTES · REMINDERS
            </span>
            <span className="text-xs">★</span>
          </div>
          <p className="text-[11px] font-handwriting text-[#5c4f42]">
            Remember to take time for yourself and celebrate small wins every single week!
          </p>
          <div className="text-[10px] text-[#8a7b6b] uppercase font-mono tracking-wider pt-1 border-t border-[#e2d8cb]">
            105 Pages Interactive Planner
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {selectedDay !== null && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="bg-[#FAF7F2] p-5 rounded-md border border-[#d8cfc2] shadow-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#ded7cc] pb-2 mb-3">
              <h3 className="font-serif-title text-base uppercase text-[#38322b]">
                Add to Day {selectedDay} ({monthName})
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-[#7c6f62] hover:text-[#2c241c] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#6e6051] block mb-1 font-serif-title uppercase">
                  Event / Task / Note:
                </label>
                <input
                  type="text"
                  autoFocus
                  value={newEventText}
                  onChange={(e) => setNewEventText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddEvent(selectedDay)}
                  placeholder="e.g. RDV dentiste, Dinner with Sarah, Yoga class"
                  className="w-full text-sm font-handwriting p-2 rounded-xs border border-[#d2c6b6] bg-white text-[#2c241c] focus:outline-hidden focus:border-[#9cbdb3]"
                />
              </div>

              <div>
                <label className="text-xs text-[#6e6051] block mb-1 font-serif-title uppercase">
                  Category:
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: 'appointment', label: 'Appointment / RDV' },
                    { id: 'personal', label: 'Personal / Self-Care' },
                    { id: 'work', label: 'Work / Meeting' },
                    { id: 'health', label: 'Health / Workout' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewEventType(cat.id as any)}
                      className={`p-1.5 text-center rounded-xs border cursor-pointer ${
                        newEventType === cat.id
                          ? 'bg-[#d8c8b8] text-[#2c241c] border-[#b09e8c] font-semibold'
                          : 'bg-white text-[#6b5c4d] border-[#e2d8cc] hover:bg-[#f6eee4]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ded7cc]">
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="px-3 py-1.5 text-xs text-[#6e6051] hover:text-[#2c241c] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAddEvent(selectedDay)}
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#44544b] text-white rounded-xs hover:bg-[#34423a] cursor-pointer shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
