'use client';

import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import Image from 'next/image';
import memberImg from '@/assets/member.png';
export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  //  const router = useRouter();

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  {
    /*const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };*/
  }

  {
    /*const handleLogout = () => {
    setIsOpen(false);
    로그아웃 로직 실행
    router.push('/login'); 
  };*/
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 프로필 이미지 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full"
      >
        <Image
          src={memberImg}
          alt="Profile"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="ring-opacity-5 absolute left-0 z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black focus:outline-none">
          {/* 프로필 */}
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-xl">
              <Image
                src={memberImg}
                alt="Profile"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="     text-gray-900">닉네임</span>
              <span className="text-xs text-gray-500">유저 등급</span>
            </div>
          </div>

          {/* 메뉴 리스트 */}
          <div className="py-2">
            <button
              //onClick={() => handleNavigation('/my')}
              className="block w-full px-5 py-3 text-left   text-gray-700 hover:bg-gray-50"
            >
              나의 챌린지
            </button>
            <button
              //onClick={handleLogout}
              className="block w-full px-5 py-3 text-left   text-gray-400 hover:bg-gray-50"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
