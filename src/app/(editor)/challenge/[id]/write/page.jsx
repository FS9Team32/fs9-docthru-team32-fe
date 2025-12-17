import { notFound, redirect } from 'next/navigation';
import EditorForm from '../[workId]/editor/_component/EditorForm';
import { tokenFetch } from '@/lib/utils/fetchClient';
export default async function CreatePage({ params }) {
  const { id: challengeId } = await params;

  let challenge = null;
  try {
    challenge = await tokenFetch(`/challenges/${challengeId}`);
  } catch (error) {
    console.error('챌린지 정보 로딩 실패:', error);
    if (error.message.includes('401') || error.message.includes('token')) {
      redirect('/login');
    }
  }

  if (!challenge) {
    notFound();
  }

  return <EditorForm challengeId={challengeId} initialChallenge={challenge} />;
}
