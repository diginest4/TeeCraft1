import React from 'react';
import { NoteEntry } from '../../types/planner';

interface NotesPageProps {
  note: NoteEntry;
  onChange: (updated: Partial<NoteEntry>) => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({ note, onChange }) => {
  const paperClass =
    note.paperStyle === 'lined'
      ? 'bg-paper-lined'
      : note.paperStyle === 'dotted'
      ? 'bg-paper-dot'
      : note.paperStyle === 'grid'
      ? 'bg-paper-grid'
      : 'bg-paper-cream';

  return (
    <div className={`w-full h-full p-4 sm:p-8 flex flex-col justify-between ${paperClass} select-text transition-all`}>
      {/* Top Header & Paper Selector */}
      <div className="border-b border-[#ded7cc] pb-3 mb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-2">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37] font-normal">
              CARNET DE NOTES · JOURNAL
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
              Lined · Dotted · Grid · Blank Digital Stationery
            </p>
          </div>

          {/* Paper style & font style controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-[#ede6db] p-1 rounded-xs border border-[#ddd3c5]">
              {(['lined', 'dotted', 'grid', 'blank'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => onChange({ paperStyle: style })}
                  className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-serif-title rounded-xs cursor-pointer ${
                    note.paperStyle === style
                      ? 'bg-white text-[#2c241c] font-semibold shadow-2xs'
                      : 'text-[#6b5d4e] hover:text-[#2c241c]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                onChange({
                  fontStyle: note.fontStyle === 'handwriting' ? 'sans' : 'handwriting',
                })
              }
              className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-serif-title bg-[#f3ede4] hover:bg-[#e8ded2] text-[#524436] rounded-xs border border-[#ddd3c5] cursor-pointer"
            >
              Font: {note.fontStyle === 'handwriting' ? 'Handwritten' : 'Clean Sans'}
            </button>
          </div>
        </div>

        {/* Note title and date input */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
          <input
            type="text"
            value={note.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Note title or reflection topic..."
            className="w-full sm:w-2/3 text-lg sm:text-xl font-serif-title text-[#2e261f] bg-transparent border-0 focus:outline-hidden focus:ring-0 p-0 placeholder:text-[#a89d91]"
          />
          <input
            type="text"
            value={note.date}
            onChange={(e) => onChange({ date: e.target.value })}
            placeholder="Date: Nov 4, 2026"
            className="text-xs font-mono text-[#796b5e] bg-transparent border-b border-[#ded7cc] sm:text-right focus:outline-hidden"
          />
        </div>
      </div>

      {/* Note Writing Canvas */}
      <div className="flex-1 w-full relative">
        <textarea
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Start writing your thoughts, meeting notes, journal entries, brain dumps, or creative ideas here..."
          className={`w-full h-full p-2 bg-transparent resize-none border-0 focus:ring-0 focus:outline-hidden leading-relaxed text-[#2c251f] placeholder:text-[#ab9f92] ${
            note.fontStyle === 'handwriting'
              ? 'font-handwriting text-xl sm:text-2xl leading-[28px]'
              : 'font-sans text-sm sm:text-base leading-7'
          }`}
        />
      </div>

      {/* Note Footer */}
      <div className="pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[11px] font-handwriting text-[#827262]">
        <span>Thoughtful pages for a mindful life</span>
        <span className="font-serif-title text-[10px] uppercase tracking-wider">
          {note.content.length} characters written
        </span>
      </div>
    </div>
  );
};
