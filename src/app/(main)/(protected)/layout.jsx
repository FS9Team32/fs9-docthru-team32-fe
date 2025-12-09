import { checkAndRefreshAuth } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';

export default async function ProtectedLayout({ children }) {
  const isAuthenticated = await checkAndRefreshAuth();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
