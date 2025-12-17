import { notFound, redirect } from 'next/navigation';
import EditorForm from './_component/EditorForm';
import { tokenFetch } from '@/lib/utils/fetchClient';

export default async function EditPage({ params }) {
  const { id: challengeId, workId } = await params;

  let challenge = null;
  let work = null;

  try {
    challenge = await tokenFetch(`/challenges/${challengeId}`);

    if (workId) {
      work = await tokenFetch(`/works/${workId}`);
    }
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
    if (error.message.includes('401') || error.message.includes('token')) {
      redirect('/login');
    }
  }

  if (!challenge || !work) {
    notFound();
  }

  return (
    <EditorForm
      challengeId={challengeId}
      workId={workId}
      initialChallenge={challenge}
      initialWork={work}
    />
  );
}
