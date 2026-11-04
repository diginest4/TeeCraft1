import React from 'react';
import { HabitItem } from '../../types/planner';
import confetti from 'canvas-confetti';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface HabitTrackerPageProps {
  habits: HabitItem[];
  monthName: string;
  onUpdateHabits: (habits: HabitItem[]) => void;
}

export const HabitTrackerPage: React.FC<HabitTrackerPageProps> = ({
  habits,
  monthName,
  onUpdateHabits,
}) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDay = (habitId: string, dayIndex: number) => {
    const updated = habits.map((h) => {
      if (h.id !== habitId) return h;
      const nextDays = [...h.daysCompleted];
      nextDays[dayIndex] = !nextDays[dayIndex];
      return { ...h, daysCompleted: nextDays };
    });
    onUpdateHabits(updated);

    // If day was completed, occasionally trigger subtle celebration confetti
    const habit = updated.find((h) => h.id === habitId);
    if (habit?.daysCompleted[dayIndex]) {
      const completedCount = habit.daysCompleted.filter(Boolean).length;
      if (completedCount % 5 === 0) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#bdd2cb', '#f2ddd5', '#c9a075', '#8ea38c'],
        });
      }
    }
  };

  const handleAddHabit = () => {
    const newHabit: HabitItem = {
      id: `hb-${Date.now()}`,
      name: 'New Wellness Habit',
      category: 'Health',
      targetDays: 25,
      daysCompleted: Array(31).fill(false),
    };
    onUpdateHabits([...habits, newHabit]);
  };

  const handleDeleteHabit = (id: string) => {
    onUpdateHabits(habits.filter((h) => h.id !== id));
  };

  const handleUpdateName = (id: string, name: string) => {
    onUpdateHabits(habits.map((h) => (h.id === id ? { ...h, name } : h)));
  };

  // Overall statistics
  const totalChecks = habits.reduce(
    (sum, h) => sum + h.daysCompleted.filter(Boolean).length,
    0
  );
  const possibleChecks = habits.length * 31;
  const overallPercentage = possibleChecks > 0 ? Math.round((totalChecks / possibleChecks) * 100) : 0;

  return (
    <div className="w-full h-full p-3 sm:p-6 flex flex-col justify-between bg-paper-cream select-text">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#ded7cc] pb-3 mb-3 gap-2">
        <div>
          <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37] font-normal">
            HABITUDES · HABIT TRACKER
          </h1>
          <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
            Monthly consistency matrix · {monthName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#f0e8de] px-3 py-1 rounded-xs border border-[#ddd3c5] text-right">
            <span className="text-[9px] uppercase tracking-wider text-[#796b5d] block">Consistency</span>
            <span className="font-serif-title text-base text-[#383027] font-semibold">
              {overallPercentage}% ({totalChecks} checks)
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddHabit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#425248] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#344139] cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* Habit Matrix Table */}
      <div className="flex-1 overflow-x-auto border border-[#d8cfc2] bg-white/85 rounded-xs shadow-xs flex flex-col">
        {/* Table Header: Days 1 to 31 */}
        <div className="min-w-[760px] grid grid-cols-[210px_repeat(31,1fr)_65px] bg-[#ede6db] border-b border-[#d8cfc2] text-center text-[10px] font-serif-title text-[#504437] font-semibold py-1.5">
          <div className="text-left px-3 border-r border-[#d8cfc2]">HABIT / ROUTINE</div>
          {days.map((d) => (
            <div key={d} className="border-r border-[#d8cfc2]/70 text-[9px]">
              {d}
            </div>
          ))}
          <div className="text-center font-mono text-[9px]">TOTAL</div>
        </div>

        {/* Habit Rows */}
        <div className="min-w-[760px] flex-1 divide-y divide-[#ece3d8]">
          {habits.map((habit) => {
            const completedDays = habit.daysCompleted.filter(Boolean).length;
            const streakPct = Math.round((completedDays / 31) * 100);

            return (
              <div
                key={habit.id}
                className="grid grid-cols-[210px_repeat(31,1fr)_65px] items-center hover:bg-[#faf7f2] transition-colors py-1 group"
              >
                {/* Habit title & delete button */}
                <div className="px-2 border-r border-[#ece3d8] flex items-center justify-between gap-1">
                  <input
                    type="text"
                    value={habit.name}
                    onChange={(e) => handleUpdateName(habit.id, e.target.value)}
                    className="flex-1 text-xs font-handwriting text-base text-[#3b322a] bg-transparent border-0 focus:outline-hidden focus:ring-0"
                  />
                  <button
                    type="button"
                    title="Remove habit"
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="opacity-0 group-hover:opacity-100 text-[#aa9888] hover:text-red-500 cursor-pointer p-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* 31 Day Checkboxes / Circles */}
                {days.map((d, dayIdx) => {
                  const isChecked = !!habit.daysCompleted[dayIdx];
                  return (
                    <div
                      key={d}
                      onClick={() => toggleDay(habit.id, dayIdx)}
                      className="border-r border-[#ece3d8] h-7 flex items-center justify-center cursor-pointer select-none hover:bg-[#ebdcd1]/30 transition-colors"
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border transition-all duration-100 flex items-center justify-center ${
                          isChecked
                            ? 'bg-[#95ab9f] border-[#6b8577] text-white scale-110 shadow-2xs'
                            : 'border-[#cfc4b6] bg-white group-hover:border-[#aa9b8a]'
                        }`}
                      >
                        {isChecked && <span className="text-[8px] leading-none">✓</span>}
                      </div>
                    </div>
                  );
                })}

                {/* Score & Progress */}
                <div className="px-1 text-center font-mono text-[10px] text-[#5c4f42]">
                  <span className="font-semibold">{completedDays}</span>
                  <span className="text-[9px] text-[#938374]">/31</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Habit Insights & Routine Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <div className="p-3 bg-white/70 border border-[#e5ded4] rounded-xs shadow-2xs">
          <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#695b4c] font-semibold block mb-1">
            KEY WELLNESS RHYTHMS
          </span>
          <p className="font-handwriting text-xs text-[#52463b] leading-relaxed">
            Drink 2L water · 20 min morning sunlight · 7,000 steps · 15 min mindful reading · Gentle stretch
          </p>
        </div>

        <div className="p-3 bg-white/70 border border-[#e5ded4] rounded-xs shadow-2xs">
          <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#695b4c] font-semibold block mb-1">
            HABIT REFLECTION
          </span>
          <p className="font-handwriting text-xs text-[#52463b] leading-relaxed">
            "Small daily disciplines repeated over time lead to extraordinary transformations."
          </p>
        </div>

        <div className="p-3 bg-[#f5ede3] border border-[#e5ded4] rounded-xs shadow-2xs flex items-center justify-between">
          <div>
            <span className="font-serif-title text-[10px] tracking-widest uppercase text-[#695b4c] font-semibold block">
              MONTHLY TARGET
            </span>
            <span className="font-handwriting text-sm text-[#4d3f32]">Aim for 80%+ consistency</span>
          </div>
          <CheckCircle2 className="w-6 h-6 text-[#7a9485]" />
        </div>
      </div>
    </div>
  );
};
