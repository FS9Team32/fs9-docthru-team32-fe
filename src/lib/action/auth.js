'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';

export async function getServerSideToken(type = 'accessToken') {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = await cookies();

  const accessTokenData = jwtDecode(accessToken);
  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: accessTokenExpiresIn > 0 ? accessTokenExpiresIn : 60 * 60,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  if (refreshToken) {
    const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30;
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });
  }
}

export async function updateAccessToken(accessToken) {
  const cookieStore = await cookies();

  const accessTokenData = jwtDecode(accessToken);

  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: accessTokenExpiresIn > 0 ? accessTokenExpiresIn : 60 * 60,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
}

export async function clearServerSideTokens() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return { success: true };
}

export async function loginAction(email, password) {
  try {
    const response = await authService.login({ email, password });
    if (!response || !response.accessToken) {
      throw new Error('API 응답에 Access Token이 포함되어 있지 않습니다.');
    }

    await setServerSideTokens(
      response.accessToken,
      response.refreshToken || null,
    );

    return {
      success: true,
      userData: {
        id: response.id,
        email: response.email,
        nickname: response.nickname,
        role: response.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      userData: null,
      error: error.message || '로그인 요청 중 알 수 없는 서버 오류',
    };
  }
}

export async function signupAction(nickname, email, password, confirmPassword) {
  try {
    const response = await authService.signup({
      nickname,
      email,
      password,
      confirmPassword,
    });

    if (!response || !response.accessToken) {
      throw new Error('API 응답에 Access Token이 포함되어 있지 않습니다.');
    }
    await setServerSideTokens(
      response.accessToken,
      response.refreshToken || null,
    );

    return {
      success: true,
      userData: {
        id: response.id,
        email: response.email,
        nickname: response.nickname,
        role: response.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      userData: null,
      error: error.message || '로그인 요청 중 알 수 없는 서버 오류',
    };
  }
}

export async function checkAndRefreshAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken) {
    return true;
  }

  if (!refreshToken) {
    return false;
  }

  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseURL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    if (response.ok) {
      const { accessToken: newAccessToken } = await response.json();

      await updateAccessToken(newAccessToken);

      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
