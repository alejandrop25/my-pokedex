const totalPokemons = 200;

async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
}

async function displayPokemons() {
        const container = document.getElementById('pokemon-container');

        for (let i = 1; i <= totalPokemons; i++) {
            const pokemon = await fetchPokemon(i);
            const pokemonElement = document.createElement('div');
            const types = pokemon.types.map(typeInfo => {
                return `<span class="pokemon-tags">${typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}</span>`;
            }).join('');
            pokemonElement.className = 'pokemon';
            pokemonElement.innerHTML = `
            <div class="pokemons-div ${pokemon.types[0].type.name}">
                <div class="pokecard-head">
                    <p>${types}</p>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                </div>
                <hr>
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
            `;
            container.appendChild(pokemonElement);
        }
}

displayPokemons();