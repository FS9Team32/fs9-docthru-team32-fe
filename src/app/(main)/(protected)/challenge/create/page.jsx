'use client';

import { useForm, FormProvider } from 'react-hook-form';
import InputField from '@/components/Field/InputField';
import TextAreaField from '@/components/Field/TextAreaField';
import CalendarField from '@/components/Field/CalendarField';
import CategoryField from '@/components/Field/CategoryField';
import {
  CATEGORY_LABELS,
  CATEGORY_TEXT,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_VALUES,
} from '@/constants/challengeConstants';

const normalizeUrl = (url) => {
  if (!url) return '';

  if (url.match(/^https?:\/\//)) {
    return url;
  }

  return `https://${url}`;
};

const validateUrlExists = async (url) => {
  if (!url) {
    return true;
  }

  const normalizedUrl = normalizeUrl(url);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(normalizedUrl, {
      method: 'HEAD',
      mode: 'cors',
      signal: controller.signal,
      headers: {
        Accept: '*/*',
      },
    });

    clearTimeout(timeoutId);

    if (response.ok || (response.status >= 200 && response.status < 400)) {
      return true;
    }

    if (response.status >= 400) {
      return '링크에 접근할 수 없습니다. 링크가 올바른지 확인해주세요.';
    }

    return true;
  } catch (error) {
    if (error.name === 'AbortError') {
      return '링크 확인 시간이 초과되었습니다.';
    }
  }
};

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

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    const categoryKey = Object.keys(CATEGORY_TEXT).find(
      (key) => CATEGORY_TEXT[key] === data.category,
    );

    // 문서 타입을 영어로 변환
    const documentTypeIndex = DOCUMENT_TYPE_LABELS.indexOf(data.documentType);
    const finalData = {
      ...data,
      originalLink: normalizeUrl(data.originalLink), // URL 정규화
      category: categoryKey || data.category, // 분야를 키로 변환
      documentType:
        documentTypeIndex !== -1
          ? DOCUMENT_TYPE_VALUES[documentTypeIndex]
          : data.documentType,
      maxParticipants: Number(data.maxParticipants),
    };
    console.log('제출 데이터:', finalData);
  };

  return (
    <div
      className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] px-4 py-8"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="mx-auto" style={{ maxWidth: '590px' }}>
        <h1 className="mb-8 text-xl font-semibold leading-none text-gray-900">
          신규 챌린지 신청
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 space-y-10 mx-auto bg-white min-h-screen"
            style={{ maxWidth: '590px' }}
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

            {/* 원문 링크 */}
            <section>
              <InputField
                label="원문 링크"
                type="text"
                placeholder="원문 링크를 입력해주세요"
                {...methods.register('originalLink', {
                  required: '원문 링크를 입력해주세요',
                  pattern: {
                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i,
                    message:
                      '올바른 URL 형식을 입력해주세요 (예: google.com, www.google.com)',
                  },
                  validate: {
                    urlExists: async (value) => {
                      if (!value) return true;
                      return await validateUrlExists(value);
                    },
                  },
                })}
                error={methods.formState.errors.originalLink?.message}
              />
            </section>

            {/* 2. 분야 (카테고리 드롭다운 테스트) */}
            <section>
              <CategoryField
                name="category"
                label="분야"
                categories={CATEGORY_LABELS}
                rules={{ required: '분야를 선택해주세요.' }}
              />
            </section>

            {/* 3. 문서 타입 (두 번째 드롭다운 테스트용) */}
            <section>
              <CategoryField
                name="documentType"
                label="문서 타입"
                categories={DOCUMENT_TYPE_LABELS}
                rules={{ required: '문서 타입을 선택해주세요.' }}
              />
            </section>

            {/* 4. 마감일 */}
            <section>
              <CalendarField
                name="deadlineAt"
                label="마감일"
                placeholder="YY/MM/DD"
                rules={{
                  required: '마감일을 선택해주세요.',
                }}
              />
            </section>

            {/* 최대 인원 */}
            <section>
              <InputField
                label="최대 인원"
                type="number"
                placeholder="인원을 입력해주세요"
                {...methods.register('maxParticipants', {
                  required: '최대 인원을 입력해주세요',
                  min: { value: 1, message: '최소 1명 이상이어야 합니다' },
                  max: { value: 10, message: '최대 10명까지 가능합니다' },
                })}
                error={methods.formState.errors.maxParticipants?.message}
              />
            </section>

            {/* 5. 내용 */}
            <section>
              <TextAreaField
                label="내용"
                placeholder="내용을 입력해주세요"
                {...methods.register('description', {
                  required: '내용은 필수입니다.',
                  minLength: { value: 10, message: '10자 이상 적어주세요.' },
                })}
                error={methods.formState.errors.description?.message}
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
      </div>
    </div>
  );
}
