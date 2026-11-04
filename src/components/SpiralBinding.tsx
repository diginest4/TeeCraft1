import React from 'react';

interface SpiralBindingProps {
  ringCount?: number;
}

export const SpiralBinding: React.FC<SpiralBindingProps> = ({ ringCount = 22 }) => {
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <div
      className="absolute -left-5 top-8 bottom-8 w-10 flex flex-col justify-between items-center z-30 pointer-events-none select-none"
      aria-hidden="true"
    >
      {rings.map((ring) => (
        <div key={ring} className="relative w-full h-4 flex items-center justify-center">
          {/* Punched hole in paper */}
          <div className="absolute right-1 w-2.5 h-3.5 bg-[#403831] rounded-sm shadow-inner opacity-80" />
          
          {/* Wire ring coil shadow */}
          <div className="absolute left-2 w-6 h-2 bg-black/20 rounded-full blur-[1px] transform rotate-[-6deg] translate-y-1" />

          {/* Double metallic ring loop */}
          <div className="relative w-8 h-2.5 rounded-full border-[2.5px] border-[#d8d2c8] bg-gradient-to-r from-[#b3aba0] via-[#ede9e2] to-[#a89f94] shadow-sm transform rotate-[-6deg]">
            {/* Specular metallic highlight */}
            <div className="absolute inset-x-1 top-0 h-[1px] bg-white/80 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
