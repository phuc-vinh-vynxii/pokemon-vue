<script setup>
    import PokemonItem from './components/PokemonItem/PokemonItem.vue';
    import { ref, computed } from 'vue';
    import { fetchPromise, getIDPokemon } from './utils';
    import PokemonDetail from './components/PokemonDetail/PokemonDetail.vue';
    
    let showDetail = ref(true);
    let filteredPokemons = ref([]);
    let offset = ref(0);
    let currentPoke = ref(null);
    const limit = 60;

    const renderPokemons = computed(() => {
        return filteredPokemons.value.slice(offset, offset.value + limit);
    })

    const pokePromise = [];
    let pokemons = JSON.parse(localStorage.getItem("pokemonsData")) || [];
    filteredPokemons.value = pokemons;
    async function getPokemon() {
        if (pokemons.length) {
            filteredPokemons.value = pokemons;
        } else {
            const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?.value=0&limit=898");
            if (response && response.results) {
                pokemons = response.results;
                filteredPokemons.value = pokemons;
                localStorage.setItem("pokemonsData", JSON.stringify(pokemons));
            }
        }
    };
    function fetchPokemonType() {
        if (pokemons){
            pokemons.forEach(pokemon => {
                const promise = fetchPromise(pokemon.url);
                pokePromise.push(promise);
            });
        }
        return pokePromise;
    }
    async function getPokemonType() {
        const pokeDataPromise = fetchPokemonType();
        const pokeData = await Promise.all(pokeDataPromise);
        pokeData.forEach((item, index) =>
            {
                if (pokemons[index]) {
                    pokemons[index].types = item.types.map(item => item.type.name);
                }
            }
        )
        filteredPokemons.value = [...pokemons];
        localStorage.setItem("pokemonsData", JSON.stringify(pokemons));
    }
    getPokemonType();

    let queryValue = ref('');
    function handleSearch() {
        filteredPokemons.value = pokemons.filter((pokemon) => {
            return pokemon.name.includes(queryValue.value.toLowerCase());
        });
        offset.value = 0;
    }
    function handleLoadMore() {
        offset.value += limit;
    }
    function pokemonDetail(pokemon) {
        currentPoke.value = pokemon;
        showDetail.value = false;
    }
    function backToList() {
        showDetail.value = true;
    }
    getPokemon();
</script>

<template>
    <div class="container" v-if="showDetail">
        <h2 class="header">Pokemon API</h2>
        <input  class="pokemon-search" type="text" placeholder="Search some Pokemon" v-model="queryValue" @input="handleSearch">
        <div class="pokemon-list">
            <PokemonItem v-for="pokemon in renderPokemons" :key="getIDPokemon(pokemon.url)" :pokemon="pokemon" @select-pokemon="pokemonDetail"/>
        </div>
        <button v-show="renderPokemons.length >= limit" class="load-more" @click="handleLoadMore">Load more</button>
    </div>
    <template v-else>
        <PokemonDetail :pokemon="currentPoke" @back-to-list="backToList"/>
    </template>
</template>

<style>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Inter", sans-serif;
}
.header {
    font-size: 25px;
    font-weight: 400;
}
.container{
    margin: 0 auto;
    max-width: 1200px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    margin-top: 50px;
}
.pokemon-list {
    display: grid;
    grid-template-columns: repeat(6, auto);
    margin-top: 70px;
    max-width: 1000px;
    width: 100%;
}
.pokemon-search {
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;
    font-family: "Arial", sans-serif;
    box-shadow: #64646f33 0px 7px 29px 0px;
    border: grey solid 1px;
    margin-top: 40px;
}
.pokemon-item {
    height: auto;
    max-width: 160px;;
    border-radius: 15px;
    box-shadow: #0000001a 0 4px 12px;
    padding: 20px 0;
    margin: 10px 5px;
    text-transform: capitalize;
    cursor: pointer;
}
.types{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.types__item{
    font-size: 13px;
    border-radius: 5px;
    font-weight: 500;
    line-height: 20.8px;
    margin: 4px 3px;
    padding: 3px 4px;
    text-transform: capitalize;
}
.normal {
    background-color: #a8a77a; 
}

.fire {
    background-color: #ff421c; 
}

.water {
    background-color: #6390f0; 
}

.grass {
    background-color: #78cd54;
}

.electric {
    background-color: #f7d02c; 
}

.ice {
    background-color: #96d9d6; 
}

.fighting {
    background-color: #c22e28; 
}

.poison {
    background-color: #a33ea1; 
}

.ground {
    background-color: #e2bf65; 
}

.flying {
    background-color: #a98ff3; 
}

.psychic {
    background-color: #f95587;
}

.bug {
    background-color: #a6b91a; 
}

.rock {
    background-color: #b6a136; 
}

.ghost {
    background-color: #735797; 
}

.dragon {
    background-color: #6f35fc; 
}

.dark {
    background-color: #705746; 
}

.steel {
    background-color: #b7b7ce; 
}

.fairy {
    background-color: #d685ad; 
}
.load-more{
    background-color: #ff4d4f;
    border-radius: 10px;
    color: #fff;
    padding: 20px 25px;
    text-align: center;
    border: none;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
}
@media screen and (max-width: 1199px) {
    .items{
        display: grid;
        grid-template-columns: repeat(4, 24.375%);
    }
}

@media screen and (max-width: 956px) {
    .items{
        display: grid;
        grid-template-columns: repeat(3, 32.77%);
    }
}

@media screen and (max-width: 768px) {
    .items{
        display: grid;
        grid-template-columns: repeat(2, 49.58%);
    }
}



</style>