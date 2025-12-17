'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
    >
      목록으로 돌아가기
    </button>
  );
}
