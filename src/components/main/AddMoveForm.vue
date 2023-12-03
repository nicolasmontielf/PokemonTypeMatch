<script setup lang="ts">
    import { reactive } from 'vue'
    import type { PokemonMove } from '@/types';
    import TYPES from '@/data/types.json'
    import { useTeamStore } from '@/stores/team';

    const teamStore = useTeamStore()
    const types = Object.keys(TYPES)

    const props = defineProps<{
        open: boolean,
        pokemonId: number
    }>()

    const emit = defineEmits<{
        (e: 'dialog-closed'): void
    }>()

    const move = reactive<PokemonMove>({
        name: '',
        type: 'normal'
    })

    function addMove() {
        if (!move.name || !move.type) {
            return;
        }

        teamStore.addMove(props.pokemonId, {name: move.name, type: move.type})
        closeAndReset()
    }

    function closeAndReset() {
        move.name = ''
        move.type = 'normal'
        emit('dialog-closed')
    }
</script>

<template>
    <dialog class="p-5 fixed right-1 bottom-1/2 border rounded-md bg-red-200" :open="open">
        <form @submit.prevent="addMove">
            <div class="grid grid-cols-2 gap-3">
                <div class="col-span-1 my-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Movimiento</label>
                    <div class="mt-2 relative">
                        <input v-model="move.name" type="text" class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="col-span-1 my-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Tipo</label>
                    <div class="mt-2">
                        <select v-model="move.type" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option :value="type" v-for="type of types" :key="type">
                                {{ type.toUpperCase() }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-span-full">
                    <button
                        type="button"
                        class="inline px-3 mx-1 py-2 text-xs font-medium text-center text-white bg-red-400 rounded-lg focus:ring-4 focus:outline-none"
                        @click="$emit('dialog-closed')"
                    >
                        Cerrar
                    </button>

                    <button
                        type="submit"
                        class="inline px-3 mx-1 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Agregar
                    </button>
                </div>

            </div>
        </form>
    </dialog>
</template>