'use client';

import { useState, useEffect, useMemo } from 'react';
import MyChallengeCard from './MyChallengeCard';
import { challengeService } from '@/lib/services/challenge/challengeService';
import { CHALLENGE_STATUS } from '@/constants/challengeConstants';

const EmptyState = ({ message, textColor = 'text-gray-400' }) => (
  <div className="flex min-h-[400px] items-center justify-center">
    <p className={textColor}>{message}</p>
  </div>
);

export default function CompletedChallengesTab() {
  const [allChallenges, setAllChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchChallenges = async () => {
      try {
        const response = await challengeService.getMyChallenges();
        const data = response?.list || [];
        setAllChallenges(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || '완료한 챌린지를 불러오는데 실패했습니다.');
        setAllChallenges([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  // 완료: status가 CLOSED
  const challenges = useMemo(() => {
    return allChallenges.filter(
      (challenge) => challenge.status === CHALLENGE_STATUS.CLOSED,
    );
  }, [allChallenges]);

  if (isLoading) {
    return <EmptyState message="로딩 중..." textColor="text-gray-500" />;
  }

  if (error) {
    return <EmptyState message={error} textColor="text-red-500" />;
  }

  if (challenges.length === 0) {
    return <EmptyState message="완료한 챌린지가 없어요." />;
  }

  return (
    <div className="flex flex-col gap-6">
      {challenges.map((challenge) => (
        <MyChallengeCard
          key={challenge.id}
          challenge={challenge}
          type="completed"
        />
      ))}
    </div>
  );
}
