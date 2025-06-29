# next 통신 핵심

## 1. 외부 apis 폴더 (또는 lib, services 등)

**통신 대상**: 외부 도메인에 있는 백엔드 서버 (팀 동료의 Java 서버, 공개된 포켓몬 API 등)
**주요 목적**: 외부에서 데이터를 가져오거나(GET), 외부로 데이터를 보내기(POST, PATCH 등) 위한 함수들을 정의하는 곳입니다.
**주요 파일**:

- fetch나 axios를 한번 감싸서 만든 커스텀 인스턴스 (httpMethod.ts 같은 파일)
- TanStack Query 같은 라이브러리를 사용하기 위한 커스텀 훅 (use...Query, use...Mutation 등)

## 2. 내부 app/api/.../route.ts

**역할**: API 제공자 (Provider / Server)
**통신 대상**: 우리 Next.js 프로젝트 자신 (주로 클라이언트 컴포넌트나 다른 서버 로직)
**주요 목적**:

- BFF(Backend for Frontend): 외부 API에서 가져온 데이터를 프론트엔드에서 쓰기 좋게 가공해서 전달.
- 보안: API 키나 비밀 값들을 서버(여기!)에 안전하게 숨기고, 클라이언트에는 결과만 전달.
- 간단한 백엔드 기능: 데이터베이스에 간단히 CRUD 하는 등의 가벼운 백엔드 로직을 직접 구현.
  **주요 파일**:
  route.ts (또는 route.js)

## 관심사의 분리(Separation of Concerns)"**와 **"폴더 구조"\*\*

### 서버사이드 통신 할때 방법

### 컴포넌트와 데이터 페칭 로직을 결합

**폴더구조**
components/
└── movie-info/
└── index.tsx (또는 movie-info.tsx)

---

```ts
// 데이터를 가져오는 로직과 UI를 그리는 로직이 한 파일에 존재
async function getMovieInfo(id: string) {
  const res = await fetch(`https://api.example.com/movies/${id}`);
  return res.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovieInfo(id);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
}

// 사용하는 곳 (app/movies/[id]/page.tsx)
import MovieInfo from "@/components/movie-info";
import { Suspense } from "react";

export default function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<div>영화 정보 로딩중...</div>}>
      <MovieInfo id={params.id} />
    </Suspense>
  );
}
```

**장점**:

- 응집도(Cohesion)가 높다: MovieInfo와 관련된 모든 코드가 한곳에 모여 있어 찾기 쉽습니다.
  직관적이다: 작은 규모의 컴포넌트나 프로젝트에서는 구조가 단순해서 이해하기 빠릅니다.
- 초기 개발 속도가 빠르다: 파일을 여러 개 만들 필요 없이 한 곳에서 빠르게 작업할 수 있습니다.

**단점**:

- 재사용성이 떨어진다: 만약 다른 컴포넌트에서도 getMovieInfo 데이터만 필요하다면? 이 함수를 가져오기 위해 UI 컴포넌트 파일인 MovieInfo.tsx를 import 해야 하는 어색한 상황이 생깁니다.
- 관심사 분리가 안됨: 데이터 로직(how to fetch)과 UI 로직(how to display)이 섞여 있어 코드가 길어지면 복잡해집니다.
  테스트가 어렵다: UI 컴포넌트와 데이터 페칭 로직을 분리해서 테스트하기 어렵습니다.

---

### 데이터 페칭 로직과 컴포넌트를 분리

**폴더구조**
lib/ # 또는 services/, api-clients/ 등
└── data.ts # 또는 movies.ts
components/
└── MovieInfo.tsx

```ts
// 데이터 로직은 여기에만 존재
//lib/data.ts 파일 내용:
export async function getMovieInfo(id: string) {
  const res = await fetch(`https://api.example.com/movies/${id}`);
  // 에러 처리, 데이터 정제 등을 여기서 수행
  if (!res.ok) throw new Error("Failed to fetch movie info");
  return res.json();
}

//components/MovieInfo.tsx 파일 내용:
import { getMovieInfo } from "@/lib/data";

