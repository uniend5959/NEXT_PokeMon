
// props로 error와 reset을 받는 건 not-found.tsx가 아닌 error.tsx 
// not-found.tsx는 props로 아무것도 받지 못한다. 
// error.tsx는 클라이언트 컴포넌트, not-found.tsx는 서버클라이언트 
// css ui적 요소를 위해 클라이언트 컴포넌트로 변경함 



export default function NotFound(){
    return(
        <>
        <h1>에러페이지 입니다. </h1>
        </>
    )
}