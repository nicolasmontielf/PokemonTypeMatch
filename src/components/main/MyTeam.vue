<script setup lang="ts">
    import { ref } from 'vue'
    import TeamMember from '@/components/main/TeamMember.vue'
    import AddPokemonForm from '@/components/main/AddPokemonForm.vue'
    import { useTeamStore } from '@/stores/team';

    const showAddPokemonForm = ref(false)
    const teamStore = useTeamStore()

    function resetTeam() {
        teamStore.resetTeam()
    }
</script>

<template>
    <div>
        <div class="flex flex-col flex-wrap mt-2 mb-10">
            <div>
                <h3 class="text-xl font-bold inline">Mi equipo</h3>
                <button
                    type="button"
                    class="inline mx-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    @click="showAddPokemonForm = !showAddPokemonForm"
                >
                    {{ showAddPokemonForm ? 'Ocultar' : 'Agregar' }}
                </button>

                <button
                    type="button"
                    class="inline mx-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center"
                    @click="resetTeam"
                >
                    Reset team
                </button>
            </div>

            <div class="w-3/5" v-if="showAddPokemonForm">
                <AddPokemonForm />
            </div>

        </div>
        <div class="flex flex-col">
            <div class="my-2" v-for="(pokemon, index) of teamStore.myTeam" :key="index">
                <TeamMember :pokemon="pokemon" />
            </div>
        </div>
    </div>
</template>