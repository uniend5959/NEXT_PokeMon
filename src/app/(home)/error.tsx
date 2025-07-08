"use client"


import { useRouter } from "next/navigation"
import { startTransition, useEffect } from "react"


// error.tsx는 not-fuoned랑 다르게 반드시 클라이언트 컴포넌트여야한다. 
// error 와 reset을 props로 받는다. 

export default function Error({error, reset} : { error : Error, reset: () => void}){

    const router = useRouter()
    
    useEffect(() => {
        console.log(error.message)
    }, [error])

    return (
        <>
            <div className="">
                {/* starTransiton : ui 변경시 즉각 변경되서 멈추는느낌이 아닌, 서서히 느긋히 변하도록하는 함수 
                reset을 통해 error 페이지를 다시 정상렌더링 시도 
                router.refresh 로 서버에 다시한번 데이터 재요청 */}

                <button onClick={ () => {
                      startTransition(() => {
                        router.refresh()
                        reset()
                    })
                }
                }>
                    click
                </button>
            </div>
        </>
    )
}