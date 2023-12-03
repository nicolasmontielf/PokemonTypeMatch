import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon, PokemonMove } from '@/types'

export const useTeamStore = defineStore('team', () => {
    const myTeam = ref<Pokemon[]>([])

    function addPokemon(pokemon: Pokemon): void {
        myTeam.value.push(pokemon)
    }

    function removePokemon(pokemon: Pokemon): void {
        const index = myTeam.value.indexOf(pokemon)
        myTeam.value.splice(index, 1)
    }

    function resetTeam(): void {
        myTeam.value = []
    }

    function addMove(pokemonId: number, move: PokemonMove): void {
        const pokemon = myTeam.value.findIndex(p => p.id === pokemonId)
        if (pokemon === -1) {
            return;
        }

        const currentMoves = myTeam.value[pokemon].moves ?? []
        myTeam.value[pokemon].moves = [...currentMoves, move]
    }

    return {
        myTeam,
        addPokemon,
        removePokemon,
        resetTeam,
        addMove
    }

}, { persist: true })