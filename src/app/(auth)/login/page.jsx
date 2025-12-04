'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/providers/AuthProvider';
import bigLogo from '@/assets/big_logo.svg';
import { loginService } from '@/lib/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    const result = await loginService(data);

    if (result.emailError || result.passwordError) {
      return result;
    }

    login(result.user);
    router.push('/');

    return { success: true };
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
