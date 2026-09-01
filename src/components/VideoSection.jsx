import { Clock, PlayCircle } from 'lucide-react';
import videos from '../data/videos';
import { useModal } from '../context/ModalContext';
import DashboardMock from './DashboardMock';
import Reveal from './Reveal';

function VideoPoster({ video, featured }) {
  const { openVideo } = useModal();

  return (
    <button
      type="button"
      onClick={() => openVideo(video)}
      className={`group relative w-full overflow-hidden rounded-3xl text-left transition-all duration-500 hover:-translate-y-1.5 ${featured ? 'aspect-[16/10]' : 'aspect-video'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900">
        {video.src ? (
          <video
            src={video.src}
            muted
            autoPlay
            loop
            playsInline
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center overflow-hidden">
            <div className="scale-[0.55] opacity-80 transition-opacity duration-500 group-hover:opacity-95 sm:scale-[0.7]">
              <DashboardMock className="pointer-events-none" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
      </div>

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-royal-600 shadow-2xl transition-transform duration-300 group-hover:scale-110">
          <PlayCircle className="h-8 w-8" strokeWidth={1.5} />
        </span>
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-sm font-bold text-white sm:text-base">{video.title}</h3>
        <p className="mt-1 text-xs text-slate-300 line-clamp-3">{video.description}</p>
      </div>
    </button>
  );
}

export default function VideoSection() {
  const [featured, ...rest] = videos;

  return (
    <section id="videos" className="section-pad relative section-tint dark:bg-navy-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">Watch the Product Demo</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold"><span className="text-gradient-topic">See Global HRIS in action</span></h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 inline-flex items-center gap-2">
            <Clock className="h-4 w-4" /> Full walkthrough videos are being finalised — check back soon, or book a live demo below.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2">
            <VideoPoster video={featured} featured />
          </Reveal>
          <div className="grid gap-6">
            {rest.map((v, i) => (
              <Reveal key={v.id} delay={(i + 1) * 90}>
                <VideoPoster video={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
