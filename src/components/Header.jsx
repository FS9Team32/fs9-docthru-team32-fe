'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

import imgLogo from '@/assets/logo-main.svg';
import icBell from '@/assets/icon_bell.svg';
import icExit from '@/assets/icon_exit.svg';

import ProfileDropdownForHeader from '@/components/ProfileDropdownForHeader';

const TempButton = ({ children, onClick = () => {}, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-10 items-center justify-center gap-1.5 rounded-xl px-4 text-[14px] font-bold transition-colors ${className}`}
  >
    {children}
  </button>
);

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isEditorPage =
    pathname.startsWith('/challenge/write') ||
    pathname.startsWith('/challenge/edit');

  let viewType = 'default';
  if (isEditorPage) viewType = 'editor';
  else if (user?.role === 'ADMIN') viewType = 'admin';

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const baseTab =
    'px-[17px] py-[21px] text-[16px] font-semibold transition-colors';
  const activeTab = 'text-[#262626]';
  const inactiveTab = 'text-[#8E8E8E] hover:text-[#1A1A1A]';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div
        className={`flex h-[60px] w-full mx-auto items-center justify-between px-4 sm:px-8
          ${viewType === 'editor' ? 'max-w-4xl' : 'max-w-7xl'}
        `}
      >
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

          {viewType === 'admin' && (
            <nav className="hidden md:flex items-center gap-0">
              {/*TODO: 파일명에 맞게 경로 수정  */}
              <Link
                href="/challenge"
                className={`${baseTab} ${
                  pathname.startsWith('/challenge') ? activeTab : inactiveTab
                }`}
              >
                챌린지 관리
              </Link>
              {/*TODO: 파일명에 맞게 경로 수정  */}
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
          {viewType === 'editor' ? (
            <div className="flex items-center gap-2">
              {/*TODO: 여기서 버튼 수정 하시면 됩니다  */}
              <TempButton className="bg-red-50 text-red-500 hover:bg-red-100">
                <span>포기</span>
                <Image src={icExit} alt="" width={14} height={14} />
              </TempButton>

              <TempButton className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                임시저장
              </TempButton>

              <TempButton className="bg-brand-black text-white hover:bg-black">
                제출하기
              </TempButton>
            </div>
          ) : user ? (
            <>
              {viewType === 'default' && (
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <Image src={icBell} alt="알림" width={24} height={24} />
                </button>
              )}

              <ProfileDropdownForHeader
                nickname={user.nickname}
                role={user.role}
                onLogout={handleLogout}
                hideMyChallenge={user.role === 'ADMIN'}
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
