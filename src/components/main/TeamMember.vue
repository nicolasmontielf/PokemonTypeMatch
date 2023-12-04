<script setup lang="ts">
    import MovesItem from '@/components/main/MovesItem.vue'
    import AddMoveForm from '@/components/main/AddMoveForm.vue' 
    import type { Pokemon } from '@/types'
    import { ref } from 'vue'
    import { useTeamStore } from '@/stores/team'

    const props = defineProps<{
        pokemon: Pokemon
    }>();
    const openForm = ref<boolean>(false)

    function removePokemon() {
        if (confirm("Estas seguro que quieres borrar este pokemon?")) {
            useTeamStore().removePokemon(props.pokemon.id)
        }
    }
</script>

<template>
    <div class="flex my-2 relative gap-3 max-w-xl py-6 px-5 bg-white border border-gray-200 rounded-lg shadow items-center">
        <div>
            <img v-if="pokemon.image" :src="pokemon.image" class="w-32">
            <p v-else>Sin imagen</p>
        </div>
        <div>
            <div class="mb-2">
                <h3 class="font-bold">{{ pokemon.name }}</h3>
                <div>
                    <span v-for="type of pokemon.types"
                        :key="type"
                        class="inline bg-blue-100 text-blue-800 text-xs font-medium mx-1 px-2.5 py-0.5 rounded capitalize">
                        {{ type }}
                    </span>
                </div>
            </div>
            
            <div v-if="pokemon?.moves?.length" class="grid grid-cols-2 gap-3 mt-5">
                <template v-for="(moves, index) of pokemon.moves" :key="index">
                    <MovesItem
                        :move="moves"
                        :pokemon-id="pokemon.id"
                    />
                </template>
            </div>

            <div v-else>
                <p class="text-sm font-semibold">No hay movimientos</p>
            </div>

        </div>

        <div class="absolute top-2 right-3">
            <button
                class="text-xs font-semibold border py-1 px-3 rounded-md hover:bg-blue-100"
                @click="openForm = true"
            >
                Agregar Movimiento
            </button>
        </div>

        <div class="absolute left-3 top-1">
            <button
                class="text-md font-bold"
                type="button"
                @click="removePokemon"
            >
                X
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