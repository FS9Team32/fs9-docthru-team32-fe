'use client';

import {
  APPLICATION_STATUS_TEXT,
  APPLICATION_STATUS_COLORS,
} from '@/constants/challengeConstants';

export default function StatusBanner({ status }) {
  if (!status || !APPLICATION_STATUS_TEXT[status]) return null;

  return (
    <div
      className={`w-full py-3 rounded-2xl font-medium text-[16px] text-center mb-6 border ${APPLICATION_STATUS_COLORS[status]}`}
    >
      {APPLICATION_STATUS_TEXT[status]}
    </div>
  );
}
