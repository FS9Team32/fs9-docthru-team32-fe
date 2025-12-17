'use client';
import { useState } from 'react';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';
import CategoryChip from '@/components/CategoryChip';
import TypeChip from '@/components/TypeChip';
import StatusChip from '@/components/StatusChip';
import ProfileDropdown from '@/components/ProfileDropdown';
import CategoryDropdown from '@/components/CategoryDropdown';
import ListDropdown from '@/components/ListDropdown';
import CommentDropdown from '@/components/CommentDropdown';
import { useModal } from '@/providers/ModalProvider';
import InputModal from '@/components/modal/InputModal';

export default function Page() {
  const { openModal, closeModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [sort, setSort] = useState('APPLY_ASC');
  const handleOpenModal = () => {
    openModal(InputModal, {
      onClose: closeModal,
      onSubmit: (value) => {
        console.log('제출된 값:', value);
        alert(`제출된 값: ${value}`);
        closeModal();
      },
      title: '모달 테스트',
      label: '내용을 입력하세요',
      placeholder: '테스트 메시지를 입력해주세요',
    });
  };

  return (
    <div className="flex min-h-screen flex-col gap-10 bg-gray-500 p-10">
      <h1> main page</h1>
      {/* 1. 드롭다운 컴포넌트 섹션 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          드롭다운 컴포넌트
        </h2>
        <div className="flex flex-wrap items-start gap-8">
          {/* 1-2. 카테고리 선택 드롭다운 (파일: CategoryDropdown.jsx) */}
          <div className="w-80 rounded-lg border bg-gray-50 p-3">
            <CategoryDropdown
              category={['test', '1', '2', '3']}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
          {/* 1-1. 프로필 메뉴 드롭다운 (파일: ProfileDropdown.jsx) */}
          <div className="w-64 rounded-lg border bg-gray-50 p-3">
            <ProfileDropdown />
          </div>

          {/* 1-3. 상태 필터 및 정렬 드롭다운 (파일: ListDropdown.jsx) */}
          <div className="w-64 rounded-lg border bg-gray-50 p-3 space-y-2">
            <ListDropdown
              filterValue={filter}
              sortValue={sort}
              onFilterSelect={setFilter}
              onSortSelect={setSort}
            />
          </div>

          {/* 1-4. 액션 드롭다운 (파일: CommentDropdown.jsx) */}
          <div className="flex w-auto items-center justify-center rounded-lg border bg-gray-50 p-3">
            <CommentDropdown />
          </div>
        </div>
      </section>

      {/* 2. 버튼 컴포넌트 섹션 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">버튼 컴포넌트</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="solid" size="sm" className="bg-brand-black">
              1
            </Button>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="solid" size="base" className="bg-brand-black">
              2
            </Button>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="solid" size="md" className="bg-brand-black">
              3
            </Button>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="solid" size="lg" className="bg-brand-black">
              4
            </Button>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="solid" size="icon" className="bg-brand-black">
              5
            </Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="outline">임시저장</Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="tonal" size="lg">
              거절하기
            </Button>
          </div>

          <div className="bg-brand flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="ghost">링크 열기 ↗</Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button variant="accent">원본 보기</Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <LinkButton href="/test">테스트 페이지로</LinkButton>
          </div>
        </div>
      </section>

      {/* 3. 칩(Chip) 컴포넌트 섹션 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">칩 컴포넌트</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <TypeChip type="Modern" />
            <TypeChip type="API" />
            <TypeChip type="Next" />
          </div>

          <div className="flex flex-col gap-2 rounded-lg border p-3">
            <CategoryChip>공식 문서</CategoryChip>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <StatusChip type="APPROVED" />
            <StatusChip type="REJECTED" />
            <StatusChip type="DELETED" />
            <StatusChip type="PENDING" />
          </div>
          <button className="px-2.5" />
        </div>
      </section>

      {/* 4. 모달 테스트 섹션 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">모달 테스트</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3">
            <Button
              variant="solid"
              size="base"
              className="bg-brand-black"
              onClick={handleOpenModal}
            >
              모달 열기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
