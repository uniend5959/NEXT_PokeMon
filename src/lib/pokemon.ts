import { BASE_URL } from "@/constans/api"


export const getPokemon =  async () => {
    const res = await fetch(`${BASE_URL}`)
    console.log(res)
    return res.json()
}


