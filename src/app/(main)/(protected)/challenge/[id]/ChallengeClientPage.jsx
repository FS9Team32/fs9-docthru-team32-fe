'use client';

import { useAuth } from '@/providers/AuthProvider';
import ChallengeDetailView from './ChallengeDetail';

export default function ChallengeClientPage({
  initialData,
  worksList = [],
  isAdmin,
}) {
  const { user } = useAuth();

  const userId = user?.id;
  let myWorkId = null;

  console.log('=== ChallengeClientPage 디버깅 ===');
  console.log('1. 로그인된 유저 ID:', userId);

  if (userId && worksList.length > 0) {
    console.log('🔥 데이터 구조 확인:', worksList[0]);

    const myWork = worksList.find((work) => {
      const wId = work.workerId || work.worker?.id;
      return String(wId) === String(userId);
    });

    if (myWork) {
      myWorkId = myWork.id;
    } else {
    }
  }

  const mergedData = {
    ...initialData,
    currentParticipants:
      initialData.currentParticipants ?? initialData._count?.works ?? 0,
    works: worksList,
    myWorkId: myWorkId,
    status: initialData.status || 'PENDING',
  };

  return <ChallengeDetailView data={mergedData} isAdmin={isAdmin} />;
}
