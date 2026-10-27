# fridgelog-web

granroot.com의 냉장고야(FridgeLog) 웹. 앱이 추천 카드에서 외부 브라우저로 여는 `/r/{slug}` 페이지와 재료 허브 `/i/{slug}`.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 공개 문서가 있는 재료 목록 (냉동고 / 냉장고) |
| `/i/{slug}` | 재료 허브: 해동, 레시피 목록, 보관법 |
| `/r/{slug}` | 레시피·해동 상세. ① 상태 확인 → ② 재료 → ③ 만들기 → ④ 실패 포인트 → ⑤ 보관법 |
| `/r/storage-*` | 보관법은 독립 페이지가 없어서 재료 허브로 보냄 |

제휴 블록(⑥)은 쿠팡 파트너스 승인 후 추가한다.

## 데이터

Supabase **anon(publishable) 키**로 PostgREST를 직접 읽는다. RLS가 `published=true` 문서만 보여 주고, 코드에서도 `published=eq.true`를 붙인다. service_role 키는 이 저장소 어디에도 넣지 않는다.

```
SUPABASE_URL=https://dbmcsaerwqvlzzloiwou.supabase.co
SUPABASE_ANON_KEY=...
```

페이지는 1시간마다 다시 만들어진다(ISR). `publish.py`로 문서를 공개하거나 내리면 최대 1시간 뒤 사이트에 반영된다.

## 그 밖에

- 공유 썸네일: `opengraph-image.tsx` (한글은 Noto Sans KR을 필요한 글자만 받아 그림)
- 방문 측정: Vercel Analytics
- 예전 티스토리 주소(`/entry/*`, `/123` 등)는 `blog.granroot.com`으로 영구 리다이렉트 (`next.config.ts`)

## 개발

```
npm install
npm run dev
```
