'use client';

import Image from 'next/image';
import icArrowRight from '@/assets/ic_arrow_right.svg';

export default function ContinueChallengeBadge({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 transition-colors hover:bg-gray-50"
    >
      <span className="text-sm font-medium text-gray-700">도전 계속하기</span>
      <Image
        src={icArrowRight}
        alt="화살표"
        width={16}
        height={16}
        className="h-4 w-4"
      />
    </button>
  );
}
