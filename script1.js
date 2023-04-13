let allPokemon = [];
let nextPokemonList = `https://pokeapi.co/api/v2/pokemon/`;

async function loadPokemons() {
    let url = nextPokemonList;
    let response = await fetch(url);
    let firstList = await response.json();
    nextPokemonList = firstList.next;

    for (let i = 0; i < firstList.results.length; i++) {
        let url = firstList.results[i].url;
        let response = await fetch(url)
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);

    }

    console.log('Meine Pokemon', allPokemon);

    renderAllPokemon();
}

function renderAllPokemon() {
    let renderPokemon = document.getElementById('renderPokemons');
    renderPokemon.innerHTML = '';

    for (let i = 0; i < allPokemon.length; i++) {
        const showName = allPokemon[i]['name'];

    }
}