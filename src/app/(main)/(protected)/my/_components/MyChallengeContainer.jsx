'use client';

import { useState } from 'react';
import MyChallengeTabs from './MyChallengeTabs';
import AppliedChallengesTab from './AppliedChallengesTab';
import InProgressChallengesTab from './InProgressChallengesTab';
import CompletedChallengesTab from './CompletedChallengesTab';

export default function MyChallengeContainer({ isAdmin = false }) {
  const [activeTab, setActiveTab] = useState('신청한 챌린지');

  const renderTabContent = () => {
    switch (activeTab) {
      case '신청한 챌린지':
        return <AppliedChallengesTab isAdmin={isAdmin} />;
      case '참여중인 챌린지':
        return <InProgressChallengesTab />;
      case '완료한 챌린지':
        return <CompletedChallengesTab />;
      default:
        return null;
    }
  };

  // 어드민일 때는 탭 숨기고 AppliedChallengesTab만 표시
  if (isAdmin) {
    return <AppliedChallengesTab isAdmin={isAdmin} />;
  }

  return (
    <>
      <MyChallengeTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </>
  );
}
