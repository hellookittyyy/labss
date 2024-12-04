function getLinkId() {
  let id = window.location.href.split("id=")[1];

  if (id) {
    return id;
  }

  return 0;
}

function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  pokemonCard.innerHTML = `
    <a href="pokemon_info.html?id=${pokemon.url.split("/")[6]}">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.url.split("/")[6]
      }.png" alt="${pokemon.name}" />
      <div class="pokemon-card__info">
        <h2>${pokemon.name}</h2>
        <div class="pokemon-card__types"></div>
      </div>
    </a>
  `;

  return pokemonCard;
}

function loadMainPage() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const container = document.querySelector(".container");
        data.results.forEach((pokemon) => {
          const pokemonCard = createPokemonCard(pokemon);
          container.appendChild(pokemonCard);
        });
      });
  } catch (error) {
    console.log(error);
  }
}

function loadPokemonInfo(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let abilities = data.abilities;
        let voices = data.cries;
        let moves = data.moves;
        let stats = data.stats;

        const img = document.querySelector("#picture");
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        img.alt = data.name;
        const name = document.querySelector("#name");
        name.innerHTML = data.name;

        stats.forEach((stat) => {
          const statInfo = document.querySelector(".pokemon-info__stats");
          statInfo.innerHTML += `
            <p>${stat.stat.name}: ${stat.base_stat}</p>
          `;
        });
        abilities.forEach((ability) => {
          const abilityInfo = document.querySelector(
            ".pokemon-info__abilities"
          );
          abilityInfo.innerHTML += `
            <p>${ability.ability.name}</p>
          `;
        });

        const voiceInfo = document.querySelector(".pokemon-info__voices");
        voiceInfo.innerHTML += `
            <p>Latest</p><audio src="${voices.latest}" controls></audio>
            <p>Legacy</p>
            <audio src="${voices.legacy}" controls></audio>
          `;

        moves.forEach((move) => {
          const moveInfo = document.querySelector(".pokemon-info__moves");

          moveInfo.innerHTML += `
            <p>${move.move.name}</p>
          `;
        });
      });
  } catch (error) {
    console.log(error);
  }
}

function main() {
  let id = getLinkId();

  if (id == 0) {
    loadMainPage();
    return;
  } else {
    loadPokemonInfo(id);
  }
}

main();
