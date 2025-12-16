'use client';

import Image from 'next/image';
import iconList from '@/assets/icon_list.svg';

export default function ViewMyWorkBadge({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 shadow-sm transition-colors hover:bg-gray-50"
    >
      <span className="text-sm font-medium text-gray-700">내 작업물 보기</span>
      <Image
        src={iconList}
        alt="메뉴"
        width={16}
        height={16}
        className="h-4 w-4"
      />
    </button>
  );
}
