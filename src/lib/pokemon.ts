import { BASE_URL, END_POINT } from "@/constans/api"


// 포켓몬의 목록을 불러오는 함수 
export const getPokemonList =  async () => {
    let pokemonsList;
    try{
         const res = await fetch(`${BASE_URL}/${END_POINT.POKEMON}`)
         if(res.status === 200){
            const pokemos = await res.json()
            // console.log(pokemos)

               
            // 돌아오는 결과가 이름, 해당 캐릭터에 대한 정보를 담은 url임으로 또 한번의 정보요청 fetch가 필요함 
            // 여러개의 url을 동시에 fetch 하는 것임으로 순차적 요청이 아닌 동시에 처리하는 병렬적 요청이 필요함
            // 따라서 promiss.all을 시도함 

            const detailfetch = pokemos.results.map((pokemon) => {
               return fetch(pokemon.url).then((res) => res.json() )
            })

            const data = await Promise.all(detailfetch)
            console.log('데이터 확인 ' , data)

             pokemonsList  = data.map((pokemon) => ({
                id: pokemon.id,
                weight : pokemon.weight,
                height: pokemon.height,
                img : pokemon.sprites.front_default,
                experience : pokemon.base_experience,
                types : pokemon.types
            }))

         }
        //  console.log(' 포켓몬 정보확인', pokemonsList)
         return pokemonsList
    }

    catch(error){
        console.log(error)
    }
}


