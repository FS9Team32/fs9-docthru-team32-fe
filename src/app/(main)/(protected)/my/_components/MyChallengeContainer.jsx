'use client';

import { useState, useEffect, useMemo } from 'react';
import MyChallengeTabs from './MyChallengeTabs';
import ApplicationTable from './ApplicationTable';
import SearchBar from '@/app/(main)/challenge/_components/SearchBar';
import ListDropdown from '@/components/ListDropdown';
import Pagination from '@/app/(main)/challenge/_components/Pagination';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterValue, setFilterValue] = useState('ALL');
  const [sortValue, setSortValue] = useState('APPLY_ASC');

  useEffect(() => {
    if (activeTab !== '신청한 챌린지') {
      setApplications([]);
      setCurrentPage(1);
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentPage(1);

    // TODO: 백엔드 API 구현 후 주석 해제
    // const fetchApplications = async () => {
    //   try {
    //     const response = await challengeApplicationService.get();
    //     const data = response?.list || [];
    //     setApplications(Array.isArray(data) ? data : []);
    //   } catch (err) {
    //     setError(err.message || '신청한 챌린지를 불러오는데 실패했습니다.');
    //     setApplications([]);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchApplications();
    setTimeout(() => {
      const mockApplications = [
        {
          id: 1,
          category: 'Next',
          documentType: 'official',
          title: 'Next.js - App Router: Routing Fundamentals',
          maxParticipants: 10,
          createdAt: '2025-12-15T00:00:00.000Z',
          deadlineAt: '2025-12-24T00:00:00.000Z',
          status: 'PENDING',
        },
        {
          id: 2,
          category: 'API',
          documentType: 'blog',
          title: 'Fetch API, 에러 핸들링의 이해',
          maxParticipants: 5,
          createdAt: '2025-01-16T00:00:00.000Z',
          deadlineAt: '2025-02-23T00:00:00.000Z',
          status: 'APPROVED',
        },
      ];
      setApplications(mockApplications);
      setIsLoading(false);
    }, 500);
  }, [activeTab]);

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // 검색 필터
    if (searchKeyword.trim()) {
      result = result.filter((application) =>
        application.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    // 상태 필터
    if (filterValue !== 'ALL') {
      result = result.filter(
        (application) => application.status === filterValue,
      );
    }

    // 정렬
    result.sort((a, b) => {
      switch (sortValue) {
        case 'APPLY_ASC':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'APPLY_DESC':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'DEADLINE_ASC':
          return new Date(a.deadlineAt) - new Date(b.deadlineAt);
        case 'DEADLINE_DESC':
          return new Date(b.deadlineAt) - new Date(a.deadlineAt);
        default:
          return 0;
      }
    });

    return result;
  }, [applications, searchKeyword, filterValue, sortValue]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    endIndex,
  );

  const handleSearch = (keyword) => {
    console.log('검색:', keyword);
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handleFilterSelect = (value) => {
    console.log('필터:', value);
    setFilterValue(value);
    setCurrentPage(1);
  };

  const handleSortSelect = (value) => {
    console.log('정렬:', value);
    setSortValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <>
          {filteredApplications.length === 0 ? (
            <EmptyState message="검색 결과가 없습니다." />
          ) : (
            <>
              <div className="mb-6 flex items-center gap-4">
                <SearchBar onSearch={handleSearch} />
                <ListDropdown
                  filterValue={filterValue}
                  sortValue={sortValue}
                  onFilterSelect={handleFilterSelect}
                  onSortSelect={handleSortSelect}
                />
              </div>
              <ApplicationTable applications={paginatedApplications} />
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
