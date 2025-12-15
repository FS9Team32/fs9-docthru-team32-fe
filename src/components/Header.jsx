'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';

import imgLogo from '@/assets/logo-main.svg';
import icBell from '@/assets/icon_bell.svg';

import ProfileDropdownForHeader from '@/components/ProfileDropdownForHeader';
import NotificationDropdown from '@/components/NotificationDropdown';

// 목업 알림 데이터
const mockNotifications = [
  {
    id: 1,
    message: "'신청한 챌린지 이름'이 승인/거절되었어요",
    date: '2025.12.15',
  },
  {
    id: 2,
    message: "'신청한 챌린지 이름'에 작업물이 추가되었어요",
    date: '2025.12.15',
  },
  {
    id: 3,
    message: "'신청한 챌린지 이름'이 마감되었어요",
    date: '2025.12.15',
  },
];

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleToggleNotification = () => setIsNotificationOpen((prev) => !prev);

  const baseTab =
    'px-[17px] py-[21px] text-[16px] font-semibold transition-colors';
  const activeTab = 'text-[#262626]';
  const inactiveTab = 'text-[#8E8E8E] hover:text-[#1A1A1A]';

  const isAdmin = user?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="flex h-[60px] w-full max-w-7xl mx-auto items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4 md:gap-12">
          <Link href="/">
            <Image
              src={imgLogo}
              alt="Docthru Logo"
              width={120}
              height={27}
              priority
              className="w-20 h-auto md:w-[100px]"
            />
          </Link>

          {isAdmin && (
            <nav className="hidden md:flex items-center gap-0">
              <Link
                href="/challenge"
                className={`${baseTab} ${
                  pathname.startsWith('/challenge') ? activeTab : inactiveTab
                }`}
              >
                챌린지 관리
              </Link>

              <Link
                href="/list"
                className={`${baseTab} ${
                  pathname.startsWith('/list') ? activeTab : inactiveTab
                }`}
              >
                챌린지 목록
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              {!isAdmin && (
                <div className="relative">
                  <button
                    className="rounded-full p-1 hover:bg-gray-100"
                    onClick={handleToggleNotification}
                    aria-label="알림"
                  >
                    <Image src={icBell} alt="알림" width={24} height={24} />
                  </button>
                  {isNotificationOpen && (
                    <NotificationDropdown items={mockNotifications} />
                  )}
                </div>
              )}

              <ProfileDropdownForHeader
                nickname={user.nickname}
                role={user.role}
                onLogout={handleLogout}
                hideMyChallenge={isAdmin}
              />
            </>
          ) : (
            <Link
              href="/login"
              className="flex h-10 w-[90px] shrink-0 items-center justify-center gap-1 rounded-xl border border-gray-800 bg-white px-4 pb-[3px] pt-0.5 text-[16px] font-bold text-gray-800 transition-colors hover:bg-gray-50"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
