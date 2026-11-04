import React from 'react';
import { PlacedSticker } from '../types/planner';

interface StickerElementProps {
  sticker: PlacedSticker;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onRotate?: (delta: number) => void;
  onScale?: (delta: number) => void;
}

export const BotanicalFlower: React.FC<{ type: string; width: number }> = ({ type, width }) => {
  const height = width * 1.1;

  if (type === 'daisy') {
    return (
      <svg width={width} height={height} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm select-none pointer-events-none">
        {/* Flower Stem */}
        <path d="M50 50 C48 70, 52 90, 49 105" stroke="#796B55" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M50 75 Q42 70 38 73 Q44 78 50 77" fill="#8C7A5E" opacity="0.75" />
        {/* Petals */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="45"
            rx="7"
            ry="24"
            fill="#C9A075"
            opacity="0.88"
            transform={`rotate(${deg} 50 45)`}
          />
        ))}
        {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
          <ellipse
            key={deg}
            cx="50"
            cy="45"
            rx="5.5"
            ry="20"
            fill="#B88A58"
            opacity="0.92"
            transform={`rotate(${deg} 50 45)`}
          />
        ))}
        {/* Center core */}
        <circle cx="50" cy="45" r="11" fill="#7A4E2B" />
        <circle cx="50" cy="45" r="9" fill="#5E381A" />
        <circle cx="48" cy="43" r="3" fill="#A87545" opacity="0.7" />
      </svg>
    );
  }

  if (type === 'eucalyptus') {
    return (
      <svg width={width} height={height} viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm select-none pointer-events-none">
        <path d="M40 10 C38 40, 42 75, 39 105" stroke="#687262" strokeWidth="2" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="28" cy="30" rx="14" ry="10" fill="#8EA38C" transform="rotate(-20 28 30)" opacity="0.9" />
        <ellipse cx="52" cy="38" rx="14" ry="10" fill="#7C947A" transform="rotate(20 52 38)" opacity="0.9" />
        <ellipse cx="25" cy="55" rx="15" ry="11" fill="#889E86" transform="rotate(-25 25 55)" opacity="0.85" />
        <ellipse cx="54" cy="65" rx="15" ry="11" fill="#778E75" transform="rotate(25 54 65)" opacity="0.9" />
        <ellipse cx="28" cy="82" rx="16" ry="12" fill="#8EA38C" transform="rotate(-20 28 82)" opacity="0.9" />
        <ellipse cx="40" cy="18" rx="10" ry="8" fill="#A4B9A2" opacity="0.9" />
      </svg>
    );
  }

  if (type === 'lavender') {
    return (
      <svg width={width} height={height} viewBox="0 0 70 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm select-none pointer-events-none">
        <path d="M35 15 L35 105" stroke="#7A8B74" strokeWidth="2" strokeLinecap="round" />
        {[20, 32, 44, 56, 68].map((y, idx) => (
          <g key={idx}>
            <ellipse cx="28" cy={y} rx="5" ry="8" fill="#8B7B9E" transform={`rotate(-30 28 ${y})`} opacity="0.9" />
            <ellipse cx="42" cy={y + 4} rx="5" ry="8" fill="#998AA9" transform={`rotate(30 42 ${y + 4})`} opacity="0.9" />
          </g>
        ))}
        <ellipse cx="35" cy="15" rx="4" ry="7" fill="#7D6A92" opacity="0.95" />
      </svg>
    );
  }

  // Rose / Olive fallback
  return (
    <svg width={width} height={height} viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm select-none pointer-events-none">
      <path d="M40 25 C37 55, 43 80, 40 105" stroke="#7A8072" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="30" r="16" fill="#C48E88" opacity="0.9" />
      <circle cx="40" cy="30" r="12" fill="#AD736D" opacity="0.9" />
      <circle cx="39" cy="29" r="8" fill="#8F544E" opacity="0.9" />
      <ellipse cx="28" cy="58" rx="10" ry="6" fill="#8F9E87" transform="rotate(-30 28 58)" opacity="0.85" />
      <ellipse cx="50" cy="70" rx="10" ry="6" fill="#83937B" transform="rotate(30 50 70)" opacity="0.85" />
    </svg>
  );
};

