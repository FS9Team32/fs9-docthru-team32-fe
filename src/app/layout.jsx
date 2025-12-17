import './globals.css';
import localFont from 'next/font/local';
import { ModalProvider } from '@/providers/ModalProvider';
import AuthProvider from '@/providers/AuthProvider';

export const metadata = {
  title: '독스루',
  description: '기술문서를 함께 번역해보아요',
};

export const pretendard = localFont({
  src: './font/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko-kr">
      <body className={`${pretendard.className} antialiased`}>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
