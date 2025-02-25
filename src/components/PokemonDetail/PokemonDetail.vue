<script setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import { getIDPokemon, fetchPromise, getIndexName, getUniqueClass } from '../../utils';

// const route = useRoute();
// const router = useRouter();
let pokemon = ref(null);
let dataPromise = ref(null);
let dataEvolution = ref({});
let currentDirect = ref({});
let pokemonArray = ref([]);
let tmpDirect = {};
// const props = defineProps(['pokemon']);
let cachedPokemon = sessionStorage.getItem("pokemonData");
// import { defineProps, defineEmits } from 'vue';



// defineEmits(['back-to-list'])

if (cachedPokemon) {
    pokemon.value = JSON.parse(cachedPokemon);
}

async function getEvolution() {
    if (pokemon.value) {
        dataPromise.value = await fetchPromise(pokemon.value.url);
        const descData = await fetchPromise(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.value.name}`);
        dataEvolution.value = await fetchPromise(descData.evolution_chain.url);
        dataPromise.value.flavor_text = descData.flavor_text_entries[1].flavor_text;
        // if (dataPromise.value.evolution_chain) {
        //     const evolutionData = await fetchPromise(descData.evolution_chain.url);
        //     if (evolutionData && evolutionData.chain) {
        //         dataEvolution.value = evolutionData.chain;
        //         currentDirect.value = evolutionData.chain.species;
        //     }
        // }
    }
}
getEvolution();

async function getEvolutionChain () {
    await getEvolution();
    currentDirect.value = dataEvolution.value.chain;
    do {
        pokemonArray.value.push(currentDirect.value.species);
        tmpDirect = currentDirect.value;
        if (currentDirect.value.evolves_to.length != 0) {
            currentDirect.value = currentDirect.value.evolves_to[0];
        }
    }
    while (tmpDirect.evolves_to.length != 0);
}
getEvolutionChain();

</script>

<template>
    
    <div>
        <RouterLink class="back-btn" to="/">&larr;Back</RouterLink>
        <!-- <button @click="$emit('back-to-list')" class="back-btn">Back</button> -->
        <div class="pokemon-item-detail">
            <img class="item__image detail" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`">
            <div class="types">
                <div class="type-item" v-for="item in pokemon.types" :key="item" :class="item">
                    {{ item }}
                </div>
            </div>
            <h3 class="item__name detail">{{ pokemon.name }}</h3>
        </div>
        <div class="box-container">
            <div class="description">
                <p>{{ dataPromise.flavor_text }}</p>
            </div>
            <div class="information">
                <div class="size">
                    <div class="height">
                        <p>Height</p>
                        <span>{{ dataPromise.height }}</span>
                    </div>
                    <div class="weight">
                        <p>Weight</p>
                        <span>{{ dataPromise.weight }}</span>
                    </div>
                </div>
                <div class="abilities">
                    <div class="abilities-title title">
                        <p>Abilities</p>
                    </div>
                    <div class="abilities-box">
                        <div class="ability-item" v-for="ability in dataPromise.abilities" :key="ability">
                            {{ ability.ability.name }}
                        </div>
                    </div>
                </div>
                <div class="stats">
                    <div class="stats-title title">
                        <p>Stats</p>
                    </div>
                    <div class="stats-box">
                        <div class="stat-item" v-for="stat in dataPromise.stats" :key="stat">
                            <div 
                            class="stat-name" 
                            :class="getUniqueClass(stat.stat.name)"
                            >
                            {{ getIndexName(stat.stat.name) }}
                            </div>
                            <span>{{ stat.base_stat }}</span>
                        </div>
                    </div>
                </div>
                <div class="evolution">
                    <div class="evolution-title title">
                        <p>Evolution</p>
                    </div>
                    <div class="evolution-box">
                        <div class="evolution-item" v-for="(evoItem, index) in pokemonArray" :key="evoItem">
                            <b v-show="index != 0">&gt;</b>
                            <span class="evoItem-name">{{ evoItem.name }}</span>
                            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(evoItem.url)}.png`" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Add styles specific to Pokémon detail here */
h1 {
    font-size: 2em;
    color: #2c3e50;
}

p {
    font-size: 1.2em;
    color: #34495e;
}

.back-btn {
    position: fixed;
    top: 5%;
    left: 5%;
    border-radius: 30px;
    padding: 5px 10px;
    box-shadow: #63636333 0 4px 8px;
    border-color: transparent;
    cursor: pointer;
}
.back-btn:before {
    margin-right: 5px;
}
.back-btn:hover {
    background-color: #f1f1f1;
}
.pokemon-item-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}
h3 {
    font-size: 4em;
    color: #2c3e50;
}
.pokemon-item-detail .item__name {
    font-size: 1.5em;
    color: #2c3e50;
    margin-top: 20px;
}
.box-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-inline: auto;
    text-align: center;
    max-width: 500px;
}
.description {
    font-size: 0.9em;
    color: #34495e;
    margin-top: 10px;
}
.size, .abilities-box {
    display: flex;
    justify-content: center;
    gap: 150px;
    margin-top: 10px;
}
.size span, .ability-item {
    display: block;
    width: 100px;
    margin: 5px;
    padding: 8px 4px;
    background-color: #f6f8fc;
    border-radius: 30px;
    text-transform: capitalize;
}
.size p, .abilities p, .stats p, .evolution p {
    font-size: 20px;
    font-weight: 550;
}
.stats-box {
    display: flex;
    align-items: center;
    gap: 45px;
    margin-top: 8px;
    margin-bottom: 20px;
}
.stat-item {
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    box-shadow: #636363 0 0.5px 8px;
    background-color: #F6F8Fc;
    padding: 5px;
    margin: 5px;
}
.stat-name {
    display: flex;
    color: #FFFFFF;
    border-radius: 50%;
    padding: 2px;
    height: 30px;
    width: 30px;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}
.evolution-box {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}
.evolution {
    display: flex;
    flex-direction: column;
}
.evolution-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.evolution-item b {
    font-size: 1em;
    color: #2c3e50;
    font-weight: 600;
}
.evoItem-name {
    font-weight: 600;
    margin-left: 10px;
    text-transform: capitalize;
}
.hp {
    background-color: #DF2140;
} 
.atk {
    background-color: #FF994D;
} 
.def {
    background-color: #EECD3D;
} 
.spa {
    background-color: #85DDFF;
}
.spd-1 {
    background-color: #96DA83;
}
.spd-2 { 
    background-color: #FB94A8;
}
</style>