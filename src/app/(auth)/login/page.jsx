'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthForm from '@/components/auth/AuthForm';
import bigLogo from '@/assets/big_logo.svg';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await authService.login({ email, password });

      login({
        user: res,
        accessToken: res.accessToken,
      });

      router.push('/');
      return { success: true };
    } catch (err) {
      return { passwordError: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] px-4">
      <div className="mb-10">
        <Image src={bigLogo} alt="Docthru" width={320} height={72} />
      </div>

      <div className="w-full max-w-xl">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
}
