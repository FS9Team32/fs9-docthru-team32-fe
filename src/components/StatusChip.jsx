import { cn } from '@/lib/util';
import {
  APPLICATION_STATUS_TEXT,
  APPLICATION_STATUS_COLORS,
} from '@/constants/challengeConstants';

{
  /*
  사용법
<StatusChip type="PENDING" />
<StatusChip type="APPROVED" />
<StatusChip type="REJECTED" />
<StatusChip type="DELETED" />
  */
}

export default function StatusChip({
  children,
  type,
  className: cls,
  ...props
}) {
  const chipContent = type ? APPLICATION_STATUS_TEXT[type] : children;
  const typeClass = type ? APPLICATION_STATUS_COLORS[type] : '';

  const className = cn(
    'px-2 py-1 items-center justify-center rounded-l-sm ',
    typeClass,
    cls,
  );
  return (
    <button {...props} className={className}>
      {chipContent}
    </button>
  );
}
