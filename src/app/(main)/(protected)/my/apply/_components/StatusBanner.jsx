const USER_STATUS_MAP = {
  DELETED: '삭제된 챌린지입니다',
  PENDING: '승인 대기 중입니다.',
  REJECTED: '신청이 거절되었습니다',
  APPROVED: '신청이 승인되었습니다',
};

const STATUS_COLORS = {
  DELETED: 'border-red-300 text-red-700 bg-red-100',
  PENDING: 'border-yellow-300 text-yellow-700 bg-yellow-100',
  REJECTED: 'border-red-300 text-red-700 bg-red-100',
  APPROVED: 'border-blue-300 text-blue-700 bg-blue-100',
};

export default function StatusBanner({ status, isAdmin = false }) {
  if (!status) return null;

  if (isAdmin && status === 'PENDING') {
    return null;
  }

  let message = USER_STATUS_MAP[status] || null;

  if (isAdmin) {
    if (status === 'REJECTED') {
      message = '신청이 거절된 챌린지입니다.';
    } else if (status === 'APPROVED') {
      message = '신청이 승인된 챌린지입니다.';
    }
  }

  if (!message) return null;

  const colorClass =
    STATUS_COLORS[status] || 'border-gray-200 text-gray-700 bg-gray-50';

  return (
    <div
      className={`w-full py-3 rounded-2xl font-medium text-[16px] text-center mb-6 border ${colorClass}`}
    >
      {message}
    </div>
  );
}
