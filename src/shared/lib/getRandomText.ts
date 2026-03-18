import { mokTexts } from '@/features/screen/constants/mokTexts';
import { EmotionType, LangType } from '@/features/screen/type/type';

export const getRandomText = ({
  emotion,
  language,
}: {
  emotion: EmotionType;
  language: LangType;
}) => {
  const emotionType = mokTexts.find((item) => item.emotion === emotion);

  const langType = emotionType?.contents.find(
    (content) => content.lang === language,
  );

  const randomIndex = Math.floor(
    Math.random() * Number(langType?.texts.length),
  );

  return langType?.texts[randomIndex];
};
