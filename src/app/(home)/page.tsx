import PokemonList from "@/components/Pokemon/PokemonList";
import { Metadata } from "next";



export default function Home() {
  return (
    <>
      <div className="">
        <PokemonList/>
      </div>
    </>
  );
}
