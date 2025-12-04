import { MOCK_USER, MOCK_ADMIN, MOCK_NORMAL } from '@/constants/mockData';

const LOCAL_USERS_KEY = 'mockUsers';

function loadLocalUsers() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(LOCAL_USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLocalUsers(users) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  }
}

function evaluateRole(workCount = 0, selectedCount = 0) {
  if (
    (workCount >= 5 && selectedCount >= 5) ||
    workCount >= 10 ||
    selectedCount >= 10
  ) {
    return 'PRO';
  }

  return 'NORMAL';
}

export async function loginService({ email, password }) {
  await new Promise((r) => setTimeout(r, 500));

  const localUsers = loadLocalUsers();
  const users = [MOCK_USER, MOCK_ADMIN, MOCK_NORMAL, ...localUsers];

  const user = users.find((u) => u.email === email);

  if (!user) return { emailError: '이메일이 일치하지 않습니다.' };
  if (user.password !== password)
    return { passwordError: '비밀번호가 일치하지 않습니다.' };

  let finalRole = user.role;

  if (user.role !== 'ADMIN') {
    finalRole = evaluateRole(user.workCount, user.selectedCount);
  }

  return {
    success: true,
    user: { ...user, role: finalRole },
  };
}

export async function signupService({ email, password, nickname }) {
  await new Promise((r) => setTimeout(r, 500));

  const localUsers = loadLocalUsers();
  const users = [MOCK_USER, MOCK_ADMIN, MOCK_NORMAL, ...localUsers];

  if (users.some((u) => u.email === email)) {
    return { emailError: '이미 존재하는 이메일입니다.' };
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    nickname,
    role: 'NORMAL',
    workCount: 0,
    selectedCount: 0,
  };

  localUsers.push(newUser);
  saveLocalUsers(localUsers);

  return { success: true };
}