export const PolaroidCard: React.FC<{ variant: string; width: number }> = ({ variant, width }) => {
  return (
    <div
      style={{ width }}
      className="bg-white p-2 pb-5 rounded-xs shadow-md border border-[#eee8e2] text-center flex flex-col items-center select-none"
    >
      <div className="w-full aspect-square bg-[#f6eee7] overflow-hidden rounded-xs flex items-center justify-center relative">
        {variant === 'POLAROID_CELEBRATE' ? (
          <div className="w-full h-full bg-gradient-to-tr from-[#fadcd4] via-[#fcefe8] to-[#f2e6dc] flex flex-col items-center justify-center p-2 text-center">
            <span className="text-2xl mb-1">🎂</span>
            <span className="font-serif-title text-xs tracking-wider uppercase text-[#735246] font-semibold">Celebrate</span>
            <span className="font-handwriting text-sm text-[#9c6a58]">sweet moments</span>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[#dae5e0] via-[#edf2ef] to-[#ebdcd0] flex flex-col items-center justify-center p-2 text-center">
            <span className="text-2xl mb-1">📸</span>
            <span className="font-serif-title text-xs tracking-wider uppercase text-[#475b51] font-semibold">Memories</span>
            <span className="font-handwriting text-sm text-[#61776b]">forever cherish</span>
          </div>
        )}
      </div>
      <div className="mt-1.5 font-handwriting text-xs text-[#6e5d53] tracking-wide">
        {variant === 'POLAROID_CELEBRATE' ? 'happiness ♡' : 'golden days ✦'}
      </div>
    </div>
  );
};

export const StickerElement: React.FC<StickerElementProps> = ({
  sticker,
  isSelected,
  onSelect,
  onDelete,
  onRotate,
  onScale,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute cursor-move select-none transition-shadow ${
        isSelected ? 'ring-2 ring-[#a3806c] ring-offset-1 rounded-sm shadow-lg' : 'hover:drop-shadow-md'
      }`}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
        zIndex: isSelected ? 40 : sticker.zIndex,
      }}
    >
      {/* Visual content based on sticker type */}
      {sticker.type === 'flower' && (
        <BotanicalFlower type={sticker.content} width={sticker.width} />
      )}

      {sticker.type === 'washi' && (
        <div
          style={{
            width: sticker.width,
            backgroundColor: sticker.bgColor || '#f3d9d2',
            color: sticker.textColor || '#ffffff',
          }}
          className="h-6 px-3 flex items-center justify-center text-xs tracking-widest font-mono opacity-90 shadow-xs border-y border-white/40 washi-tape relative overflow-hidden"
        >
          {/* subtle jagged torn ends simulation */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/5" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/5" />
          <span className="truncate">{sticker.content}</span>
        </div>
      )}

      {sticker.type === 'quote' && (
        <div
          style={{
            width: sticker.width,
            backgroundColor: sticker.bgColor || 'transparent',
            color: sticker.textColor || '#2d332f',
            borderColor: sticker.borderColor || 'transparent',
          }}
          className="px-2.5 py-1 text-center rounded-sm border"
        >
          <span className="font-handwriting text-lg leading-tight font-medium block">
            {sticker.content}
          </span>
        </div>
      )}

      {sticker.type === 'badge' && sticker.content.startsWith('POLAROID_') && (
        <PolaroidCard variant={sticker.content} width={sticker.width} />
      )}

      {sticker.type === 'badge' && !sticker.content.startsWith('POLAROID_') && (
        <div
          style={{
            width: sticker.width,
            backgroundColor: sticker.bgColor || '#f4ece5',
            color: sticker.textColor || '#4a3b32',
          }}
          className="px-2.5 py-1 text-center rounded-xs shadow-xs border border-black/5 text-[10px] tracking-widest font-semibold uppercase font-sans"
        >
          {sticker.content}
        </div>
      )}

      {/* Action controls when selected */}
      {isSelected && (
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#262c28] text-white px-2 py-0.5 rounded-md shadow-lg text-[11px] whitespace-nowrap z-50 no-print"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            title="Rotate Left"
            onClick={() => onRotate?.(-15)}
            className="hover:text-amber-300 px-1 py-0.5 cursor-pointer"
          >
            ↺
          </button>
          <button
            type="button"
            title="Rotate Right"
            onClick={() => onRotate?.(15)}
            className="hover:text-amber-300 px-1 py-0.5 cursor-pointer"
          >
            ↻
          </button>
          <span className="text-white/40">|</span>
          <button
            type="button"
            title="Smaller"
            onClick={() => onScale?.(-15)}
            className="hover:text-amber-300 px-1 py-0.5 cursor-pointer"
          >
            −
          </button>
          <button
            type="button"
            title="Larger"
            onClick={() => onScale?.(15)}
            className="hover:text-amber-300 px-1 py-0.5 cursor-pointer"
          >
            +
          </button>
          <span className="text-white/40">|</span>
          <button
            type="button"
            title="Delete Sticker"
            onClick={() => onDelete?.()}
            className="text-red-400 hover:text-red-300 px-1 py-0.5 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
