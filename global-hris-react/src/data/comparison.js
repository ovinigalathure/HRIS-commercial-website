// Competitive comparison — rendered as a card grid (not an HTML table).
const comparison = {
  columns: ['Global HRIS', 'Legacy Local Systems', 'Global SaaS'],
  rows: [
    {
      feature: 'Self-Customizable Business Logic',
      values: ['Full admin control', 'Requires custom code', 'Fixed global rules'],
      states: ['good', 'bad', 'bad'],
    },
    {
      feature: 'Localized Statutory Engine (Dual-Act / Tax)',
      values: ['Native, out-of-the-box', 'Native', 'High custom cost'],
      states: ['good', 'good', 'bad'],
    },
    {
      feature: 'Trilingual Interfaces & Encrypted Payslips',
      values: ['Native (EN / SI / TA)', 'Paid add-on', 'English dominant'],
      states: ['good', 'neutral', 'bad'],
    },
    {
      feature: 'Biometric & High-Security Kiosks',
      values: ['Native hardware sync', 'Third-party plugins', 'Web/app only'],
      states: ['good', 'neutral', 'bad'],
    },
    {
      feature: 'Canteen Meal Barcode Tracking',
      values: ['Built-in module', 'Separate software', 'Not supported'],
      states: ['good', 'bad', 'bad'],
    },
    {
      feature: 'Implementation Speed',
      values: ['4 weeks – 4 months', '3 – 6 months', '1 – 2 months'],
      states: ['good', 'bad', 'neutral'],
    },
    {
      feature: 'Modern Tech Stack',
      values: ['.NET 8 / Angular 17 / Azure', 'Legacy architecture', 'Modern'],
      states: ['good', 'bad', 'neutral'],
    },
  ],
};

export default comparison;
