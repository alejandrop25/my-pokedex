const totalPokemons = 400;

const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B0B0',
    normal: '#A8A878'
};

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error(`Error fetching Pokémon ${id}`);
        return response.json();
    } catch (error) {
        console.error(error);
        return null; // case fail
    }
}

async function displayPokemons() {
    const container = document.getElementById('pokemon-container');
    
    container.innerHTML = '<p>Loading Pokémon...</p>';
    

    const pokemonPromises = [];
    for (let i = 1; i <= totalPokemons; i++) {
        pokemonPromises.push(fetchPokemon(i));
    }

    const pokemons = await Promise.all(pokemonPromises);
    container.innerHTML = ''; 

    pokemons.forEach(pokemon => {
        if (pokemon) { 
            const pokemonElement = document.createElement('div');
            const types = pokemon.types.map(typeInfo => {
                const typeName = typeInfo.type.name;
                const backgroundColor = typeColors[typeName] || '#FFFFFF';
                return `
                    <span class="pokemon-tags" style="background-color: ${backgroundColor};">${typeName.charAt(0).toUpperCase() + typeName.slice(1)}</span>
                `;
            }).join('');
            pokemonElement.className = 'pokemon';
            pokemonElement.innerHTML = `
            <a href="./pokemon-details.html?id=${pokemon.id}" target="_self" class="pokemon-link">
                <div class="pokemons-div ${pokemon.types[0].type.name}">
                    <div class="pokecard-head">
                        <p>${types}</p>
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                    </div>
                    <hr>
                    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                </div>
            </a>
            `;
            container.appendChild(pokemonElement);
        }
    });
}

displayPokemons();
