import { z } from 'zod/v4';

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, '2자 이상 입력해주세요')
    .max(20, '20자 이하로 입력해주세요')
    .regex(/^[가-힣a-zA-Z0-9_]+$/, '한글, 영문, 숫자, _만 가능해요'),
});

export type NicknameFormData = z.infer<typeof nicknameSchema>;