// UI 로직은 여기에만 존재
export default async function MovieInfo({ id }: { id: string }) {
  // 데이터 로직을 호출해서 사용만 한다
  const movie = await getMovieInfo(id);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
}
// 후에 <MovieInfo/> 를 suspence로 임폴트해서 사용
```

**장점:**

- 관심사의 명확한 분리: 데이터는 lib, UI는 components. 역할이 명확합니다.
- 높은 재사용성: getMovieInfo 함수는 이제 어떤 컴포넌트에서든, 심지어 서버 액션이나 Route Handler에서도 쉽게 가져다 쓸 수 있는 순수한 "데이터 함수"가 됩니다.
- 유지보수 용이: API 명세가 바뀌면 lib/data.ts 파일만 수정하면 됩니다. UI 코드를 건드릴 필요가 없습니다.
- 테스트 용이성: getMovieInfo 함수를 UI 렌더링 없이 독립적으로 테스트할 수 있습니다.
  **단점:**
- 초기 설정 시 만들어야 할 파일과 폴더가 조금 더 많습니다.
- 아주 작은 프로젝트에서는 과하게 구조를 나누는 것처럼 느껴질 수 있습니다.

## 각폴더의 역할

### lib/api.ts (가장 순수한 재료)

- **역할**: React나 다른 라이브러리에 의존성이 없는, 순수한 async 데이터 페칭 함수를 모아두는 곳입니다. 오직 fetch를 사용해 외부 API와 통신하고 데이터를 반환하는 역할만 합니다.
- **특징**: 여기서 만든 함수들은 서버 컴포넌트에서도 await로 호출할 수 있고, **React Query의 queryFn, mutationFn**에서도 재사용할 수 있습니다. 이게 핵심입니다!

### api/httpMethod.ts를 생성해 중복을 줄이기

- **중복 제거 (Don't Repeat Yourself)**: baseURL이나 공통 헤더(Authorization, Content-Type 등)를 모든 API 함수마다 반복해서 적을 필요가 없어집니다. httpMethod.ts 한 곳에서만 관리하면 됩니다.
- **일관된 에러 처리**: httpMethod.ts에서 res.ok가 아닐 때 공통으로 에러를 던지도록 설정해두면, 개별 API 함수에서는 성공했을 때의 로직에만 집중할 수 있습니다. 코드가 훨씬 깔끔해집니다.
- **유지보수 용이**: 만약 API 서버의 주소가 바뀌거나, 인증 방식이 토큰에서 다른 것으로 변경된다면? httpMethod.ts 파일 딱 하나만 수정하면 프로젝트의 모든 API 요청에 반영됩니다. 재앙을 막을 수 있죠.

**간결해진 lib/api.ts**

```ts
// lib/api.ts
import { http } from "@/apis/httpMethod"; // ✨ 바로 여기!

export async function patchBookmark(
  pokemonName: string,
  isBookmarked: boolean
): Promise<void> {
  // 공통 로직은 신경 쓸 필요 없이, 어떤 URL에 어떤 데이터를 보낼지에만 집중!
  await http.patch("/bookmarks", { pokemonName, isBookmarked });
}
```

## 리액트 쿼리의 사용

### 데이터 흐름 종합

**초기 페이지 로드 (SSG/SSR):**

- app/page.tsx(서버 컴포넌트)가 lib/api.ts의 getPokemons()를 직접 await로 호출.
  빠르게 렌더링된 HTML을 사용자에게 보여줌. (SEO, 성능 👍)

**사용자 상호작용 (CSR):**

- 사용자가 <BookmarkButton>을 클릭.
  useBookmarkMutation 훅이 mutate 함수를 실행.
  훅 내부의 mutationFn이 lib/api.ts의 patchBookmark 함수를 호출하여 서버에 요청.
  요청 성공 시 onSuccess 콜백이 실행되어 관련 쿼리(pokemons)를 무효화시키고, React Query가 자동으로 데이터를 갱신하여 UI가 바뀜.

**폴더구조**
├── hooks/
│ └── api/ # ✨ React Query 커스텀 훅 전용 폴더
│ ├── usePokemonsQuery.ts
│ └── useBookmarkMutation.ts

**예시코드**

```ts
// hooks/api/useBookmarkMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBookmark } from "@/lib/api"; // 순수 함수 import

export function useBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, status }: { name: string; status: boolean }) =>
      patchBookmark(name, status), // lib/api의 함수를 그대로 사용
    onSuccess: () => {
      // 뮤테이션 성공 시 'pokemons' 쿼리를 무효화시켜서
      // 데이터를 자동으로 다시 불러오게 함 (UI 자동 갱신)
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
}
```
