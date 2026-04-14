'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/api/client/clientApi';

interface Profile {
  id: string;
  nickname: string;
  avatar_url: string | null;
  created_at: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<Profile | null>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        return await clientApi<Profile>('auth/me');
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분
    retry: false,
  });

  const login = () => {
    window.location.href = '/api/auth/kakao';
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    queryClient.setQueryData(['auth', 'me'], null);
  };

  return {
    user: user ?? null,
    isLoading,
    isLoggedIn: !!user,
    login,
    logout,
  };
};
