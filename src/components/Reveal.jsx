import useReveal from '../hooks/useReveal';

/**
 * Wraps children in a scroll-reveal container.
 * variant: 'up' (default, translateY) | 'scale'
 */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, variant = 'up', ...rest }) {
  const ref = useReveal();
  const variantClass = {
    up: 'reveal',
    scale: 'reveal-scale',
    left: 'reveal-left',
    right: 'reveal-right',
    rotate: 'reveal-rotate',
  }[variant] ?? 'reveal';
  const base = variantClass;
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag ref={ref} className={`${base} ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
