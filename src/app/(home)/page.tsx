import PokemonList from "@/components/Pokemon/PokemonList";
import { Suspense } from "react";



export default function Home() {
  return (
    <>
      <div className="">
        <h1>포켓몬 목록 </h1>
        <Suspense fallback={'... 기다리고 있는 중 '}>
          <PokemonList/>
        </Suspense>
      </div>
    </>
  );
}
