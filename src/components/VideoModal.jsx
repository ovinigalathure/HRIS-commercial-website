import { PlayCircle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

export default function VideoModal() {
  const { videoOpen, closeVideo, openDemo } = useModal();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!videoOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeVideo();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [videoOpen, closeVideo]);

  if (!videoOpen) return null;

  const hasSrc = Boolean(videoOpen.src);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={videoOpen.title}
    >
      <button
        type="button"
        aria-label="Close video"
        onClick={closeVideo}
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl glass-strong rounded-3xl overflow-hidden outline-none animate-[fadeIn_.3s_ease]"
      >
        <button
          type="button"
          onClick={closeVideo}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/60 text-white hover:bg-navy-950/80 transition-colors"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {hasSrc ? (
          <div className="aspect-video bg-black">
            <video src={videoOpen.src} controls autoPlay className="h-full w-full" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 flex flex-col items-center justify-center text-center px-8">
            <PlayCircle className="h-14 w-14 text-electric-400 mb-4" strokeWidth={1.3} />
            <h3 className="font-display text-lg font-bold text-white">{videoOpen.title}</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-sm">
              This product video is being finalised. In the meantime, book a live walkthrough with our team.
            </p>
            <button type="button" onClick={() => { closeVideo(); openDemo(); }} className="btn-primary mt-6">
              Book a Live Demo
            </button>
          </div>
        )}

        {hasSrc && (
          <div className="p-5">
            <h3 className="font-display font-bold text-navy-900 dark:text-white">{videoOpen.title}</h3>
            {videoOpen.description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{videoOpen.description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
