'use client';

import { useForm, FormProvider } from 'react-hook-form';
import InputField from '@/components/Field/InputField';
import CalendarField from '@/components/Field/CalendarField';
import TextAreaField from '@/components/Field/TextAreaField';
import CategoryField from '@/components/Field/CategoryField';

export default function GuidePage() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: '',
      docType: '',
      deadline: '',
      content: '',
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-10 space-y-10 max-w-xl mx-auto bg-white min-h-screen"
      >
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

        {/* 2. 분야 (카테고리 드롭다운 테스트) */}
        <section>
          <CategoryField
            name="category"
            label="분야"
            categories={['Next.js', 'API', 'Career', 'Modern JS', 'Web']}
            rules={{ required: '분야를 선택해주세요.' }}
          />
        </section>

        {/* 3. 문서 타입 (두 번째 드롭다운 테스트용) */}
        <section>
          <CategoryField
            name="docType"
            label="문서 타입"
            categories={['블로그', '공식문서']}
            rules={{ required: '문서 타입을 선택해주세요.' }}
          />
        </section>

        {/* 4. 마감일 */}
        <section>
          <CalendarField
            name="deadline"
            label="마감일"
            placeholder="YY/MM/DD"
            rules={{
              required: '마감일을 선택해주세요.',
            }}
          />
        </section>

        {/* 5. 내용 */}
        <section>
          <TextAreaField
            label="내용"
            placeholder="내용을 입력해주세요"
            {...methods.register('content', {
              required: '내용은 필수입니다.',
              minLength: { value: 10, message: '10자 이상 적어주세요.' },
            })}
            error={methods.formState.errors.content?.message}
          />
        </section>

        <section className="pt-4">
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-white font-semibold text-center hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!methods.formState.isValid}
          >
            신청하기
          </button>
        </section>
      </form>
    </FormProvider>
  );
}
