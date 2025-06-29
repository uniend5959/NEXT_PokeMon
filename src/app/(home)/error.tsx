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