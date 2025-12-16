'use client';

import { useState, useEffect } from 'react';
import ApplicationTable from './ApplicationTable';
import { challengeApplicationService } from '@/lib/services/challenge/challengeApplicationService';

const EmptyState = ({ message, textColor = 'text-gray-400' }) => (
  <div className="flex min-h-[400px] items-center justify-center">
    <p className={textColor}>{message}</p>
  </div>
);

export default function AppliedChallengesTab() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (isLoading) {
    return <EmptyState message="로딩 중..." textColor="text-gray-500" />;
  }

  if (error) {
    return <EmptyState message={error} textColor="text-red-500" />;
  }

  if (applications.length === 0) {
    return <EmptyState message="아직 챌린지가 없어요." />;
  }

  return <ApplicationTable applications={applications} />;
}
