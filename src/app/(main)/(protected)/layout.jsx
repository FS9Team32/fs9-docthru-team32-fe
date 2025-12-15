import { checkAndRefreshAuth } from '@/lib/action/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }) {
  const isAuthenticated = await checkAndRefreshAuth();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
}
