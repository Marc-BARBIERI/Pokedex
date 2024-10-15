import { BaseUrl } from "./config.js";
let allPokemons = [];

export async function getAllPokemons() {
  try {
    const httpResponse = await fetch(`${BaseUrl}/pokemons`);
    allPokemons = await httpResponse.json();
    allPokemons.forEach((pokemon) => {
      insertPokemonInHTML(pokemon);
    });
  } catch (error) {
    console.error("Erreur lors de l'appel des Pokémons: ", error);
  }
}

export function insertPokemonInHTML(pokemonData) {
  const pokemonTemplate = document.querySelector(".template-pokemon");
  const newPokemon = document.importNode(pokemonTemplate.content, true);

  newPokemon.querySelector(".pokemon__name").textContent = pokemonData.name;

  const pokemonImage = newPokemon.querySelector("img");
  pokemonImage.src = `./assets/img/${pokemonData.id}.webp`;
  pokemonImage.alt = pokemonData.name;

  const typesContainer = newPokemon.querySelector(".pokemon__types");

  pokemonData.types.forEach((type) => {
    const typeElement = document.createElement("span");
    typeElement.textContent = type.name;
    let color;
    if (type.color.startsWith("#")) {
      color = type.color;
    } else {
      color = `#${type.color}`;
    }
    typeElement.style.backgroundColor = color;
    typeElement.classList.add("pokemon__type");
    typesContainer.appendChild(typeElement);
  });

  document.querySelector(".pokemons").append(newPokemon);

  pokemonImage.addEventListener("click", () => {
    const pokemonModal = document.querySelector("#pokemon-modal");
    const modalBody = pokemonModal.querySelector(".modal-card-body");

    modalBody.innerHTML = `
      <div class="pokemon__name">${pokemonData.name}</div>
      <img class="image" src="./assets/img/${pokemonData.id}.webp" alt="${
      pokemonData.name
    }">
      <div class="pokemon__types">Types: ${pokemonData.types
        .map((type) => type.name)
        .join(", ")}</div>
      <div class="pokemon__hp">HP: ${pokemonData.hp}</div>
      <div class="pokemon__atk">Attack: ${pokemonData.atk}</div>
      <div class="pokemon__def">Defense: ${pokemonData.def}</div>
      <div class="pokemon__atk_spe">Sp. Attack: ${pokemonData.atk_spe}</div>
      <div class="pokemon__def_spe">Sp. Defense: ${pokemonData.def_spe}</div>
      <div class="pokemon__speed">Speed: ${pokemonData.speed}</div>
    `;

    openModal();
  });
}

function openModal() {
  const pokemonModal = document.querySelector("#pokemon-modal");
  const modalBackground = document.querySelector(
    "#pokemon-modal .modal-background"
  );

  pokemonModal.style.display = "block";
  document.body.classList.add("modal-open");

  pokemonModal.showModal();

  pokemonModal.animate(
    [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
    { duration: 300, fill: "forwards", easing: "ease-out" }
  );

  modalBackground.addEventListener("click", closeModal);
}

function closeModal() {
  const pokemonModal = document.querySelector("#pokemon-modal");
  const animation = pokemonModal.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
    { duration: 300, fill: "forwards", easing: "ease-out" }
  );

  animation.onfinish = () => {
    pokemonModal.style.display = "none";
    document.body.classList.remove("modal-open");
    pokemonModal.close();
  };
}
const pokemonModal = document.querySelector("#pokemon-modal");
pokemonModal.style.display = "none";

const closeButton = document.querySelector(
  "#pokemon-modal .button-modal.close"
);
closeButton.addEventListener("click", closeModal);

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase();
  filterPokemons(searchValue);
});


export function filterPokemons(query) {
  document.querySelector(".pokemons").innerHTML = "";
  const filteredPokemons = allPokemons.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(query);
    const typeMatch = pokemon.types.some((type) =>
      type.name.toLowerCase().includes(query)
    );
    return nameMatch || typeMatch;
  });

  filteredPokemons.forEach((pokemon) => {
    insertPokemonInHTML(pokemon);
  });
}

