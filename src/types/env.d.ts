// declare : 이런 타입이 있다는걸 선언하며, 믿고 사용해 
// global : 전역으로 등록해서 쓰는 타입이야  어디서든 import 없이 사용가능해 
// namepace : 관련된 타입을 하나로 묶어주는것 
// NodeJs : 타입스크립트가 기본으로 알고있는 NodeJs라는 그룹에 내용을 추가로 덧붙일게 
// interface : 객체로 된 모양으로 이 객체안의 속성들의 타입의 종류를 정의하는 것 
// ProgressEnv : 원래 등록되어있던 인터페이스에, 내용 추가할게  
export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_SERVER_URL : string
        }
    }
}