import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { X, FileDown, Printer, Check, Loader2 } from 'lucide-react';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPageTitle: string;
  plannerContainerRef: React.RefObject<HTMLDivElement | null>;
  onExportAllPages?: () => Promise<void>;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  currentPageTitle,
  plannerContainerRef,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleExportCurrentPage = async () => {
    if (!plannerContainerRef.current) return;
    try {
      setIsExporting(true);
      setStatusMessage('Capturing high-resolution planner page...');

      const element = plannerContainerRef.current;
      
      // Temporarily hide action controls or borders if needed
      const canvas = await html2canvas(element, {
        scale: 2.5, // 2.5x resolution for print-ready crispness
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FAF7F2',
        windowWidth: 1200,
      });

      setStatusMessage('Generating A4 PDF document...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Create PDF in landscape A4
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate aspect ratio preserving fit
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const printWidth = imgWidth * ratio;
      const printHeight = imgHeight * ratio;
      const marginX = (pdfWidth - printWidth) / 2;
      const marginY = (pdfHeight - printHeight) / 2;

      pdf.addImage(imgData, 'JPEG', marginX, marginY, printWidth, printHeight, undefined, 'FAST');
      
      const fileName = `Aura_Digital_Planner_${currentPageTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
      pdf.save(fileName);

      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setIsExporting(false);
      setStatusMessage('Export failed. Please try browser print option.');
    }
  };

  const handleNativePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-md border border-[#d8cfc2] shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ded7cc] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-[#425248]" />
            <h2 className="font-serif-title text-lg uppercase tracking-wider text-[#343e37] font-semibold">
              Export Planner to PDF
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

        <p className="text-xs font-handwriting text-base text-[#524436] mb-5 leading-relaxed">
          Export your filled digital planner with all handwritten notes, custom stickers, habit checks, and washi tapes into a high-fidelity printable PDF.
        </p>

        {isExporting ? (
          <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#425248] animate-spin" />
            <span className="font-serif-title text-sm uppercase tracking-wider text-[#473c31]">
              {statusMessage || 'Processing PDF...'}
            </span>
          </div>
        ) : exportSuccess ? (
          <div className="py-8 text-center flex flex-col items-center justify-center gap-2 text-[#355c41]">
            <Check className="w-9 h-9 bg-[#e4ede7] p-1.5 rounded-full" />
            <span className="font-serif-title text-base font-semibold">
              PDF Downloaded Successfully!
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Option 1: Current Page High-Res PDF */}
            <button
              type="button"
              onClick={handleExportCurrentPage}
              className="w-full p-3.5 bg-white hover:bg-[#f6eee4] border border-[#d8cfc2] rounded-xs text-left transition-colors flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <div>
                <div className="font-serif-title text-sm font-semibold uppercase text-[#382f25] group-hover:text-[#211b14]">
                  Export Current Spread ({currentPageTitle})
                </div>
                <div className="text-[11px] font-handwriting text-[#786b5d]">
                  High-res 300-DPI snapshot with stickers, text &amp; layout
                </div>
              </div>
              <FileDown className="w-4 h-4 text-[#8a7969] group-hover:text-[#382f25]" />
            </button>

            {/* Option 2: Browser Print Dialog */}
            <button
              type="button"
              onClick={handleNativePrint}
              className="w-full p-3.5 bg-white hover:bg-[#f6eee4] border border-[#d8cfc2] rounded-xs text-left transition-colors flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <div>
                <div className="font-serif-title text-sm font-semibold uppercase text-[#382f25] group-hover:text-[#211b14]">
                  Print / Save via Browser (Ctrl+P / Cmd+P)
                </div>
                <div className="text-[11px] font-handwriting text-[#786b5d]">
                  Standard paper printout (Letter / A4)
                </div>
              </div>
              <Printer className="w-4 h-4 text-[#8a7969] group-hover:text-[#382f25]" />
            </button>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-[#ded7cc] flex items-center justify-between text-[11px] text-[#807264] font-mono">
          <span>Compatible with GoodNotes, Notability &amp; Print</span>
          <span>A4 Landscape</span>
        </div>
      </div>
    </div>
  );
};
