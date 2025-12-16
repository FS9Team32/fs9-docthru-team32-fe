import { getServerSideToken } from '@/lib/action/auth';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';

export default async function ProtectedLayout({ children }) {
  const accessToken = await getServerSideToken('accessToken');
  const refreshToken = await getServerSideToken('refreshToken');

  // 둘 다 없으면 로그인 페이지로
  // refreshToken만 있어도 통과 (tokenFetch에서 자동 갱신 처리)
  if (!accessToken && !refreshToken) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
