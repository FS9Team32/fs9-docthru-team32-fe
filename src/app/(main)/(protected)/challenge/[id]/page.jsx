import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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

  const mainUrl = isAdmin
    ? `${BASE_URL}/challenge-applications/${id}`
    : `${BASE_URL}/challenges/${id}`;

  try {
    const requests = [fetch(mainUrl, { headers, cache: 'no-store' })];
    if (!isAdmin) {
      requests.push(
        fetch(`${BASE_URL}/challenges/${id}/works?page=1&limit=100`, {
          headers,
          cache: 'no-store',
        }),
      );
    }

    const [challengeRes, worksRes] = await Promise.all(requests);

    if (challengeRes.status === 401) return { redirect: '/login' };
    if (!challengeRes.ok) throw new Error('Failed to fetch data');

    const challengeData = await challengeRes.json();

    const worksList = worksRes?.ok ? (await worksRes.json()).list : [];

    return {
      challengeData: { ...challengeData, mode: role },
      worksList: Array.isArray(worksList) ? worksList : [],
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ChallengePage({ params }) {
  const { id } = await params;
  const result = await getChallengeData(id);

  if (result?.redirect) redirect(result.redirect);

  if (!result) {
    return (
      <div className="py-20 text-center text-gray-500">
        챌린지 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <ChallengeClientPage
      initialData={result.challengeData}
      worksList={result.worksList}
      isAdmin={result.challengeData.mode === 'ADMIN'}
      challengeId={id}
    />
  );
}
