'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ChallengeCardList from './_components/ChallengeCardList';
import FilterBar from './_components/FilterBar';
import SearchBar from './_components/SearchBar';
import Pagination from './_components/Pagination';
import iconPlus from '@/assets/icon_plus.svg';
import { challengeService } from '@/lib/services/challenge/challengeService';

export default function ChallengePage() {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    documentType: '',
    status: '',
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await challengeService.getList();

        // 응답 데이터 파싱
        const data = response?.list || [];

        // 배열로 변환하여 저장
        setChallenges(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('챌린지 목록 조회 실패:', err);
        setError(err.message || '챌린지 목록을 불러오는데 실패했습니다.');
        setChallenges([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = useMemo(() => {
    let result = [...challenges];

    if (searchKeyword.trim()) {
      result = result.filter((challenge) =>
        challenge.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((challenge) =>
        filters.categories.includes(challenge.category),
      );
    }

    if (filters.documentType) {
      result = result.filter(
        (challenge) => challenge.documentType === filters.documentType,
      );
    }

    if (filters.status) {
      result = result.filter(
        (challenge) => challenge.status === filters.status,
      );
    }

    return result;
  }, [challenges, filters, searchKeyword]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log('필터 적용:', newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      documentType: '',
      status: '',
    });
    console.log('초기화');
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
    console.log('검색어:', keyword);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('페이지 변경:', page);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedChallenges = filteredChallenges.slice(startIndex, endIndex);

  return (
    <div
      className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] px-4 py-8"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold leading-none text-gray-900">
            챌린지 목록
          </h1>
          <div className="flex items-center gap-4">
            {filteredChallenges.length === 0 && (
              <div style={{ width: '375px', height: '40px' }}>
                <SearchBar onSearch={handleSearch} />
              </div>
            )}
            <Link href="/challenge/create">
              <button
                className="flex h-[39px] w-[154px] items-center justify-center gap-1 rounded-[19.5px] text-white"
                style={{ backgroundColor: '#262626' }}
              >
                신규 챌린지 신청{' '}
                <Image src={iconPlus} alt="add" width={16} height={16} />
              </button>
            </Link>
          </div>
        </div>
        {filteredChallenges.length > 0 && (
          <div className="mb-6 flex items-center gap-4">
            <FilterBar
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
        <ChallengeCardList challenges={paginatedChallenges} />
        {filteredChallenges.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
