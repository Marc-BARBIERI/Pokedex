import * as pokemonManager from "./pokemon.js";




document.addEventListener("DOMContentLoaded", init);


async function init() {
  
  
 
  await pokemonManager.getAllPokemons();
   
}