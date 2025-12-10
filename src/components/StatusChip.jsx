import { cn } from '@/lib/util';

{
  /*
  사용법
<StatusChip type="PENDING" />
<StatusChip type="APPROVED" />
<StatusChip type="REJECTED" />
<StatusChip type="DELETED" />
  */
}

const CATEGORY_TEXT = {
  PENDING: '승인 대기',
  APPROVED: '신청 승인',
  REJECTED: '신청 거절',
  DELETED: '챌린지 삭제',
};
const CATEGORY_COLORS = {
  PENDING: 'bg-[#FFFDE7] text-[#F2BC00]',
  REJECTED: 'bg-[#FFF0F0] text-[#E54946]',
  APPROVED: 'bg-[#DFF0FF] text-[#4095DE]',
  DELETED: 'bg-gray-200 text-gray-500',
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
