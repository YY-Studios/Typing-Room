💻 2단계: 소리 재생 엔진 Hook 만들기 (useTypingSound.ts)
이 훅은 FSD 구조에 맞게 src/shared/lib/hooks/useTypingSound.ts 위치에 만들어주시면 좋습니다. 앱이 켜질 때 4개의 소리를 미리 메모리에 싹 올려두고(Pre-load), 타자를 칠 때마다 즉각적으로 쏴주는 역할을 합니다.

```TypeScript
import { useEffect, useRef, useCallback } from 'react';

// 💡 public 폴더에 넣은 두쫀쿠 사운드 파일 4개의 경로
const SOUND_FILES = [
  '/sounds/duzzoncu/key1.wav',
  '/sounds/duzzoncu/key2.wav',
  '/sounds/duzzoncu/key3.wav',
  '/sounds/duzzoncu/key4.wav',
];

export const useTypingSound = () => {
  // Web Audio API의 핵심 컨텍스트와, 미리 로드해둔 4개의 소리 데이터를 담을 ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<AudioBuffer[]>([]);

  useEffect(() => {
    // 1. 오디오 컨텍스트 초기화 (브라우저 호환성 체크)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioCtxRef.current = new AudioContext();

    // 2. 4개의 사운드 파일을 병렬로 빠르게 불러와서 디코딩 (Pre-load)
    const loadSounds = async () => {
      try {
        const buffers = await Promise.all(
          SOUND_FILES.map(async (url) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return await audioCtxRef.current!.decodeAudioData(arrayBuffer);
          })
        );
        buffersRef.current = buffers; // 디코딩된 소리 장전 완료!
      } catch (error) {
        console.error('두쫀쿠 사운드를 불러오는 데 실패했습니다:', error);
      }
    };

    loadSounds();

    // 컴포넌트가 사라질 때 메모리 누수 방지
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  // 💡 3. 실제 타자를 칠 때마다 밖에서 호출할 함수
  const playTypingSound = useCallback(() => {
    if (!audioCtxRef.current || buffersRef.current.length === 0) return;

    // 브라우저 정책: 유저가 화면과 상호작용하기 전에는 오디오가 정지(suspended)되어 있음. 이를 깨워줌.
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // 0, 1, 2, 3 중 랜덤한 숫자 하나 뽑기
    const randomIndex = Math.floor(Math.random() * buffersRef.current.length);
    const buffer = buffersRef.current[randomIndex];

    // 소리 재생용 독립적인 노드 생성 (타자를 1초에 10번 쳐도 소리가 겹치면서 모두 재생됨)
    const source = audioCtxRef.current.createBufferSource();
    source.buffer = buffer;

    // 최종 출력 장치(스피커)에 연결하고 0.00초의 딜레이도 없이 바로 빵! 쏴줌
    source.connect(audioCtxRef.current.destination);
    source.start(0);
  }, []);

  return { playTypingSound };
};
```

3단계: 타이핑 엔진에 연동하기 (useTypingEngine.ts)
이제 예전에 만들어두신 useTypingEngine 훅으로 가서, 글자가 쳐질 때마다 방금 만든 playTypingSound를 호출해주면 됩니다.

```TypeScript
import { useEffect, useRef, useState } from 'react';
import { getStrokeCount } from '@/shared/lib/getStrokeCount';
// 💡 방금 만든 사운드 훅 불러오기
import { useTypingSound } from '@/shared/lib/hooks/useTypingSound';

export const useTypingEngine = (text: string) => {
  const [userInput, setUserInput] = useState('');
  const { playTypingSound } = useTypingSound(); // 💡 훅 초기화

  // ... (기존 변수들)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (Array.from(value).length > chars.length) return;

    // 💡 새로운 글자가 입력되었을 때만 (백스페이스 누를 때 제외) 소리 재생!
    if (value.length > userInput.length) {
      playTypingSound();
    }

    setUserInput(value);
  };

  // ... (나머지 로직)
};

```

