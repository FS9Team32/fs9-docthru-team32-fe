'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function patchApplicationStatus(
  applicationId,
  status,
  adminFeedback,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) throw new Error('Unauthorized');

  const res = await fetch(
    `${BASE_URL}/challenge-applications/${applicationId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        adminFeedback,
      }),
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`PATCH failed: ${res.status} ${msg}`);
  }

  return res.json().catch(() => ({}));
}

export async function toggleWorkLike(workId, isLiked, challengeId) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  const method = isLiked ? 'DELETE' : 'POST';

  try {
    const res = await fetch(`${BASE_URL}/works/${workId}/likes`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || '좋아요 처리 실패');
    }

    revalidatePath(`/challenge/${challengeId}`);

    return { success: true };
  } catch (error) {
    console.error('Like Toggle Error:', error);
    return { success: false, message: error.message };
  }
}
