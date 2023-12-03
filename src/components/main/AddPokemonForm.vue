<script setup lang="ts">
    import { ref , reactive, computed } from 'vue'
    import { useTeamStore } from '@/stores/team';
    import { getPokemon } from '@/services/pokemon';
    import { slugifyString } from '@/services/common';
    import type { Pokemon } from '@/types';

    const teamStore = useTeamStore()

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

    const canAddPokemon = computed<boolean>(() => {
        return !!(pokemon.name && pokemon.types.length && pokemon.id > 0)
    })

    function reset(): void {
        pokemon.id = 0
        pokemon.image = ''
        pokemon.name = ''
        pokemon.types = []
    }

    function addPokemon() {
        if (!canAddPokemon.value) {
            return;
        }

        teamStore.addPokemon({ ...pokemon })
        reset()
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
                    <input disabled :value="pokemon.name" type="text" class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                </div>
            </div>

            <div class="col-span-1 my-3">
                <label class="block text-sm font-medium leading-6 text-gray-900">Tipo</label>
                <div class="mt-2">
                    <input disabled :value="pokemon.types.toString()" type="text" class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                </div>
            </div>

            <div class="col-span-full">
                <button
                    type="submit"
                    class="inline px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    :disabled="!canAddPokemon"
                >
                    Agregar
                </button>
            </div>
        </div>
        
    </form>
</template>