import { Mail, Plus } from 'lucide-react';
import { useState } from 'react';
import faqs from '../data/faqs';
import { useModal } from '../context/ModalContext';
import Reveal from './Reveal';

function FAQItem({ item, isOpen, onToggle }) {
  return <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${isOpen ? 'glass-strong shadow-[0_16px_40px_-22px_rgba(59,130,246,0.55)]' : 'glass-card'}`}><span className={`absolute left-0 top-0 h-full w-1 bg-linear-to-b from-royal-600 via-electric-500 to-cyan-400 transition-transform duration-500 ${isOpen ? 'scale-y-100' : 'scale-y-0'}`} /><button type="button" onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"><span className="font-semibold text-sm text-navy-900 dark:text-white sm:text-base">{item.q}</span><Plus className={`h-5 w-5 shrink-0 text-electric-500 transition-transform duration-400 ${isOpen ? 'rotate-45' : ''}`} /></button><div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}><div className="overflow-hidden"><p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.a}</p></div></div></div>;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { openTrial, openFaq } = useModal();
  const midpoint = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)];
  return <section id="faq" className="section-pad relative section-tint dark:bg-navy-900/40"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><Reveal className="text-center"><span className="eyebrow justify-center">Questions</span><h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl"><span className="text-gradient-topic">Frequently asked questions</span></h2></Reveal><div className="mt-12 grid gap-3 lg:grid-cols-2 lg:gap-5">{columns.map((column, columnIndex) => <div key={columnIndex} className="space-y-3">{column.map((item, itemIndex) => { const index = columnIndex * midpoint + itemIndex; return <Reveal key={item.q} delay={index * 40} variant={columnIndex ? 'right' : 'left'}><FAQItem item={item} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? -1 : index)} /></Reveal>; })}</div>)}</div><Reveal delay={240} className="glass-panel mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl px-6 py-6 text-center sm:flex-row sm:text-left"><div><h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">Still have questions?</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Our team can walk you through the platform.</p></div><div className="flex flex-wrap justify-center gap-3"><button type="button" onClick={openTrial} className="btn-primary">Start Free Trial</button><button type="button" onClick={openFaq} className="btn-secondary"><Mail className="h-4 w-4" /> Contact us</button></div></Reveal></div></section>;
}
