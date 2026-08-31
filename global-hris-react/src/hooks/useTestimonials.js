import { useCallback, useEffect, useState } from 'react';
import seedTestimonials from '../data/testimonials';

const STORAGE_KEY = 'ghris-shared-testimonials';

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function useTestimonials() {
  const [submitted, setSubmitted] = useState(readStored);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submitted)); } catch { /* storage unavailable */ }
  }, [submitted]);

  const addTestimonial = useCallback(({ name, role, org, quote, rating }) => {
    const entry = { id: crypto.randomUUID(), name: name.trim(), role: role?.trim() || '', org: org?.trim() || '', quote: quote.trim(), rating: Math.min(5, Math.max(1, Number(rating) || 5)), createdAt: Date.now(), source: 'you' };
    setSubmitted((previous) => [entry, ...previous]);
    return entry;
  }, []);

  const removeTestimonial = useCallback((id) => setSubmitted((previous) => previous.filter((item) => item.id !== id)), []);
  const combined = [...submitted, ...seedTestimonials.map((item, index) => ({ ...item, id: `seed-${index}`, source: 'seed' }))];
  return { combined, addTestimonial, removeTestimonial };
}
