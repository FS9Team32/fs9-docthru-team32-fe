'use client';

import { useForm } from 'react-hook-form';

export function useAuthForm(type, onSubmit) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const isSignup = type === 'signup';

  const submitHandler = handleSubmit(async (formData) => {
    const result = await onSubmit(formData);
    if (!result) return;

    if (result.emailError) {
      setError('email', { type: 'manual', message: result.emailError });
    }

    if (result.passwordError) {
      setError('password', { type: 'manual', message: result.passwordError });
    }
  });

  return {
    register,
    errors,
    isSignup,
    submitHandler,
    isSubmitting,
    getValues,
  };
}
