'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthForm from '@/components/auth/AuthForm';
import bigLogo from '@/assets/big_logo.svg';
import { authService } from '@/lib/services/authService';
import { useAuth } from '@/providers/AuthProvider';

export default function SignupPage() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async ({
    nickname,
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      return { passwordError: '비밀번호가 일치하지 않습니다.' };
    }

    try {
      await signup(nickname, email, password, confirmPassword);

      setIsPopupOpen(true);
      return { success: true };
    } catch (err) {
      const message = err?.message?.trim();

      if (message?.includes('Email Already Exists')) {
        return { emailError: '이미 사용 중인 이메일입니다.' };
      }
      if (message?.includes('DB Error Accured')) {
        return {
          emailError: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        };
      }
      return { emailError: '회원가입에 실패했습니다.' };
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);

    router.push('/challenge');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] px-4 relative">
      <div className="mb-10">
        <Image src={bigLogo} alt="Docthru" width={320} height={72} />
      </div>

      <div className="w-full max-w-xl">
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>

      {isPopupOpen && (
        <Popup message="가입이 완료되었습니다!" onClose={handleClosePopup} />
      )}
    </div>
  );
}

function Popup({ onClose, message }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[400px] h-[220px] rounded-xl shadow-2xl p-6 flex flex-col justify-between animate-in fade-in zoom-in duration-200"
      >
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg font-medium text-gray-900">{message}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#222222] text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
