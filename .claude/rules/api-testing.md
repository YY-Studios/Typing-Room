# API 라우트 테스트 규칙

## 필수 조건

`src/app/api/` 하위 파일을 생성하거나 수정한 경우, **작업 완료 전에 반드시 curl 테스트를 실행**해야 한다.

## 테스트 범위

- 변경된 API 엔드포인트의 **정상 응답** (200/201/307 등)
- **에러 케이스** (401, 403, 400 등)
- 쿠키/헤더가 응답에 정상 포함되는지 확인

## 테스트 방법

```bash
# 기본 응답 확인
curl -s http://localhost:3000/api/{path} -w "\n%{http_code}"

# 리다이렉트 + 쿠키 확인
curl -s http://localhost:3000/api/{path} -o /dev/null -w "%{http_code}" -D - 2>&1 | grep -iE "HTTP|set-cookie|location"

# POST 요청
curl -s http://localhost:3000/api/{path} -X POST -w "\n%{http_code}"
```

## 금지 사항

- API 라우트 수정 후 테스트 없이 "완료"라고 보고하는 것
- 프론트에서만 확인하고 API 단독 테스트를 생략하는 것
