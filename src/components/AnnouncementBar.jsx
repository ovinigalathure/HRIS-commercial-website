import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '../context/ModalContext';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const { openTrial } = useModal();

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-navy-950 via-royal-600 to-navy-950 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
        <Sparkles className="h-4 w-4 text-cyan-300 shrink-0" />
        <p className="truncate">
          Now with AI-enhanced OCR &amp; biometric sync —{' '}
          <button type="button" onClick={openTrial} className="font-semibold underline underline-offset-2 decoration-cyan-300 hover:text-cyan-300 transition-colors">
            start your free trial
          </button>
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 sm:right-6 lg:right-8 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
