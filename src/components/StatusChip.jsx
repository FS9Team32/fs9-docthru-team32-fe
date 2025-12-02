import { cn } from '@/lib/util';

{
  /*
  사용법
<StatusChip type="wait" />
<StatusChip type="accept" />
<StatusChip type="reject" />
<StatusChip type="delete" />
  */
}

const CATEGORY_TEXT = {
  wait: '승인대기',
  accept: '신청 승인',
  reject: '신청 거절',
  delete: '첼린지 삭제',
};
const CATEGORY_COLORS = {
  wait: 'bg-[#FFFDE7] text-[#F2BC00]',
  reject: 'bg-[#FFF0F0] text-[#E54946]',
  accept: 'bg-[#DFF0FF] text-[#4095DE]',
  delete: 'bg-gray-200 text-gray-500',
};

export default function StatusChip({
  children,
  type,
  className: cls,
  ...props
}) {
  const chipContent = type ? CATEGORY_TEXT[type] : children;
  const typeClass = type ? CATEGORY_COLORS[type] : '';

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
