'use client';

import { useState, useEffect } from 'react';
import MyChallengeTabs from './MyChallengeTabs';
import ApplicationTable from './ApplicationTable';
import { challengeApplicationService } from '@/lib/services/challenge/challengeApplicationService';

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

  useEffect(() => {
    if (activeTab !== '신청한 챌린지') {
      setApplications([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchApplications = async () => {
      try {
        const response = await challengeApplicationService.get();
        const data = response?.list || [];

        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || '신청한 챌린지를 불러오는데 실패했습니다.');
        setApplications([]);
      } finally {
        // 8단계: 로딩 해제
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [activeTab]);

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
