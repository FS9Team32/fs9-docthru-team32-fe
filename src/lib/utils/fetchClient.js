import { getServerSideToken } from '../action/auth';

export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = await getServerSideToken('accessToken'); // accessToken 확인

  if (!token) {
    throw new Error('Access Token is missing');
  }

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Bearer 토큰 추가
    },
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 토큰 만료 시 자동 갱신 시도
  if (response.status === 401) {
    // 토큰 만료 시
    const refreshToken = await getServerSideToken('refreshToken');
    const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken } = await refreshResponse.json();
      await updateAccessToken(newAccessToken); // 새 토큰 업데이트

      // 새 토큰으로 재시도
      response = await fetch(`${baseURL}${url}`, mergedOptions);
    } else {
      throw new Error('Token refresh failed');
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json(); // JSON 응답 반환
  }

  return { status: response.status, ok: response.ok }; // JSON이 아닌 경우 상태 코드와 OK 플래그 반환
};
