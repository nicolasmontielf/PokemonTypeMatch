<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'
    import { useTeamStore } from '@/stores/team';
    import type { Pokemon } from '@/types';
    import SearchPokemonInput from '@/components/common/SearchPokemonInput.vue';

    const teamStore = useTeamStore()
    const errorFindingPokemon = ref<boolean>(false)

    const pokemon = reactive<Pokemon>({
        id: 0,
        image: '',
        name: '',
        types: []
    })

    const canAddPokemon = computed<boolean>(() => {
        return !!(pokemon.name && pokemon.types.length && pokemon.id > 0)
    })

    function reset(): void {
        pokemon.id = 0
        pokemon.image = ''
        pokemon.name = ''
        pokemon.types = []
    }

    function setPokemon(emitedPokemon: Pokemon) {
        pokemon.id = emitedPokemon.id
        pokemon.image = emitedPokemon.image
        pokemon.name = emitedPokemon.name
        pokemon.types = emitedPokemon.types
        
        errorFindingPokemon.value = false
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
        <div class="col-span-full mt-4">
            <SearchPokemonInput
                @finded="setPokemon"
                @notfinded="errorFindingPokemon = true"
            />
        </div>

        <div class="mt-1 text-sm font-semibold text-red-600" v-if="errorFindingPokemon">
            No se ha encontrado el Pokemon :(
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div class="col-span-1 my-3">
                <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
                <div class="mt-2 relative">
                    <input
                        disabled
                        :value="pokemon.name"
                        type="text"
                        class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
                </div>
            </div>

            <div class="col-span-1 my-3">
                <label class="block text-sm font-medium leading-6 text-gray-900">Tipo</label>
                <div class="mt-2">
                    <input
                        disabled
                        :value="pokemon.types.toString()"
                        type="text"
                        class="capitalize px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
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