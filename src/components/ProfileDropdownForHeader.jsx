'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import memberImg from '@/assets/member.png';
import adminImg from '@/assets/admin.svg';

const ROLE_LABELS = {
  ADMIN: '어드민',
  PRO: '전문가',
  NORMAL: '일반 회원',
};

export default function ProfileDropdownForHeader({
  nickname,
  role,
  onLogout,
  hideMyChallenge = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileImage = role === 'ADMIN' ? adminImg : memberImg;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
      >
        <Image
          src={profileImage}
          alt="profile"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white border-2 border-gray-200">
          <div className="flex items-center gap-3 px-5 py-4">
            <Image
              src={profileImage}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-medium text-gray-500">
                {nickname}
              </span>
              <span
                className={`text-[14px] ${role === 'PRO' ? 'font-medium' : 'text-gray-500'}`}
              >
                {ROLE_LABELS[role] || '회원'}
              </span>
            </div>
          </div>

          <div className="px-5">
            <div className="h-0.5 w-full bg-gray-100" />
          </div>

          <div className="py-2">
            {!hideMyChallenge && (
              <Link
                href="/my"
                className="block w-full px-5 py-3 text-[16px] font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                나의 챌린지
              </Link>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="block w-full px-5 py-3 text-[16px]  font-medium text-gray-400 text-left hover:bg-gray-50 hover:text-red-500"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
