import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', () => {
    const myTeam = ref([])

    function addPokemon(pokemon): void {
        myTeam.value.push(pokemon)
    }

    function removePokemon(pokemon): void {
        const index = myTeam.value.indexOf(pokemon)
        myTeam.value.splice(index, 1)
    }

    function resetTeam(): void {
        myTeam.value = []
    }

    return {
        myTeam,
        addPokemon,
        removePokemon,
        resetTeam
    }

}, { persist: true })