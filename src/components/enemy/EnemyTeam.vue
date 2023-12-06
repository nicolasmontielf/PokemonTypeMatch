<script setup lang="ts">
    import { ref } from 'vue'
    import type { Pokemon } from '@/types';
    import PokemonItem from '@/components/main/PokemonItem.vue'
    import SearchPokemonInput from '@/components/common/SearchPokemonInput.vue';
    import { useCommonStore } from '@/stores/common';

    const pokemones = ref<Pokemon[]>([])
    const selected = ref<number>();

    function finded(returned: Pokemon) {
        pokemones.value.push(returned)
        selected.value = returned.id;
        useCommonStore().setEnemyTypes(returned.types);
    }

    function notFinded() {
        // pokemon.value = undefined;
        console.log('not finded')
    }

    function removePokemon(pokemonId: number) {
        pokemones.value = pokemones.value.filter(p => p.id !== pokemonId)
    }

    function changeSelected(pokemon: Pokemon) {
        selected.value = pokemon.id;
        useCommonStore().setEnemyTypes(pokemon.types);
    }
</script>

<template>
    <div class="flex flex-col flex-wrap mt-2 mb-10">
        <div class="flex gap-3">
            <h3 class="text-xl font-bold inline">Pokemones Enemigos</h3>
        </div>

        <div class="w-full">
            <SearchPokemonInput
                @finded="finded"
                @notfinded="notFinded"
            />
        </div>

        <div class="w-full" v-if="pokemones.length">
            <template v-for="pokemon of pokemones" :key="pokemon.id">
                <PokemonItem
                    :pokemon="pokemon"
                    @remove="removePokemon"
                    hide-features
                    @click="changeSelected(pokemon)"
                    :class="[selected === pokemon.id ? 'bg-gray-300' : '']"
                />
            </template>
        </div>

    </div>
</template>