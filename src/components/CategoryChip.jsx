import { cn } from '@/lib/util';

export default function CategoryChip({ children, className: cls, ...props }) {
  const className = cn(
    'bg-white block rounded-lg items-center justify-center w-auto leading-6.5  h-10 px-2.5 py-0.5 text-gray-700 font-medium border',
    cls,
  );
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
