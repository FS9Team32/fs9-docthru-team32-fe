'use client';

import { useForm, FormProvider } from 'react-hook-form';
import InputField from '@/components/Field/InputField';
import CalendarField from '@/components/Field/CalendarField';
import TextAreaField from '@/components/Field/TextAreaField';

export default function GuidePage() {
  const methods = useForm({
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <div className="p-10 space-y-10 max-w-xl mx-auto bg-white min-h-screen">
        {/* 1. 제목 */}
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

        <section>
          <TextAreaField
            label="내용"
            placeholder="내용을 입력해주세요"
            {...methods.register('content', {
              required: '내용을 입력해주세요.',
              minLength: { value: 10, message: '10자 이상 적어주세요.' },
            })}
            error={methods.formState.errors.content?.message}
          />
        </section>
      </div>
    </FormProvider>
  );
}
