import { cn } from '@/lib/util';

export default function CategoryChip({ children, className: cls, ...props }) {
  const className = cn(
    'bg-white block border-none rounded-[26px] items-center justify-center w-auto leading-6.5 py-1.5 px-9',
    cls,
  );
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
