'use client';

import { useAuth } from '@/providers/AuthProvider';
import MyChallengeContainer from './_components/MyChallengeContainer';

export default function MyChallengePage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] px-4 py-8 bg-[#FAFAFA]">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-xl font-semibold leading-none text-gray-900">
          {isAdmin ? '챌린지 신청 관리' : '나의 챌린지'}
        </h1>
        <MyChallengeContainer isAdmin={isAdmin} />
      </div>
    </div>
  );
}