🛠️ 코드 통합하기 (useKeyboardInput + useTypingSound)
앞서 만든 무지연 사운드 훅(useTypingSound)을 이 Spline 훅 안으로 가져와서, 키가 눌릴 때 같이 실행되도록 단 한 줄만 추가해 주시면 됩니다.

```TypeScript
import { useEffect } from 'react';
import type { Application } from '@splinetool/runtime';
// 💡 만들어둔 사운드 재생 훅 불러오기
import { useTypingSound } from '@/shared/lib/hooks/useTypingSound';

const KEY_OFFSET = 10;
const KEY_MAP: Record<string, string> = { /* ... 기존과 동일 ... */ };

export function useKeyboardInput(
  splineRef: React.RefObject<Application | null>,
) {
  // 💡 사운드 재생 함수 꺼내기
  const { playTypingSound } = useTypingSound();

  useEffect(() => {
    const pressedKeys = new Set<string>();

    function handleKeyDown(e: KeyboardEvent) {
      const spline = splineRef.current;
      if (!spline) return;

      const splineName = KEY_MAP[e.code];
      // 매핑되지 않은 키거나, 이미 꾹 누르고 있는 상태면 무시
      if (!splineName || pressedKeys.has(e.code)) return;

      pressedKeys.add(e.code);

      // 1. 3D 키보드 쑥! 내려가기
      const obj = spline.findObjectByName(splineName);
      if (obj) obj.position.y -= KEY_OFFSET;

      // 2. 💡 타건음 빵! 재생하기 (시각과 청각의 완벽한 동기화)
      playTypingSound();
    }

    function handleKeyUp(e: KeyboardEvent) {
      // ... (기존과 동일하게 3D 키보드 원상복구 로직)
      const spline = splineRef.current;
      if (!spline) return;

      const splineName = KEY_MAP[e.code];
      if (!splineName) return;

      pressedKeys.delete(e.code);
      const obj = spline.findObjectByName(splineName);
      if (obj) obj.position.y += KEY_OFFSET;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [splineRef, playTypingSound]); // 의존성 배열에 playTypingSound 추가
}
```

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

## 🔊 타건음 프리셋 시스템 설계

### 배경

타건음 프리셋이 10개 이상 추가 확정이라, 처음부터 프리셋 구조를 잡고 가기로 함.

### 폴더 구조

```
public/sounds/
├── duzzoncu/        # 두쫀쿠
│   ├── key1.wav
│   └── ...
├── cherry-blue/     # 청축
│   └── ...
└── {프리셋명}/       # 이후 여기만 추가

src/shared/
├── config/
│   └── soundPresets.ts   # 프리셋 목록 (정적 상수)
└── lib/hooks/
    └── useTypingSound.ts # 사운드 재생 훅
```

```ts
// src/shared/config/soundPresets.ts
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
  // 이후 추가할 때 여기만 넣으면 됨
};

export type SoundPresetKey = keyof typeof SOUND_PRESETS;
```

### 핵심 동작

1. `soundPresets.ts`에 프리셋 메타데이터(이름, 파일 경로) 관리
2. `useTypingSound(presetKey)`로 **선택된 프리셋의 wav만** 메모리에 로드
3. 프리셋 변경 시 기존 AudioContext 해제 → 새 프리셋 로드 (메모리 낭비 방지)
4. 키 입력 시 로드된 wav 중 랜덤 1개를 Web Audio API로 즉시 재생

### 프리셋 추가 방법

1. `public/sounds/{이름}/`에 wav 파일 넣기
2. `soundPresets.ts`에 한 블록 추가 → 끝

```typescript
// 사용 예시
const { playTypingSound } = useTypingSound('duzzoncu');
```

### 참고

- `config` = 프리셋 목록 (정적 상수)
- 유저가 어떤 프리셋을 선택했는지는 추후 Zustand로 관리 예정
