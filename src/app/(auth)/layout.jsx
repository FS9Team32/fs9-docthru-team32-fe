import { checkAndRefreshAuth } from '@/lib/action/auth';
import { redirect, RedirectType } from 'next/navigation';

export default async function AuthLayout({ children }) {
  const isAuthenticated = await checkAndRefreshAuth();

  if (isAuthenticated) {
    redirect('/', RedirectType.replace);
  }

  return <div className="min-h-screen w-full">{children}</div>;
}
