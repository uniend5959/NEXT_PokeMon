
"use client"

import { PATH } from "@/constans/path";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header(){
    // 주소의 url의 이름 받아오기 
    const pathName = usePathname()
    const isPathPokemon = pathName.startsWith(PATH.POKEMON)

    return(
        <>
            {/* twmerge랑 clsx를 합쳐서 사용할 수 있는 util 함수 cn  */}
            <div className={cn('w-full h-14 md:h-16 lg:h-20 drop-shadow-lg fixed z-50',{
                'bg-green-500' :isPathPokemon,
                'bg-red-500' : !isPathPokemon
            })}>
                <div className="main-container py-2  h-full flex-Between ">
                    <Link href="/">
                          <Image 
                            src='/pokemon-logo.png'
                            alt="logo"
                            width={920}
                            height={518} 
                            //  원본크기를 알려주고 class로 조절해서 반응형 만들기 
                            className="w-24 md:w-28 h-auto"
                        ></Image>
                    </Link>
                    <ul className="flex-Between gap-4 font-bold text-white">
                        <li>메뉴 1</li>
                        <li>메뉴 2</li>
                        <li>메뉴 3</li>
                        <li>메뉴 4</li>
                    </ul>
                </div>
            </div>
        </>
    )
}