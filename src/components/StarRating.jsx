import { Star } from 'lucide-react';

export default function StarRating({ value = 5, onChange, readOnly = false, size = 18 }) {
  const stars = [1, 2, 3, 4, 5];
  if (readOnly) return <div className="flex gap-0.5" aria-label={`Rated ${value} out of 5`}>{stars.map((number) => <Star key={number} size={size} className={number <= value ? 'fill-accent-400 text-accent-400' : 'text-slate-300 dark:text-slate-600'} />)}</div>;
  return <div className="flex gap-1" role="radiogroup" aria-label="Rating">{stars.map((number) => <button key={number} type="button" role="radio" aria-checked={number === value} aria-label={`Rate ${number} out of 5`} onClick={() => onChange(number)} className="p-0.5 transition-transform hover:scale-110"><Star size={size + 4} className={number <= value ? 'fill-accent-400 text-accent-400' : 'text-slate-300 dark:text-slate-600'} /></button>)}</div>;
}
