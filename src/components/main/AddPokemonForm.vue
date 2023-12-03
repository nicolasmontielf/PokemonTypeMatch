<script setup lang="ts">
    import { ref , reactive } from 'vue'
    import { useTeamStore } from '@/stores/team';
    import { getPokemon } from '@/services/pokemon';
    import { slugifyString } from '@/services/common';
    import TYPES from '@/data/types.json'
    import type { Pokemon } from '@/types/Pokemon';

    const teamStore = useTeamStore()
    const types = Object.keys(TYPES)

    const pokemon = reactive<Pokemon>({
        id: 0,
        image: '',
        name: '',
        types: []
    })
    const query = ref<string>('')

    async function search(): Promise<void> {
        if (!query.value) {
            return
        }

        const response = await getPokemon(slugifyString(query.value))

        if (!response) {
            console.log("No se encontro el pokemon :(")
            return;
        }
        
        pokemon.id = response.id
        pokemon.image = response.sprites.front_default
        pokemon.name = response.name.toUpperCase()
        pokemon.types = response.types.map((type) => type.type.name)
    }

    function addPokemon() {
        if (!pokemon.name || !pokemon.types.length) {
            return;
        }

        teamStore.addPokemon(pokemon)
    }
</script>

<template>
    <form @submit.prevent="addPokemon">
        <div class="col-span-full my-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
            <div class="mt-2 relative">
                <input v-model="query" type="text" class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">

                <button type="button" class="absolute right-3 top-1" @click="search">
                    Click para buscar
                </button>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div class="col-span-1 my-3">
                <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
                <div class="mt-2 relative">
                    <input v-model="pokemon.name" type="text" class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div class="col-span-1 my-3">
                <label class="block text-sm font-medium leading-6 text-gray-900">Tipo</label>
                <div class="mt-2">
                    <select multiple v-model="pokemon.types" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option :value="type" v-for="type of types" :key="type">
                            {{ type.toUpperCase() }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="col-span-full">
                <button
                    type="submit"
                    class="inline px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >Agregar</button>
            </div>

        </div>
        
        

        

    </form>
</template>