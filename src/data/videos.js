// ============================================================
// Product videos.
// ============================================================
import mainWithVoice from '../assets/images/main with voice.mp4';
import features from '../assets/images/features.mp4';
import mainWithoutVoice from '../assets/images/main without voice.mp4';

const videos = [
  {
    id: 'overview',
    title: 'Global HRIS — Platform Walkthrough',
    description: 'A guided tour of the dashboard, employee master, attendance engine and payroll run.',
    duration: null,
    src: mainWithVoice,
    featured: true,
  },
  {
    id: 'features',
    title: 'Global HRIS — Features',
    description: 'A closer look at the key features powering the platform.',
    duration: null,
    src: features,
    featured: false,
  },
  {
    id: 'overview-mute',
    title: 'Global HRIS — Platform Walkthrough',
    description: 'The full platform walkthrough, ready to explore.',
    duration: null,
    src: mainWithoutVoice,
    featured: false,
  },
];

export default videos;
