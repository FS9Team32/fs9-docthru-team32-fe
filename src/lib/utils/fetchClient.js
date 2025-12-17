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
  console.log('mergedOptions', mergedOptions);
  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};
export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = await getServerSideToken('accessToken');

  if (!token) {
    throw new Error('Access Token is missing');
  }

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

  if (response.status === 401) {
    const refreshToken = await getServerSideToken('refreshToken');
    const refreshResponse = await fetch(`${baseURL}/auth/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken } = await refreshResponse.json();
      await updateAccessToken(newAccessToken);

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
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
