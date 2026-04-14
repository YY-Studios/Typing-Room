const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface ServerApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export const serverApi = async <T>(
  path: string,
  options?: ServerApiOptions,
): Promise<T> => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    method: options?.method ?? 'GET',
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Supabase error: ${res.status} ${error}`);
  }

  const text = await res.text();
  if (!text) return [] as T;
  return JSON.parse(text) as T;
};
