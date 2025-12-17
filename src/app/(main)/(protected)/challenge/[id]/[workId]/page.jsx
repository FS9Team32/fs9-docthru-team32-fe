import { notFound } from 'next/navigation';
import WorkDetail from './_component/WorkDetail';
import { tokenFetch, defaultFetch } from '@/lib/utils/fetchClient';

async function getWorkDetail(workId) {
  try {
    const workDetail = await tokenFetch(`/works/${workId}`);
    return workDetail;
  } catch (error) {
    console.error('작업물 로딩실패 (tokenFetch):', error);
    try {
      const workDetail = await defaultFetch(`/works/${workId}`);
      return workDetail;
    } catch (err) {
      console.error('작업물 로딩실패 (defaultFetch):', err);
      return null;
    }
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
