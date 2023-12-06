<script setup lang="ts">
    import { ref } from 'vue'
    import type { Pokemon } from '@/types';
    import PokemonItem from '@/components/main/PokemonItem.vue'
    import SearchPokemonInput from '@/components/common/SearchPokemonInput.vue';
    import { useCommonStore } from '@/stores/common';

    const pokemon = ref<Pokemon>()

    function finded(returned: Pokemon) {
        pokemon.value = returned;
        useCommonStore().setEnemyTypes(returned.types);
    }

    function notFinded() {
        pokemon.value = undefined;
    }

    function removePokemon() {
        pokemon.value = undefined;
    }
</script>

<template>
    <div class="flex flex-col flex-wrap mt-2 mb-10">
        <div class="flex gap-3">
            <h3 class="text-xl font-bold inline">Pokemon Enemigo</h3>
        </div>

        <div class="w-full">
            <SearchPokemonInput
                @finded="finded"
                @notfinded="notFinded"
            />
        </div>

        <div class="w-full" v-if="pokemon">
            <PokemonItem
                :pokemon="pokemon"
                @remove="removePokemon"
                hide-features
            />
        </div>

    </div>
</template>