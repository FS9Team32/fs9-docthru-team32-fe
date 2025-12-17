'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import InputField from '@/components/Field/InputField';
import TextAreaField from '@/components/Field/TextAreaField';
import CalendarField from '@/components/Field/CalendarField';
import CategoryField from '@/components/Field/CategoryField';
import { useAuth } from '@/providers/AuthProvider';
import { challengeApplicationService } from '@/lib/services/challenge/challengeApplicationService';
import { challengeService } from '@/lib/services/challenge/challengeService';
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

    if (response.status >= 200 && response.status < 400) {
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

    const errorString = String(error).toLowerCase();
    const errorMessage = error.message?.toLowerCase() || '';

    if (
      errorMessage.includes('err_name_not_resolved') ||
      errorString.includes('err_name_not_resolved') ||
      errorMessage.includes('getaddrinfo') ||
      errorMessage.includes('enotfound') ||
      errorMessage.includes('name resolution')
    ) {
      return '링크에 접근할 수 없습니다. 링크가 올바른지 확인해주세요.';
    }

    if (
      errorMessage.includes('cors') ||
      errorMessage.includes('err_failed') ||
      errorMessage.includes('networkerror')
    ) {
      return true;
    }

    return true;
  }
};

export default function CreateChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const challengeId = searchParams.get('id');
  const isEditMode = !!challengeId;
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false);

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

  // 수정 모드일 때 기존 챌린지 데이터 불러오기
  useEffect(() => {
    const fetchChallengeData = async () => {
      if (!isEditMode || !challengeId) return;

      setIsLoadingChallenge(true);
      try {
        const challengeData = await challengeService.getById(challengeId);

        const categoryLabel =
          CATEGORY_TEXT[challengeData.category] || challengeData.category;
        const documentTypeIndex = DOCUMENT_TYPE_VALUES.indexOf(
          challengeData.documentType,
        );
        const documentTypeLabel =
          documentTypeIndex !== -1
            ? DOCUMENT_TYPE_LABELS[documentTypeIndex]
            : challengeData.documentType;

        const deadlineDate = challengeData.deadlineAt
          ? new Date(challengeData.deadlineAt)
          : null;

        methods.reset({
          title: challengeData.title || '',
          originalLink: challengeData.originalLink || '',
          category: categoryLabel || '',
          documentType: documentTypeLabel || '',
          deadlineAt: deadlineDate,
          maxParticipants: challengeData.maxParticipants?.toString() || '',
          description: challengeData.description || '',
        });
      } catch (error) {
        console.error('챌린지 데이터 불러오기 실패:', error);
      } finally {
        setIsLoadingChallenge(false);
      }
    };

    fetchChallengeData();
  }, [isEditMode, challengeId, methods]);

  if (isLoading || !user || isLoadingChallenge) return null;

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      const categoryKey = Object.keys(CATEGORY_TEXT).find(
        (key) => CATEGORY_TEXT[key] === data.category,
      );

      // 문서 타입을 영어로 변환
      const documentTypeIndex = DOCUMENT_TYPE_LABELS.indexOf(data.documentType);

      // 마감일을 ISO string으로 변환
      const deadlineAt = data.deadlineAt
        ? new Date(data.deadlineAt).toISOString()
        : null;

      const finalData = {
        title: data.title,
        originalLink: normalizeUrl(data.originalLink),
        category: categoryKey || data.category,
        documentType:
          documentTypeIndex !== -1
            ? DOCUMENT_TYPE_VALUES[documentTypeIndex]
            : data.documentType,
        deadlineAt,
        maxParticipants: Number(data.maxParticipants),
        description: data.description,
      };

      if (isEditMode) {
      } else {
        await challengeApplicationService.create(finalData);
        router.push('/challenge');
      }
    } catch (error) {
      console.error('챌린지 처리 실패:', error);
    }
  };

  return (
    <div className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] px-4 py-8 bg-white">
      <div className="mx-auto max-w-[590px]">
        <h1 className="mb-8 text-xl font-semibold leading-none text-gray-900">
          {isEditMode ? '챌린지 수정' : '신규 챌린지 신청'}
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 space-y-10 mx-auto bg-white min-h-screen max-w-[590px]"
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
                {isEditMode ? '수정하기' : '신청하기'}
              </button>
            </section>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
