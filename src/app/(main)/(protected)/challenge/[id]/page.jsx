import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import ChallengeClientPage from './ChallengeClientPage';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getUserRole(token) {
  if (!token) return 'USER';
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });
    return res.ok ? (await res.json()).role : 'USER';
  } catch {
    return 'USER';
  }
}

async function getChallengeData(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const role = await getUserRole(token);
  const isAdmin = role === 'ADMIN';

  const mainUrl = `${BASE_URL}/challenges/${id}`;

  try {
    const requests = [
      fetch(mainUrl, { headers, cache: 'no-store' }),
      fetch(`${BASE_URL}/challenges/${id}/works?page=1&limit=100`, {
        headers,
        cache: 'no-store',
      }),
    ];

    const [challengeRes, worksRes] = await Promise.all(requests);

    if (challengeRes.status === 401) return { redirect: '/login' };
    if (!challengeRes.ok)
      throw new Error(`Fetch failed: ${challengeRes.status}`);

    const challengeData = await challengeRes.json();
    const worksList = worksRes?.ok ? (await worksRes.json()).list : [];

    return {
      challengeData: { ...challengeData, mode: role },
      worksList: Array.isArray(worksList) ? worksList : [],
      isAdmin,
    };
  } catch (error) {
    console.error('Data Fetch Error:', error);
    return null;
  }
}

export default async function ChallengePage({ params }) {
  const { id } = await params;
  const result = await getChallengeData(id);

  if (result?.redirect) redirect(result.redirect);
  if (!result) return <div className="p-20 text-center">데이터 없음</div>;

  async function handleUpdateStatus(newStatus, adminFeedback) {
    'use server';
  }

  return (
    <ChallengeClientPage
      initialData={result.challengeData}
      worksList={result.worksList}
      isAdmin={result.isAdmin}
      onUpdateStatus={handleUpdateStatus}
    />
  );
}
