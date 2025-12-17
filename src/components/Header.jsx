'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useState, useEffect } from 'react';
import { notificationService } from '@/lib/services/notificationService';

import imgLogo from '@/assets/logo-main.svg';
import icBell from '@/assets/icon_bell.svg';

import ProfileDropdownForHeader from '@/components/ProfileDropdownForHeader';
import NotificationDropdown from '@/components/NotificationDropdown';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = !!user;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleToggleNotification = () => setIsNotificationOpen((prev) => !prev);

  useEffect(() => {
    if (isNotificationOpen && user && user.role !== 'ADMIN') {
      const fetchNotifications = async () => {
        setIsLoadingNotifications(true);
        try {
          console.log('[알림] API 호출 시작:', '/users/me/notifications');
          const response = await notificationService.getList();
          console.log('[알림] API 응답 전체:', response);
          const data = response?.list || [];
          setNotifications(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('[알림] 알림 목록 조회 실패:', err);
          setNotifications([]);
        } finally {
          setIsLoadingNotifications(false);
        }
      };
      fetchNotifications();
    }
  }, [isNotificationOpen, user]);

  const handleNotificationUpdate = () => {
    if (isNotificationOpen && user && user.role !== 'ADMIN') {
      const fetchNotifications = async () => {
        try {
          const response = await notificationService.getList();
          const data = response?.list || [];
          setNotifications(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('알림 목록 조회 실패:', err);
          setNotifications([]);
        }
      };
      fetchNotifications();
    }
  };

  const baseTab =
    'px-[17px] py-[21px] text-[16px] font-semibold transition-colors';
  const activeTab = 'text-[#262626]';
  const inactiveTab = 'text-[#8E8E8E] hover:text-[#1A1A1A]';

  const isAdmin = user?.role === 'ADMIN';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="flex h-[60px] w-full max-w-7xl mx-auto items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4 md:gap-12">
          <Link href={isLoggedIn ? '/challenge' : '/'}>
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
                href="/my"
                className={`${baseTab} ${
                  pathname.startsWith('/my') ? activeTab : inactiveTab
                }`}
              >
                챌린지 관리
              </Link>

              <Link
                href="/challenge"
                className={`${baseTab} ${
                  pathname.startsWith('/challenge') ? activeTab : inactiveTab
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
                    <NotificationDropdown
                      items={notifications}
                      isLoading={isLoadingNotifications}
                      onUpdate={handleNotificationUpdate}
                    />
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
