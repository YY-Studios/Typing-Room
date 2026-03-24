export interface SoundPreset {
  label: string;
  path: string; // /sounds/{path}/
  files: string[];
}

export const SOUND_PRESETS: Record<string, SoundPreset> = {
  duzzoncu: {
    label: '두쫀쿠',
    path: 'duzzoncu',
    files: ['key1.wav', 'key2.wav', 'key3.wav', 'key4.wav'],
  },
  honey: {
    label: '꿀',
    path: 'honey',
    files: ['key1.wav', 'key2.wav', 'key3.wav'],
  },
};

export type SoundPresetKey = keyof typeof SOUND_PRESETS;
