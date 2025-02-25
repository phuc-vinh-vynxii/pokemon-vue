<script setup>
import { getIDPokemon } from '../../utils';
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from 'vue';


const props = defineProps(['pokemon'])
const router = useRouter();
defineEmits(['select-pokemon']);
function storePokemon() {
    sessionStorage.setItem("pokemonData", JSON.stringify(props.pokemon));
    router.push("/" + props.pokemon.name);
}

</script>

<template>
    <div class="pokemon-item" @click="storePokemon">
        <div class="item__id">#{{ getIDPokemon(props.pokemon.url) }}</div>
        <img class="item__image" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(props.pokemon.url)}.png`">
        <h3 class="item__name">{{props.pokemon.name}}</h3>
        <div class="types">
            <div class="type-item" v-for="item in props.pokemon.types" :key="item" :class="item">
                {{ item }}
            </div>
        </div>
    </div>

</template>

<style>
a {
    text-decoration: none;
    color: black;
}
.pokemon-item:hover{
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}
.item__id {
    color: #2c3e50;
    font-size: 15px;
    line-height: 24px;
    text-align: center;
}
.item__image {
    width: 150px;
    height: 150px;
}
.item__name {
    font-size: 17.55px;
    font-weight: 700;
    line-height: 28.08px;
    text-align: center;
    text-transform: capitalize;
}
.types {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}
.type-item {
    font-size: 13px;
    border-radius: 5px;
    font-weight: 500;
    line-height: 20.8px;
    margin: 4px 3px;
    padding: 3px 4px;
    text-transform: capitalize;
}
</style>