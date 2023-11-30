<script setup lang="ts">
    import { ref } from 'vue'
    import { useTeamStore } from '@/stores/team';

    const pokemon = ref('')
    const type = ref('normal')

    function addPokemon() {
        if (!pokemon.value || !type.value) return
        useTeamStore().addPokemon({
            name: pokemon.value,
            type: type.value
        })
    }
</script>

<template>
    <form @submit.prevent="addPokemon">
        <div class="col-span-full my-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
            <div class="mt-2">
                <input v-model="pokemon" type="text" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        
        <div class="col-span-full my-3">
            <label class="block text-sm font-medium leading-6 text-gray-900">Tipo</label>
            <div class="mt-2">
                <select v-model="type" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="ice">Hielo</option>
                    <option value="fire">Fuego</option>
                    <option value="normal">Normal</option>
                </select>
            </div>
        </div>

        <div class="col-span-full">
            <button
                type="submit"
                class="inline px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >Agregar</button>
        </div>

    </form>
</template>