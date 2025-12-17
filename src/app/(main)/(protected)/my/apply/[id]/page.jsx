import { cookies } from 'next/headers';
import ChallengeDetailView from './MyChallengeDetail';

async function getApplicationDetail(applicationId) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/challenge-applications/${applicationId}`;

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
export default async function Page({ params }) {
  const { id } = await params;

  const data = await getApplicationDetail(id);

  if (!data) {
    return (
      <div className="p-10 text-center =">
        <h2 className="text-xl font-semibold  font=mb-2">
          이미 삭제된 신청서입니다.
        </h2>
      </div>
    );
  }

  return <ChallengeDetailView data={data} mode="USER" />;
}
