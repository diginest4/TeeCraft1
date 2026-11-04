import React, { useState, useRef } from 'react';
import { PlacedSticker, PageId } from '../types/planner';
import { StickerElement } from './StickerElement';

interface StickerCanvasProps {
  pageId: PageId;
  stickers: PlacedSticker[];
  onUpdateStickers: (stickers: PlacedSticker[]) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const StickerCanvas: React.FC<StickerCanvasProps> = ({
  pageId,
  stickers,
  onUpdateStickers,
  containerRef,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const draggingIdRef = useRef<string | null>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; stickerX: number; stickerY: number } | null>(null);

  const pageStickers = stickers.filter((s) => s.pageId === pageId);

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    // Only drag with primary pointer button
    if (e.button !== 0) return;
    setSelectedId(id);
    draggingIdRef.current = id;

    const sticker = stickers.find((s) => s.id === id);
    if (!sticker) return;

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      stickerX: sticker.x,
      stickerY: sticker.y,
    };

    const handlePointerMove = (moveEv: PointerEvent) => {
      if (!draggingIdRef.current || !dragStartRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const deltaX = moveEv.clientX - dragStartRef.current.mouseX;
      const deltaY = moveEv.clientY - dragStartRef.current.mouseY;

      const deltaPctX = (deltaX / rect.width) * 100;
      const deltaPctY = (deltaY / rect.height) * 100;

      const newX = Math.min(95, Math.max(5, dragStartRef.current.stickerX + deltaPctX));
      const newY = Math.min(95, Math.max(5, dragStartRef.current.stickerY + deltaPctY));

      onUpdateStickers(
        stickers.map((s) =>
          s.id === draggingIdRef.current ? { ...s, x: newX, y: newY } : s
        )
      );
    };

    const handlePointerUp = () => {
      draggingIdRef.current = null;
      dragStartRef.current = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleDelete = (id: string) => {
    onUpdateStickers(stickers.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleRotate = (id: string, delta: number) => {
    onUpdateStickers(
      stickers.map((s) =>
        s.id === id ? { ...s, rotation: (s.rotation + delta) % 360 } : s
      )
    );
  };

  const handleScale = (id: string, delta: number) => {
    onUpdateStickers(
      stickers.map((s) =>
        s.id === id ? { ...s, width: Math.max(40, Math.min(300, s.width + delta)) } : s
      )
    );
  };

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
      onClick={() => setSelectedId(null)}
    >
      {pageStickers.map((sticker) => (
        <div
          key={sticker.id}
          className="pointer-events-auto"
          onPointerDown={(e) => handlePointerDown(sticker.id, e)}
        >
          <StickerElement
            sticker={sticker}
            isSelected={selectedId === sticker.id}
            onSelect={() => setSelectedId(sticker.id)}
            onDelete={() => handleDelete(sticker.id)}
            onRotate={(delta) => handleRotate(sticker.id, delta)}
            onScale={(delta) => handleScale(sticker.id, delta)}
          />
        </div>
      ))}
    </div>
  );
};
