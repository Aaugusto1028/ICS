/** Íconos simples (SVG de trazo) para cada actividad. Usan currentColor. */
const props = { viewBox: '0 0 32 32', width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export function IconoActividad({ id }) {
  switch (id) {
    case 'tirolesa':
      return (
        <svg {...props}>
          <path d="M3 6 29 14" />
          <circle cx="16" cy="10" r="1.6" />
          <path d="M16 11.6v5" />
          <circle cx="16" cy="19" r="2" />
          <path d="M16 21v4m-3 3 3-3 3 3m-6-6h6" />
        </svg>
      );
    case 'safari':
      return (
        <svg {...props}>
          <circle cx="10" cy="19" r="5" />
          <circle cx="22" cy="19" r="5" />
          <path d="M15 19h2M8 14l2-6h3l1 6m10 0-2-6h-3l-1 6" />
        </svg>
      );
    case 'palestra':
      return (
        <svg {...props}>
          <path d="M3 28 13 8l6 10 3-4 7 14Z" />
          <circle cx="11" cy="15" r="1" fill="currentColor" />
          <circle cx="16" cy="20" r="1" fill="currentColor" />
          <circle cx="23" cy="22" r="1" fill="currentColor" />
        </svg>
      );
    case 'jardineria':
      return (
        <svg {...props}>
          <path d="M16 29V15" />
          <path d="M16 17c-6 0-9-4-9-10 6 0 9 4 9 10Z" />
          <path d="M16 21c5 0 8-3 8-8-5 0-8 3-8 8Z" />
          <path d="M9 29h14" />
        </svg>
      );
    default:
      return null;
  }
}
