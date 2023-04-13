let allPokemon = [];
let nextPokemonList = `https://pokeapi.co/api/v2/pokemon/`;

async function loadNextPokemonList() {
    let url = nextPokemonList;
    let response = await fetch(url);
    let firstList = await response.json();
    nextPokemonList = firstList.next;

    for (let index = 0; index < firstList.results.length; index++) {
        let url = firstList.results[index].url;
        let response = await fetch(url)
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);

    }

    renderAllPokemon();
}

//Funktion um festzustellen ob der nutzer nach unten gescrolled hat. wenn ja werden die nächsten 20 Pokemon geladen.
let isLoading = false;
window.onscroll = async function(ev) {
    if (reachedBottomPage() && !isLoading) {
        isLoading = true;
        await loadNextPokemonList();
        isLoading = false;

    }
}

function reachedBottomPage() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.9;
}

function renderAllPokemon() {
    let pokemon = document.getElementById('container-all-pokemon');
    pokemon.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let showName = allPokemon[i]['name'].toUpperCase();
        let showId = allPokemon[i]['id'];
        let showImage = allPokemon[i]['sprites']['other']['home']['front_default'];
        pokemon.innerHTML += htmlTemplate(i, showImage, showId, showName);
        changeBackgroundColor(i);
        renderTypes(i);

    }
}

function htmlTemplate(i, showImage, showId, showName) {
    return /*html*/ `
    <div onclick="showPokedex(${i})" id="card${i}" class="pokemon-card">
        <div class="header-small-card text-bold">
            <div>${showName}</div>
            <div>${showId}</div>
        </div>

        <img class="img-small-card" src="${showImage}">

        <div class="type-container" id="types${i}">
        </div>
    </div>
    `;
}


function showPokedex(i) {
    document.getElementById('showPokedex').classList.remove('d-none');
    document.getElementById('body').classList.add('hidden');
    renderPokemonInfo(i);
}

function closePokedex(i) {
    document.getElementById('showPokedex').classList.add('d-none');
    document.getElementById('body').classList.remove('hidden');
    type = allPokemon[i]['types']['0']['type']['name'];
    document.getElementById(`pokedex`).classList.remove(type);
}

function notClose(event) {
    event.stopPropagation();
}

function renderTypes(i) {
    for (let j = 0; j < allPokemon[i]['types'].length; j++) {
        let showType = allPokemon[i]['types'][j]['type']['name'];
        document.getElementById(`types${i}`).innerHTML += `<b class="type-small-card">${showType}</b> `;
    }
}


function renderPokemonInfo(i) {
    type = allPokemon[i]['types']['0']['type']['name'];
    document.getElementById(`pokedex`).classList.add(type);
    document.getElementById('pokemonName').innerHTML = allPokemon[i]['name'].toUpperCase();
    document.getElementById('imgPokemon').src = allPokemon[i]['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonNumber').innerHTML = `<b>Id:</b> #${allPokemon[i]['id']}`;
    document.getElementById('close-button').innerHTML = `<p class="close-button" onclick="closePokedex(${i})">X</p>`;
    document.getElementById('type-1').innerHTML = ``;
    for (let j = 0; j < allPokemon[i]['types'].length; j++) {
        let showType = allPokemon[i]['types'][j]['type']['name'];
        document.getElementById('type-1').innerHTML += `<b>${showType}</b> `;
    }
    renderValues(i)


}

function renderValues(i) {
    document.getElementById('height').innerHTML = `<b>Height:</b> ${allPokemon[i]['height']}ft`;
    document.getElementById('weight').innerHTML = `<b>Weight:</b> ${allPokemon[i]['weight']}lb`;
    document.getElementById('hp').style = `width:${allPokemon[i]['stats'][0]['base_stat']}%;background-color: #f44336; border-radius: 10px;`;
    document.getElementById('attack').style = `width:${allPokemon[i]['stats'][1]['base_stat']}%;background-color: #f44336; border-radius: 10px;`;
    document.getElementById('defense').style = `width:${allPokemon[i]['stats'][2]['base_stat']}%;background-color: #f44336; border-radius: 10px;`;
    document.getElementById('special-attack').style = `width:${allPokemon[i]['stats'][3]['base_stat']}%;background-color: #f44336; border-radius: 10px;`;
    document.getElementById('special-defense').style = `width:${allPokemon[i]['stats'][4]['base_stat']}%;background-color: #f44336; border-radius: 10px;`;
    document.getElementById('speed').style = `width:${allPokemon[i]['stats'][5]['base_stat']}%;background-color: #f44336; border-radius: 10px;`;
    document.getElementById('hp').innerHTML = `${allPokemon[i]['stats'][0]['base_stat']}`;
    document.getElementById('attack').innerHTML = `${allPokemon[i]['stats'][1]['base_stat']}`;
    document.getElementById('defense').innerHTML = `${allPokemon[i]['stats'][2]['base_stat']}`;
    document.getElementById('special-attack').innerHTML = `${allPokemon[i]['stats'][3]['base_stat']}`;
    document.getElementById('special-defense').innerHTML = `${allPokemon[i]['stats'][4]['base_stat']}`;
    document.getElementById('speed').innerHTML = `${allPokemon[i]['stats'][5]['base_stat']}`;

}

function changeBackgroundColor(i) {
    let type = allPokemon[i]['types']['0']['type']['name'];
    document.getElementById(`card${i}`).classList.add(type);
};

function filterPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let pokemon = document.getElementById('container-all-pokemon');
    pokemon.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let showName = allPokemon[i]['name'].toUpperCase();
        let showId = allPokemon[i]['id'];
        let showImage = allPokemon[i]['sprites']['other']['home']['front_default'];
        if (showName.toLowerCase().includes(search)) {
            pokemon.innerHTML += htmlTemplate(i, showImage, showId, showName);
            changeBackgroundColor(i);
            renderTypes(i);
        }
    }
}