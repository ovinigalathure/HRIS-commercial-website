import { useCallback, useRef, useState } from 'react';

export default function useTilt({ max = 6, glow = true } = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = useCallback((event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg)`,
      ...(glow ? { '--spot-x': `${px * 100}%`, '--spot-y': `${py * 100}%` } : {}),
    });
  }, [max, glow]);

  const onMouseLeave = useCallback(() => setStyle({}), []);

  return { ref, style, onMouseMove, onMouseLeave };
}
