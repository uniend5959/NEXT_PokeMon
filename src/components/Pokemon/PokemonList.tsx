

// 최초 접속시 서버사이드 ssg로 html 렌더링 하기 위해 비동기 함수로 시작 

import { getPokemon } from "@/lib/pokemon"

export default async function PokemonList(){
    const pokemons = await getPokemon()
    return (
        <>
            {JSON.stringify(pokemons)}
        </>
    )
}