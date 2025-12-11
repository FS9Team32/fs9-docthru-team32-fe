'use client';

import { useState, useEffect } from 'react';
import MyChallengeTabs from './MyChallengeTabs';
import ApplicationTable from './ApplicationTable';

// 공통 레이아웃 컴포넌트
const EmptyState = ({ message, textColor = 'text-gray-400' }) => (
  <div className="flex min-h-[400px] items-center justify-center">
    <p className={textColor}>{message}</p>
  </div>
);

export default function MyChallengeContainer() {
  const [activeTab, setActiveTab] = useState('신청한 챌린지');
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: API 개발 완료 후 useEffect에서 API 호출 로직 추가
  // useEffect(() => {
  //   fetchApplications();
  // }, [activeTab]);

  return (
    <>
      <MyChallengeTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {isLoading && (
        <EmptyState message="로딩 중..." textColor="text-gray-500" />
      )}
      {!isLoading && error && (
        <EmptyState message={error} textColor="text-red-500" />
      )}
      {!isLoading && !error && applications.length === 0 && (
        <EmptyState message="아직 챌린지가 없어요." />
      )}
      {!isLoading && !error && applications.length > 0 && (
        <ApplicationTable applications={applications} />
      )}
    </>
  );
}
