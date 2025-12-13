import { notFound } from 'next/navigation';
import WorkDetail from './_component/WorkDetail';

async function getWorkDetail(workId) {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/works/${workId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Fetch Error: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('작업물 로딩실패', error);
    return null;
  }
}
export default async function WorkDetailPage({ params }) {
  const { id, workId } = await params;
  const workDetail = await getWorkDetail(workId);

  if (!workDetail) {
    notFound();
  }
  return <WorkDetail params={{ id, workId }} POST_DATA={workDetail} />;
}
