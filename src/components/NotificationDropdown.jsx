'use client';

const NotificationDropdown = ({ items }) => {
  const hasItems = items && items.length > 0;

  return (
    <div className="absolute right-0 mt-2 w-[320px] max-h-[420px] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="px-4 py-3">
        <p className="text-[15px] font-semibold text-gray-900">알림</p>
      </div>
      {hasItems ? (
        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item.id} className="px-4 py-3">
              <p className="text-[14px] leading-5 text-gray-900 whitespace-pre-line">
                {item.message}
              </p>
              <p className="mt-2 text-[12px] text-gray-500">{item.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-6 text-center text-[14px] text-gray-500">
          알림이 없습니다.
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
