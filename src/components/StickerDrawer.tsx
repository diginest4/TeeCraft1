import React, { useState } from 'react';
import { STICKER_LIBRARY, StickerDefinition } from '../data/stickers';
import { BotanicalFlower, PolaroidCard } from './StickerElement';
import { X, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';

interface StickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSticker: (definition: Partial<StickerDefinition>) => void;
}

export const StickerDrawer: React.FC<StickerDrawerProps> = ({
  isOpen,
  onClose,
  onAddSticker,
}) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'washi' | 'botanical' | 'badges' | 'custom'>('quotes');
  const [customText, setCustomText] = useState('');
  const [customBg, setCustomBg] = useState('#faf6f0');
  const [customTextColor, setCustomTextColor] = useState('#2d241c');
  const [customFont, setCustomFont] = useState<'handwriting' | 'serif' | 'sans'>('handwriting');

  if (!isOpen) return null;

  const filtered = STICKER_LIBRARY.filter((s) => s.category === activeTab);

  const handleAddCustomText = () => {
    if (!customText.trim()) return;
    onAddSticker({
      name: customText,
      category: 'quotes',
      type: 'quote',
      content: customText.trim(),
      defaultWidth: Math.min(220, Math.max(100, customText.length * 9)),
      bgColor: customBg,
      textColor: customTextColor,
      fontFamily: customFont,
    });
    setCustomText('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onAddSticker({
            name: file.name,
            category: 'accents',
            type: 'image',
            content: reader.result,
            defaultWidth: 120,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-md border border-[#d8cfc2] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#ded7cc] bg-[#f5ede3]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8a7662]" />
            <h2 className="font-serif-title text-base sm:text-lg tracking-wider uppercase text-[#383028] font-semibold">
              AGENDA DIGITAL · STICKER VAULT
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#7c6f62] hover:text-[#2c241c] p-1 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#ece4d8] border-b border-[#ded7cc] overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'quotes', label: 'Quotes & Words' },
            { id: 'washi', label: 'Washi Tapes' },
            { id: 'botanical', label: 'Dried Florals' },
            { id: 'badges', label: 'Badges & Pins' },
            { id: 'custom', label: 'Custom / Upload' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id as any)}
              className={`px-3 py-1.5 rounded-xs font-serif-title uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-white text-[#2c241c] font-semibold shadow-xs'
                  : 'text-[#6b5d4e] hover:text-[#2c241c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sticker Grid / Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {activeTab !== 'custom' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onAddSticker(item);
                    onClose();
                  }}
                  className="p-3 bg-white/80 rounded-xs border border-[#e5ded4] hover:border-[#a3806c] hover:bg-white transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group shadow-2xs min-h-[90px]"
                >
                  {/* Sticker Preview */}
                  {item.type === 'flower' && (
                    <div className="w-16 h-16 flex items-center justify-center">
                      <BotanicalFlower type={item.content} width={50} />
                    </div>
                  )}

                  {item.type === 'washi' && (
                    <div
                      style={{
                        backgroundColor: item.bgColor,
                        color: item.textColor,
                      }}
                      className="w-full h-6 px-2 flex items-center justify-center text-xs tracking-widest font-mono shadow-2xs border-y border-white/50 washi-tape"
                    >
                      <span className="truncate">{item.content}</span>
                    </div>
                  )}

                  {item.type === 'quote' && (
                    <div
                      style={{
                        backgroundColor: item.bgColor || '#faf6f2',
                        color: item.textColor || '#2d332f',
                        borderColor: item.borderColor || '#e8ded2',
                      }}
                      className="px-2.5 py-1 text-center rounded-sm border"
                    >
                      <span className="font-handwriting text-base font-medium">
                        {item.content}
                      </span>
                    </div>
                  )}

                  {item.type === 'badge' && item.content.startsWith('POLAROID_') && (
                    <PolaroidCard variant={item.content} width={80} />
                  )}

                  {item.type === 'badge' && !item.content.startsWith('POLAROID_') && (
                    <div
                      style={{
                        backgroundColor: item.bgColor,
                        color: item.textColor,
                      }}
                      className="px-2 py-0.5 text-center rounded-xs shadow-2xs text-[9px] font-semibold uppercase tracking-wider"
                    >
                      {item.content}
                    </div>
                  )}

                  <span className="text-[10px] text-[#807264] font-serif-title uppercase group-hover:text-[#2c241c]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Custom text / Upload Tab */
            <div className="space-y-4 max-w-md mx-auto">
              <div className="bg-white p-4 rounded-xs border border-[#e0d6cb] shadow-xs">
                <h3 className="font-serif-title text-sm uppercase text-[#3e342a] mb-2 font-semibold">
                  Create Custom Text / Quote Sticker
                </h3>
                <textarea
                  rows={2}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type anything (e.g. Flight to Paris, Spa Day, Remember to breathe...)"
                  className="w-full p-2 text-sm font-handwriting border border-[#d8cfc2] rounded-xs bg-[#faf7f2] mb-3 focus:outline-hidden focus:border-[#9cbdb3]"
                />

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <label className="text-[10px] uppercase font-serif-title text-[#706253] block mb-1">
                      Background Color:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {['transparent', '#faf6f0', '#f4dfd4', '#bdd2cb', '#edd5cf', '#ede7df'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCustomBg(c)}
                          className={`w-5 h-5 rounded-full border cursor-pointer ${
                            customBg === c ? 'ring-2 ring-black/40 scale-110' : 'border-[#cfc4b6]'
                          }`}
                          style={{ backgroundColor: c === 'transparent' ? '#fff' : c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-serif-title text-[#706253] block mb-1">
                      Font Style:
                    </label>
                    <div className="flex gap-1">
                      {(['handwriting', 'serif', 'sans'] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setCustomFont(f)}
                          className={`px-2 py-0.5 text-[10px] uppercase rounded-xs border cursor-pointer ${
                            customFont === f ? 'bg-[#d8c8b8] font-bold border-[#b5a593]' : 'bg-[#f7f2eb]'
                          }`}
                        >
                          {f[0].toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAddCustomText();
                    onClose();
                  }}
                  className="w-full py-2 bg-[#44544b] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#344139] cursor-pointer"
                >
                  + Add Custom Sticker to Page
                </button>
              </div>

              {/* Photo Upload */}
              <div className="bg-white p-4 rounded-xs border border-[#e0d6cb] shadow-xs text-center">
                <h3 className="font-serif-title text-sm uppercase text-[#3e342a] mb-1 font-semibold flex items-center justify-center gap-1">
                  <ImageIcon className="w-4 h-4 text-[#796b5c]" /> Upload Custom Photo Sticker
                </h3>
                <p className="text-xs font-handwriting text-[#7a6d5f] mb-3">
                  Upload any picture from your device to stick onto your planner pages!
                </p>
                <label className="inline-block px-4 py-2 bg-[#f0e8de] text-[#4d4033] hover:bg-[#e4dacd] text-xs uppercase tracking-wider font-semibold rounded-xs border border-[#d2c7b8] cursor-pointer">
                  Select Photo File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageUpload(e);
                      onClose();
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-[#f5ede3] border-t border-[#ded7cc] flex items-center justify-between text-xs text-[#706253]">
          <span className="font-handwriting">Click any sticker to place on active planner spread</span>
          <span className="font-serif-title uppercase text-[10px]">Agenda Stickers</span>
        </div>
      </div>
    </div>
  );
};
