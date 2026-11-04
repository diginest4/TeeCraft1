import React from 'react';
import { VisionBoardData } from '../../types/planner';
import { BotanicalFlower } from '../StickerElement';

interface VisionBoardPageProps {
  data: VisionBoardData;
  onChange: (updated: Partial<VisionBoardData>) => void;
}

export const VisionBoardPage: React.FC<VisionBoardPageProps> = ({ data, onChange }) => {
  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col justify-between relative bg-paper-cream select-text">
      {/* Page Title & Year Bar */}
      <div className="flex items-end justify-between border-b border-[#ded7cc] pb-3 mb-4">
        <div>
          <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37] font-normal">
            TABLEAU DE VISION
          </h1>
          <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
            Vision Board · Intentions &amp; Aspirations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-serif-title text-sm tracking-widest uppercase text-[#5a4e43]">
            YEAR / ANNÉE:
          </span>
          <input
            type="text"
            value={data.year}
            onChange={(e) => onChange({ year: e.target.value })}
            placeholder="2025"
            className="w-16 border-b border-dashed border-[#5a4e43] text-center font-serif-title text-base text-[#343e37] focus:outline-hidden focus:border-[#9cbdb3] bg-transparent"
          />
        </div>
      </div>

      {/* Grid of Vision Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
        {/* Left Column: TRAVEL (VOYAGE) & FAMILY (FAMILLE) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {/* Voyage / Travel Card */}
          <div className="relative p-4 rounded-sm border border-[#e5ded4] bg-white/70 shadow-xs">
            {/* Washi tape on top corner */}
            <div className="absolute -top-2 left-6 px-3 py-0.5 bg-[#f5dcd5] text-[#704d42] text-[9px] tracking-wider uppercase shadow-2xs font-mono rotate-[-2deg]">
              ✦ WANDERLUST
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="font-handwriting text-2xl text-[#655345]">Voyage &amp; Discovery</span>
              <span className="text-[11px] text-[#938576] font-mono">✈ destinations</span>
            </div>

            <textarea
              rows={4}
              value={data.travel.text}
              onChange={(e) =>
                onChange({
                  travel: { ...data.travel, text: e.target.value },
                })
              }
              placeholder="Places to visit, countries, adventures, road trips..."
              className="w-full text-xs leading-relaxed text-[#3c3630] font-handwriting text-base resize-none bg-transparent border-0 focus:ring-0 focus:outline-hidden placeholder:text-[#a89d91]"
            />

            {/* Travel lines simulation */}
            <div className="w-full border-t border-dashed border-[#e0d6cb] mt-1 pt-1 flex justify-between text-[11px] text-[#7a6e60] font-handwriting">
              <span>Passport ready · New cultures · Memories</span>
              <span>2025/2026</span>
            </div>
          </div>

          {/* Family / Famille Soft Pebble Card */}
          <div className="relative p-5 rounded-2xl border border-[#ede5db] bg-[#f7f2ea]/90 shadow-xs flex-1 flex flex-col justify-between">
            {/* Washi tag */}
            <div className="self-start px-3 py-0.5 bg-[#ede1d3] rounded-full text-[#6b5847] text-[10px] tracking-widest font-serif-title uppercase mb-2">
              FAMILLE &amp; LOVED ONES
            </div>

            <textarea
              rows={4}
              value={data.family}
              onChange={(e) => onChange({ family: e.target.value })}
              placeholder="Relationships, friends, shared moments, meaningful celebrations, gratitude for my circle..."
              className="w-full flex-1 text-sm text-[#423a33] font-handwriting text-base resize-none bg-transparent border-0 focus:ring-0 focus:outline-hidden placeholder:text-[#a89d91]"
            />

            <div className="text-right text-[11px] font-handwriting text-[#9c8a77]">
              ♥ Cherish the bond
            </div>
          </div>
        </div>

        {/* Right Column: GOALS (OBJECTIFS), CAREER (CARRIÈRE), HEALTH (SANTÉ) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Objectifs / Core Goals */}
          <div className="relative p-4 rounded-sm border border-dashed border-[#d2c7b8] bg-[#fcfaf7] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif-title tracking-widest text-xs uppercase text-[#54483c] font-semibold">
                OBJECTIFS &amp; CORE GOALS
              </span>
              <div className="w-10 h-10 -mt-2 -mr-1">
                <BotanicalFlower type="daisy" width={38} />
              </div>
            </div>

            <div className="space-y-1.5">
              {data.goals.map((goal, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#8f8272] flex items-center justify-center text-[9px] text-[#8f8272]">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const updated = [...data.goals];
                      updated[idx] = e.target.value;
                      onChange({ goals: updated });
                    }}
                    placeholder={`Goal ${idx + 1}...`}
                    className="flex-1 text-xs sm:text-sm font-handwriting text-[#39332e] border-b border-[#eee7de] pb-0.5 focus:outline-hidden focus:border-[#9cbdb3] bg-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carrière / Career Card */}
          <div className="p-4 rounded-sm border border-[#e5ded4] bg-white/70 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif-title tracking-widest text-xs uppercase text-[#473e33] font-semibold">
                CARRIÈRE &amp; PROJECTS
              </span>
              <span className="text-[10px] tracking-wider text-[#918172] uppercase font-mono">
                Milestones
              </span>
            </div>

            <textarea
              rows={3}
              value={data.career}
              onChange={(e) => onChange({ career: e.target.value })}
              placeholder="Professional milestones, business ventures, creative projects, skills to master..."
              className="w-full text-xs sm:text-sm font-handwriting text-base text-[#38322c] resize-none bg-transparent border-0 focus:ring-0 focus:outline-hidden placeholder:text-[#a89d91]"
            />
          </div>

          {/* Santé & Wellness */}
          <div className="relative p-4 rounded-sm border border-[#e5ded4] bg-[#f9f7f4] shadow-xs">
            {/* Soft gray washi tape header */}
            <div className="absolute -top-2 left-6 px-4 py-0.5 bg-[#dfd9ce] text-[#54483a] text-[10px] tracking-widest font-serif-title uppercase shadow-2xs">
              SANTÉ &amp; VITALITY
            </div>

            <textarea
              rows={3}
              value={data.health}
              onChange={(e) => onChange({ health: e.target.value })}
              placeholder="Daily wellness, movement, nourishment, mental peace, sleep and radiant energy..."
              className="w-full text-xs sm:text-sm font-handwriting text-base text-[#38322c] resize-none bg-transparent border-0 focus:ring-0 focus:outline-hidden placeholder:text-[#a89d91] pt-1"
            />
          </div>
        </div>
      </div>

      {/* Bottom Inspiration Quote */}
      <div className="mt-4 pt-3 border-t border-[#ded7cc] flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
        <div className="flex items-center gap-3">
          <span className="font-handwriting text-lg sm:text-xl text-[#635547] italic">
            "{data.quote || 'Faites plus de ce que vous aimez · Do more of what brings you joy'}"
          </span>
        </div>
        <span className="text-[10px] tracking-widest uppercase text-[#96897c] font-serif-title">
          ✦ Aura Digital Planner
        </span>
      </div>
    </div>
  );
};
