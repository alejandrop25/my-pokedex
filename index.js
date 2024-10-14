const totalPokemons = 150; 

async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
}

async function displayPokemons() {
        const container = document.getElementById('pokemon-container');

        for (let i = 1; i <= totalPokemons; i++) {
            const pokemon = await fetchPokemon(i);
            const pokemonElement = document.createElement('div');
            switch(pokemon.types[0].type.name){
                case "grass":
                    pokemonElement.className = 'pokemon grass';
                    break;
                case "electric":
                    pokemonElement.className = 'pokemon electric';
                    break;
                case "fire":
                    pokemonElement.className = 'pokemon fire';
                    break;
                case "water":
                    pokemonElement.className = 'pokemon water';
                    break;
                case "bug":
                    pokemonElement.className = 'pokemon bug';
                    break;
                case "normal":
                    pokemonElement.className = 'pokemon normal';
                    break;
                case "poison":
                    pokemonElement.className = 'pokemon poison';
                    break;
                default:
                    pokemonElement.className = 'pokemon';
                    break;
            }
            //pokemonElement.className = 'pokemon';
            pokemonElement.innerHTML = `
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            `;
            container.appendChild(pokemonElement);
        }
}

displayPokemons();