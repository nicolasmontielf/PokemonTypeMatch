<script setup lang="ts">
    import { ref } from 'vue'
    import PokemonItem from '@/components/main/PokemonItem.vue'
    import AddPokemonForm from '@/components/main/AddPokemonForm.vue'
    import { useTeamStore } from '@/stores/team';

    const showAddPokemonForm = ref(false)
    const teamStore = useTeamStore()

    function removePokemon(pokemonId: number) {
        teamStore.removePokemon(pokemonId)
    }

    function resetTeam() {
        if (confirm("Estas por borrar todo tu equipo, seguro?") === true) {
            teamStore.resetTeam()
        }
    }
</script>

<template>
    <div>
        <div class="flex flex-col flex-wrap mt-2 mb-10">
            <div class="flex gap-3">
                <h3 class="text-xl font-bold inline">Mi equipo</h3>
                <div class="flex gap-2">
                    <button
                        type="button"
                        class="inline-flex px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                        @click="showAddPokemonForm = !showAddPokemonForm"
                    >
                        {{ showAddPokemonForm ? 'Ocultar' : 'Agregar' }}
                    </button>

                    <button
                        type="button"
                        class="inline-flex text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 text-center"
                        @click="resetTeam"
                    >
                        Reset team
                    </button>
                </div>
            </div>

            <div class="w-3/5" v-if="showAddPokemonForm">
                <AddPokemonForm />
            </div>

        </div>
        <div class="flex flex-col gap-1">
            <div v-for="(pokemon, index) of teamStore.myTeam" :key="index">
                <PokemonItem
                    :pokemon="pokemon"
                    @remove="removePokemon"
                />
            </div>
        </div>
    </div>
</template>