import { useRef, useEffect, useCallback } from 'react';
import { SOUND_PRESETS, SoundPresetKey } from '@/shared/config/soundPresets';

export const useTypingSound = (currentTheme: SoundPresetKey = 'duzzoncu') => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<AudioBuffer[]>([]);

  useEffect(() => {
    // 1. 오디오 컨텍스트 초기화 (브라우저 호환성 체크)
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const preset = SOUND_PRESETS[currentTheme];
    if (!preset) return;

    const loadSounds = async () => {
      try {
        const urls = preset.files.map(
          (file) => `/sound/${preset.path}/${file}`,
        );

        const buffers = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return await audioCtxRef.current!.decodeAudioData(arrayBuffer);
          }),
        );
        buffersRef.current = buffers;
      } catch (error) {
        console.error(
          `[${preset.label}] 사운드를 불러오는 데 실패했습니다:`,
          error,
        );
      }
    };
    loadSounds();
  }, [currentTheme]);

  const playTypingSound = useCallback(() => {
    if (!audioCtxRef.current || buffersRef.current.length === 0) return;

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    const randomIndex = Math.floor(Math.random() * buffersRef.current.length);
    const buffer = buffersRef.current[randomIndex];

    const source = audioCtxRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtxRef.current.destination);
    source.start(0);
  }, []);

  return { playTypingSound };
};
