'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { notificationService } from '@/lib/services/notificationService';

const NotificationDropdown = ({ items = [], isLoading = false, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const hasItems = items && items.length > 0;

  const handleMarkAllRead = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await notificationService.deleteAll();
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error('전체 삭제 실패:', err);
      alert('알림 전체 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await notificationService.delete(id);
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error('알림 삭제 실패:', err);
      alert('알림 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-[320px] max-h-[420px] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-[15px] font-semibold text-gray-900">알림</p>
        <Button
          variant="solid"
          size="base"
          className="h-8 min-w-0 w-auto px-3 text-[13px] bg-brand-black text-white hover:bg-brand-black"
          onClick={handleMarkAllRead}
          disabled={isDeleting || !hasItems}
        >
          전체 읽음
        </Button>
      </div>
      {isLoading ? (
        <div className="px-4 py-6 text-center text-[14px] text-gray-500">
          로딩 중...
        </div>
      ) : hasItems ? (
        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item.id} className="relative px-4 py-3">
              <p className="pr-14 text-[14px] leading-5 text-gray-900 whitespace-pre-line">
                {item.message}
              </p>
              <p className="mt-2 text-[12px] text-gray-500">{item.date}</p>
              <button
                type="button"
                className="absolute right-2 top-2 text-[14px] text-gray-500 hover:text-gray-700 disabled:opacity-50"
                onClick={() => handleDelete(item.id)}
                disabled={isDeleting}
                aria-label="알림 삭제"
              >
                X
              </button>
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
