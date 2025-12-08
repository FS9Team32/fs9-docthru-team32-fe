'use server';

export async function getServerSideToken() {
  return null;
}

export async function setServerSideTokens() {
  return { success: true };
}

export async function updateAccessToken() {
  return { success: true };
}

export async function clearServerSideTokens() {
  return { success: true };
}

export async function loginAction() {
  return {
    success: false,
    error: ' loginActiont사용  x.',
  };
}

export async function registerAction() {
  return {
    success: false,
    error: ' registeraction 사용 x.',
  };
}

export async function checkAndRefreshAuth() {
  return false;
}
