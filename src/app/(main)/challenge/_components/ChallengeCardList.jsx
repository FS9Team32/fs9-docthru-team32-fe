'use client';

import ChallengeCard from './ChallengeCard';

export default function ChallengeCardList({ challenges = [], onDelete }) {
  if (challenges.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-gray-900">아직 챌린지가 없어요.</p>
          <p className="text-gray-900">지금 바로 챌린지를 신청해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
