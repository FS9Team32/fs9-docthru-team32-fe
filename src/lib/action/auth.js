'use server';

import { cookies } from 'next/headers';

export async function getServerSideToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');
  return token?.value || null;
}

export async function checkAndRefreshAuth() {
  const accessToken = await getServerSideToken();

  if (accessToken) {
    return true;
  }

  return false;
}

export async function clearServerSideTokens() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  return { success: true };
}

export async function setServerSideTokens() {
  return { success: true };
}
export async function updateAccessToken() {
  return { success: true };
}
export async function loginAction() {
  return { success: false, error: 'Use Client Side Login' };
}
export async function registerAction() {
  return { success: false, error: 'Use Client Side Register' };
}
