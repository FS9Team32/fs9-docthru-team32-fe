import { cn } from '@/lib/util';
import { CATEGORY_TEXT } from '@/constants/challengeConstants';

//<TypeChip type="Modern" />
//<TypeChip type="Next" />
export const CATEGORY_COLORS = {
  Next: 'bg-[#79e16a]',
  API: 'bg-[#FF905E]',
  Career: 'bg-[#7EB2EE]',
  Modern: 'bg-[#F66E6B]',
  Web: 'bg-[#F7EA5D]',
};
export default function TypeChip({ children, type, className: cls, ...props }) {
  const chipContent = type ? CATEGORY_TEXT[type] : children;
  const typeClass = type ? CATEGORY_COLORS[type] : '';

  const className = cn(
    'px-3 py-0.75 items-center justify-center rounded-lg gap-2.5 ',
    typeClass,
    cls,
  );
  return (
    <button {...props} className={className}>
      {chipContent}
    </button>
  );
}

TypeChip.type = CATEGORY_COLORS;
TypeChip.text = CATEGORY_TEXT;
