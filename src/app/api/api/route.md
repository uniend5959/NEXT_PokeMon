# Next.js의 내부 서버 (Route Handlers)

[사용자 브라우저]
|
(데이터 요청: /api/badge-condition)
|
+-----------------------------------------+
| [Next.js 서버] |
| |
| +-----------------------------------+ |
| | app/api/badge-condition/route.ts | | <-- 바로 이 부분!
| | - GET 요청 처리 | | Next.js 서버 안에 있는 작은 API
| | - 데이터 가공/조작 | |
| +-----------------------------------+ |
| |
+-----------------------------------------+

- 사용자 브라우저(주로 클라이언트 컴포넌트)는 /api/badge-condition처럼 우리 Next.js 프로젝트의 주소로 API를 요청합니다.
- 그러면 Next.js 서버가 이 요청을 받아서 route.ts 파일에 있는 코드를 실행하고 그 결과를 다시 브라우저에 응답해 줍니다.

## route.ts

Next.js App Router에서는 파일과 폴더 이름이 아주 중요한 약속(Convention)입니다
route.ts (또는 route.js) 라는 이름의 파일이 있으면, "아, 이 경로는 UI 페이지가 아니라 API 엔드포인트로 만들어야겠구나!" 라고 인식합니다.

### page.tsx vs route.ts

같은 폴더 안에 있더라도 두 파일은 완전히 다른 역할을 합니다.

1. page.tsx (UI 페이지):
   React 컴포넌트를 export default 해야 합니다.
   역할: 해당 경로로 접속했을 때 사용자에게 보여줄 **HTML 화면(UI)**을 렌더링합니다.
   예시: app/dashboard/page.tsx -> /dashboard 경로의 화면.

2. route.ts (API 엔드포인트):
   GET, POST, PUT, DELETE 등 HTTP 메서드(동사) 이름으로 된 함수를 export 해야 합니다.
   역할: 해당 경로로 API 요청이 들어왔을 때 데이터(주로 JSON)를 응답해주는 서버 로직을 실행합니다. UI가 없습니다.
   예시: app/api/users/route.ts -> /api/users 경로의 API.

## route.ts 예시

```ts
// app/api/badge-condition/route.ts

import { NextResponse } from "next/server";

// GET 요청을 처리하는 함수
export async function GET(request: Request) {
  const badgeConditions = [
    { id: 1, name: "첫 방문 뱃지", condition: "사이트에 1번 이상 로그인" },
    { id: 2, name: "글 작성 뱃지", condition: "게시글 1개 이상 작성" },
  ];

  // JSON 형태로 데이터를 응답합니다.
  return NextResponse.json({ data: badgeConditions });
}

// POST 요청을 처리하는 함수 (예시)
export async function POST(request: Request) {
  // ... 새로운 뱃지 조건을 생성하는 로직
  return NextResponse.json({ message: "새로운 뱃지 조건이 생성되었습니다." });
}
```

## 클라이언트에서 호출하기

```ts
// 클라이언트 컴포넌트 어딘가에서...
async function fetchBadgeConditions() {
  // 우리 프로젝트 내부의 API 경로를 호출
  const response = await fetch("/api/badge-condition");
  const result = await response.json();
  console.log(result.data); // [{ id: 1, ... }, { id: 2, ... }]
}
```
