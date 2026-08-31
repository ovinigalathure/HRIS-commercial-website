// ============================================================
// Product videos.
// No product video files/links were included in the supplied content —
// so this ships with placeholder entries only (poster art, no fake
// video source). Swap `src` for a real MP4/YouTube/Vimeo URL and this
// section + the modal will work immediately, no other code changes needed.
// ============================================================
const videos = [
  {
    id: 'overview',
    title: 'Global HRIS — Platform Walkthrough',
    description: 'A guided tour of the dashboard, employee master, attendance engine and payroll run — coming soon.',
    duration: null,
    src: null, // TODO: add real video URL (mp4 / YouTube / Vimeo embed)
    featured: true,
  },
  {
    id: 'payroll',
    title: 'Running a Statutory Payroll Cycle',
    description: 'See a full payroll run from draft to finalised payslips.',
    duration: null,
    src: null,
    featured: false,
  },
  {
    id: 'attendance',
    title: 'Biometric Attendance in Action',
    description: 'Live punch sync from a Hikvision terminal to the attendance dashboard.',
    duration: null,
    src: null,
    featured: false,
  },
];

export default videos;
