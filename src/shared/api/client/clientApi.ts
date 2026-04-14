interface ClientApiOptions {
  method?: string;
  body?: unknown;
}

const request = async (path: string, options?: ClientApiOptions) => {
  return fetch(`/api/${path}`, {
    credentials: 'include',
    method: options?.method ?? 'GET',
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
};

export const clientApi = async <T>(
  path: string,
  options?: ClientApiOptions,
): Promise<T> => {
  let res = await request(path, options);

  // 401이면 리프레시 시도 → 재요청
  if (res.status === 401) {
    const refreshRes = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      res = await request(path, options);
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: '요청 실패' }));
    throw new Error(error.message ?? '요청 실패');
  }

  return res.json();
};
