import { getServerSideToken } from '@/lib/action/auth';
import { redirect, RedirectType } from 'next/navigation';

export default async function AuthLayout({ children }) {
  // 토큰 갱신 없이 단순히 accessToken 존재 여부만 확인
  const accessToken = await getServerSideToken('accessToken');

  if (accessToken) {
    redirect('/challenge', RedirectType.replace);
  }

  return <div className="min-h-screen w-full">{children}</div>;
}
