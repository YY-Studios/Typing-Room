export type EmotionType = 'empathy' | 'fun' | 'neutral';
export type LangType = 'ko' | 'en';

type TextContent = {
  lang: LangType;
  texts: string[];
};

type GroupItem = {
  emotion: EmotionType;
  contents: TextContent[];
};
