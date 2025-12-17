import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import ChallengeDetailView from '@/components/ChallengeDetailView';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getUserRole(token) {
  if (!token) return 'USER';
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!res.ok) return 'USER';

    const data = await res.json();
    return data.role || 'USER';
  } catch (e) {
    console.error('Role check failed:', e);
    return 'USER';
  }
}

async function getApplicationDetail(applicationId) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const apiUrl = `${BASE_URL}/challenge-applications/${applicationId}`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}

async function getUserInfoById(userId) {
  if (!userId) return null;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const apiUrl = `${BASE_URL}/users/${userId}`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('User fetch error:', error);
    return null;
  }
}

async function updateApplicationStatus(applicationId, status, reason) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const apiUrl = `${BASE_URL}/challenge-applications/${applicationId}`;

  const res = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      status: status,
      adminFeedback: reason,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || '상태 변경 실패');
  }

  return await res.json();
}

export default async function AdminApplyPage({ params }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const role = await getUserRole(token);
  if (role !== 'ADMIN') {
    redirect('/');
  }

  const data = await getApplicationDetail(id);

  if (!data) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-2">
          존재하지 않거나 삭제된 신청서입니다.
        </h2>
      </div>
    );
  }

  if (data.userId && (!data.user || !data.user.nickname)) {
    const userInfo = await getUserInfoById(data.userId);

    if (userInfo) {
      data.user = { ...data.user, ...userInfo };
    }
  }

  console.log('Final Data passed to View:', JSON.stringify(data, null, 2));

  async function handleStatusUpdate(status, reason) {
    'use server';
    try {
      await updateApplicationStatus(id, status, reason);
      revalidatePath(`/admin/apply/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ChallengeDetailView
      data={data}
      mode="ADMIN"
      onUpdateStatus={handleStatusUpdate}
    />
  );
}
