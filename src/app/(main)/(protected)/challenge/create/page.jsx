'use client';

import { useForm, FormProvider, useWatch } from 'react-hook-form';
import InputField from '@/components/Field/InputField';
import TextAreaField from '@/components/Field/TextAreaField';
import CalendarField from '@/components/Field/CalendarField';
import CategoryDropdown from '@/components/CategoryDropdown';
import Button from '@/components/Button';
import TypeChip from '@/components/TypeChip';

const CATEGORY_LABELS = Object.values(TypeChip.text); // ['Next.js', 'API', 'Career', 'Modern JS', 'Web']
const DOCUMENT_TYPE_OPTIONS = ['공식문서', '블로그'];
const DOCUMENT_TYPE_VALUES = ['official', 'blog'];

export default function CreateChallengePage() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      originalLink: '',
      category: '',
      documentType: '',
      deadlineAt: null,
      maxParticipants: '',
      description: '',
    },
  });

  const { handleSubmit, setValue, formState } = methods;
  const categoryValue = useWatch({
    control: methods.control,
    name: 'category',
  });
  const documentTypeValue = useWatch({
    control: methods.control,
    name: 'documentType',
  });

  const onSubmit = (data) => {
    // 문서 타입을 영어로 변환
    const documentTypeIndex = DOCUMENT_TYPE_OPTIONS.indexOf(data.documentType);
    const finalData = {
      ...data,
      documentType:
        documentTypeIndex !== -1
          ? DOCUMENT_TYPE_VALUES[documentTypeIndex]
          : data.documentType,
      maxParticipants: Number(data.maxParticipants),
    };
    console.log('제출 데이터:', finalData);
    // TODO: API 호출
  };

  return (
    <div
      className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] px-4 py-8"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-xl font-semibold leading-none text-gray-900">
          신규 챌린지 신청
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 제목 */}
            <InputField
              label="제목"
              placeholder="제목을 입력해주세요"
              {...methods.register('title', {
                required: '제목을 입력해주세요',
              })}
              error={formState.errors.title?.message}
            />

            {/* 원문 링크 */}
            <InputField
              label="원문 링크"
              type="url"
              placeholder="원문 링크를 입력해주세요"
              {...methods.register('originalLink', {
                required: '원문 링크를 입력해주세요',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: '올바른 URL 형식을 입력해주세요',
                },
              })}
              error={formState.errors.originalLink?.message}
            />

            {/* 분야 */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-gray-900 font-medium text-[14px] cursor-pointer">
                분야
              </label>
              <CategoryDropdown
                category={CATEGORY_LABELS}
                value={categoryValue ? TypeChip.text[categoryValue] : ''}
                onChange={(selectedLabel) => {
                  // 라벨에서 키 찾기
                  const selectedKey = Object.keys(TypeChip.text).find(
                    (key) => TypeChip.text[key] === selectedLabel,
                  );
                  setValue('category', selectedKey || '', {
                    shouldValidate: true,
                  });
                }}
                placeholder="카테고리"
              />
              {formState.errors.category && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  {formState.errors.category.message}
                </p>
              )}
            </div>

            {/* 문서 타입 */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-gray-900 font-medium text-[14px] cursor-pointer">
                문서 타입
              </label>
              <CategoryDropdown
                category={DOCUMENT_TYPE_OPTIONS}
                value={documentTypeValue || ''}
                onChange={(value) => {
                  setValue('documentType', value, { shouldValidate: true });
                }}
                placeholder="카테고리"
              />
              {formState.errors.documentType && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  {formState.errors.documentType.message}
                </p>
              )}
            </div>

            {/* 마감일 */}
            <CalendarField
              name="deadlineAt"
              label="마감일"
              placeholder="YY/MM/DD"
              rules={{
                required: '마감일을 선택해주세요',
              }}
            />

            {/* 최대 인원 */}
            <InputField
              label="최대 인원"
              type="number"
              placeholder="인원을 입력해주세요"
              {...methods.register('maxParticipants', {
                required: '최대 인원을 입력해주세요',
                min: { value: 1, message: '최소 1명 이상이어야 합니다' },
                max: { value: 100, message: '최대 100명까지 가능합니다' },
              })}
              error={formState.errors.maxParticipants?.message}
            />

            {/* 내용 */}
            <TextAreaField
              label="내용"
              placeholder="내용을 입력해주세요"
              {...methods.register('description', {
                required: '내용을 입력해주세요',
                minLength: { value: 10, message: '10자 이상 입력해주세요' },
              })}
              error={formState.errors.description?.message}
            />

            {/* 신청하기 버튼 */}
            <div className="flex justify-center pt-4">
              <Button type="submit" variant="solid" size="lg">
                신청하기
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
