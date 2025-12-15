export default function ReasonBox({ status, message, date }) {
  if (status === 'PENDING' || status === 'APPROVED') return null;

  if (!message) return null;

  const title = status === 'REJECTED' ? '신청 거절 사유' : '삭제 사유';

  const formatDateTime = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';

    const yy = String(d.getFullYear()).slice(2);
    const MM = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');

    return `${yy}/${MM}/${dd} ${hh}:${mm}`;
  };

  const dateStr = formatDateTime(date);

  return (
    <div className="mb-10 w-full">
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-8 py-6 text-sm">
        <h3 className="mb-3 text-center text-sm font-semibold text-gray-800">
          {title}
        </h3>

        <p className="font-normal text-center text-gray-700">{message}</p>

        <div className="mt-4 flex justify-end text-sm text-gray-500">
          <span className="mr-2">독스루 운영진</span>
          {dateStr && <span>{dateStr}</span>}
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-gray-200" />
    </div>
  );
}
