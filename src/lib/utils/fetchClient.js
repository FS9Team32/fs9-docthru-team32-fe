const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const parseJSON = async (res) => {
  try {
    return await res.json();
  } catch {
    return {};
  }
};

export const defaultFetch = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body || null,
    credentials: 'include',
  });

  const data = await parseJSON(res);

  if (!res.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.msg ||
      res.statusText ||
      'API Error';

    throw new Error(message);
  }

  return data;
};

export const tokenFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem('accessToken');

  let res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (res.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      const { accessToken: newAccessToken } = await refreshRes.json();

      localStorage.setItem('accessToken', newAccessToken);

      document.cookie = `accessToken=${newAccessToken}; path=/; max-age=86400`;

      res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
          ...(options.headers || {}),
        },
        credentials: 'include',
      });
    }
  }

  const data = await parseJSON(res);
  if (!res.ok) throw new Error(data.message || 'API Error');
  return data;
};
