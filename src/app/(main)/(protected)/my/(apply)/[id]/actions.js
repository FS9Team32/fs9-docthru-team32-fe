'use server';

import { cookies } from 'next/headers';

export async function cancelApplication(applicationId) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const cookieHeader = cookieStore;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/challenge-applications/${applicationId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: 'no-store',
    },
  );

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || `취소 실패 (${res.status})`);
  }

  return true;
}
