const  pokemonName = document.querySelector('.pokemon_name');
const  pokemonNumber = document.querySelector('.pokemon_number');
const  pokemonImage= document.querySelector('.pokemon_image');
const  pokemonXp= document.querySelector('.pokemon_xp');

const  form= document.querySelector('.form');
const  input= document.querySelector('.input_search');
const  buttonPrev= document.querySelector('.btn-prev');
const  buttonNext= document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
        
        if (APIResponse.status === 200){
            const data = await APIResponse.json();
            return data;
        }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);

    if (data){
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            pokemonXp.innerHTML = 'XP:'+ data.base_experience;
            searchPokemon = data.id;
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
                
            input.value = '';
    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML ='0'
        pokemonImage.src ='./favicons/faviconBall.png'



    }

}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    
});

renderPokemon(searchPokemon);


