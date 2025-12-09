'use client';

import InputField from '../Field/InputField';
import Link from 'next/link';
import { useAuthForm } from '@/hooks/useAuthForm';

export default function AuthForm({ type, onSubmit }) {
  const { register, errors, isSignup, submitHandler, isSubmitting, getValues } =
    useAuthForm(type, onSubmit);

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      {isSignup && (
        <InputField
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          {...register('nickname', { required: '닉네임은 필수입니다.' })}
          error={errors.nickname?.message}
        />
      )}

      <InputField
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        {...register('email', {
          required: '이메일은 필수입니다.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '잘못된 이메일입니다.',
          },
        })}
        error={errors.email?.message}
      />

      <InputField
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...register('password', {
          required: '비밀번호는 필수입니다.',
          minLength: { value: 8, message: '8자 이상 입력해 주세요.' },
        })}
        error={errors.password?.message}
      />

      {isSignup && (
        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          {...register('confirmPassword', {
            required: '비밀번호 확인은 필수입니다.',
            validate: (value) =>
              value === getValues('password') ||
              '비밀번호가 일치하지 않습니다.',
          })}
          error={errors.confirmPassword?.message}
        />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-2 w-full py-3 text-white font-bold rounded-xl transition-colors
        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
      >
        {isSubmitting ? '처리 중...' : isSignup ? '회원가입' : '로그인'}
      </button>

      <div className="text-sm text-center font-medium mt-2">
        {isSignup ? (
          <span className="text-gray-600">
            회원이신가요?{' '}
            <Link href="/login" className="text-black underline">
              로그인하기
            </Link>
          </span>
        ) : (
          <span className="text-gray-600">
            회원이 아니신가요?{' '}
            <Link href="/signup" className="text-black underline">
              회원가입하기
            </Link>
          </span>
        )}
      </div>
    </form>
  );
}
