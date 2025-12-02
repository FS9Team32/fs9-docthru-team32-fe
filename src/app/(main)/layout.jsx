import Header from '@/components/Header';

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
