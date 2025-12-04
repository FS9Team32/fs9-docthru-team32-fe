'use client';

import { useForm, FormProvider } from 'react-hook-form';
import InputField from '@/components/InputField';
import CalendarField from '@/components/CalendarField';

export default function GuidePage() {
  const methods = useForm({
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <div className="p-10 space-y-10 max-w-xl mx-auto bg-white min-h-screen">
        <section>
          <InputField
            label="제목"
            placeholder="제목을 입력해주세요"
            {...methods.register('title', {
              required: '제목은 필수입니다.',
              minLength: { value: 2, message: '2글자 이상 입력해주세요.' },
            })}
            error={methods.formState.errors.title?.message}
          />
        </section>

        <section>
          <div className="relative">
            <CalendarField
              name="deadline"
              label="마감일"
              placeholder="YY/MM/DD"
              rules={{
                required: '마감일을 선택해주세요.',
              }}
            />
          </div>
        </section>
      </div>
    </FormProvider>
  );
}
