<script setup lang="ts">
    import MovesItem from '@/components/main/MovesItem.vue'
    import AddMoveForm from '@/components/main/AddMoveForm.vue' 
    import type { Pokemon } from '@/types/Pokemon'
    import { ref } from 'vue'

    const openForm = ref<boolean>(true)

    defineProps<{
        pokemon: Pokemon
    }>()
</script>

<template>
    <div class="flex my-5 relative gap-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 justify-center items-center">
        <div>
            <img v-if="pokemon.image" :src="pokemon.image" class="w-24">
            <p v-else>Sin imagen</p>
        </div>
        <div>
            <div class="mb-2">
                <h3 class="font-bold">{{ pokemon.name }}</h3>
                <div v-for="type of pokemon.types" :key="type">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                        {{ type }}
                    </span>
                </div>
            </div>
            
            <div v-if="pokemon?.moves?.length" class="grid grid-cols-2 gap-3">
                <div v-for="(moves, index) of pokemon.moves" :key="index">
                    <MovesItem :move="moves" />
                </div>
            </div>

            <div v-else>
                <p class="text-sm font-semibold">No hay movimientos</p>
            </div>

        </div>

        <div class="absolute top-1 right-3">
            <button
                class="text-xs font-semibold"
                @click="openForm = true"
            >
                Agregar Movimiento
            </button>
        </div>

        <AddMoveForm
            v-if="openForm"
            :open="openForm"
            :pokemon-id="pokemon.id"
            @dialog-closed="() => openForm = false"
        />

    </div>
</template>