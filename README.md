# My Agent App

폰에 설치하는 개인용 슈퍼앱(PWA). 앱 안에 여러 모듈이 들어 있습니다.

| 모듈 | 경로 | 상태 |
| --- | --- | --- |
| 미국 방문 (UCSB 방문연수 플래너) | `#/ucsb` | 사용 가능 |
| 가계부 | `#/budget` | 준비 중 |
| 게임 | `#/games` | 준비 중 |

구성: React 19 + TypeScript + Vite, Cloudflare Workers(정적 파일 + API) + D1(DB).
`main` 브랜치에 올리면 GitHub Actions가 자동으로 배포하고, 설치된 앱에는 "새 버전이 있어요 · 새로고침"이 뜹니다.

## 폴더

- `src/shell/` 홈 화면, 라우팅(`#/모듈`), PWA 등록·업데이트 안내
- `src/shell/apps.ts` 모듈 목록 (새 모듈은 여기 한 줄 + `src/apps/<id>/`)
- `src/apps/ucsb/` 기존 UCSB Journey 화면·계산 로직 (원본 그대로 복사, 홈 버튼만 추가)
- `worker/index.ts` API (`/api/planner`: GET/PUT, revision 충돌 시 409)
- `migrations/` D1 테이블
- `src/sw-template.js` 서비스 워커 (빌드마다 버전 갱신, `/api/`는 캐시 안 함)

## 로컬 실행

```sh
npm install
npm run db:local        # 처음 한 번
npm run dev             # 개발 서버
npm run check           # 계산 검증 24개
npm run build           # 타입 검사 + 빌드
```

## 처음 한 번 설정 (Cloudflare)

1. 대시보드 > Storage & Databases > D1 > Create: 이름 `my-agentai-app-db`. 생성된 Database ID를 `wrangler.jsonc`의 `database_id`에 넣습니다.
2. 대시보드 > My Profile > API Tokens > Create Token > "Edit Cloudflare Workers" 템플릿 + 권한에 **D1: Edit** 추가.
3. GitHub 저장소 > Settings > Secrets and variables > Actions 에 `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` 등록.
4. 첫 배포 후 Zero Trust > Access > Applications > Self-hosted 로 `my-agentai-app.<계정>.workers.dev` 전체를 보호하고, 정책에 본인 이메일만 허용.

**Access 설정 전에는 주소를 아는 누구나 데이터를 볼 수 있습니다.** API 자체에는 로그인 기능이 없습니다.

## 기존 사이트 데이터 옮기기

기존 사이트 설정 > 전체 데이터 JSON 백업 → 받은 JSON을 `{ "data": <JSON>, "revision": <현재 revision> }` 형태로 `PUT /api/planner`.
