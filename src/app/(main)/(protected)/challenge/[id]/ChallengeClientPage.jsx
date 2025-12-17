'use client';

import { useAuth } from '@/providers/AuthProvider';
import ChallengeDetailView from './ChallengeDetail';
import MyChallengeDetail from '@/app/(main)/(protected)/my/(apply)/[id]/MyChallengeDetail';

export default function ChallengeClientPage({
  initialData,
  worksList = [],
  isAdmin,
}) {
  const { user } = useAuth();

  if (isAdmin) {
    return (
      <div className="w-full bg-white min-h-screen">
        <MyChallengeDetail data={initialData} mode="ADMIN" />
      </div>
    );
  }

  const userId = user?.id;
  let myWorkId = null;

  if (userId && worksList.length > 0) {
    const myWork = worksList.find((work) => {
      const wId = work.workerId || work.worker?.id;
      return String(wId) === String(userId);
    });
    if (myWork) myWorkId = myWork.id;
  }

  const mergedData = {
    ...initialData,
    currentParticipants:
      initialData.currentParticipants ?? initialData._count?.works ?? 0,
    works: worksList,
    myWorkId: myWorkId,
    status: initialData.status || 'PENDING',
  };

  return <ChallengeDetailView data={mergedData} />;
}
