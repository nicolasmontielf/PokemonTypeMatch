import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon, Move } from '@/types'

export const useTeamStore = defineStore('team', () => {
    const myTeam = ref<Pokemon[]>([])

    function addPokemon(pokemon: Pokemon): void {
        myTeam.value.push(pokemon)
    }

    function removePokemon(pokemonId: number): void {
        const teamFiltered = myTeam.value.filter(p => p.id !== pokemonId)
        myTeam.value = teamFiltered
    }

    function resetTeam(): void {
        myTeam.value = []
    }

    function addMove(pokemonId: number, move: Move): void {
        const pokemon = myTeam.value.findIndex(p => p.id === pokemonId)
        if (pokemon === -1) {
            return;
        }

        const currentMoves = myTeam.value[pokemon].moves ?? []
        myTeam.value[pokemon].moves = [...currentMoves, move]
    }

    function removeMove(pokemonId: number, move: Move): void {
        const pokemon = myTeam.value.findIndex(p => p.id === pokemonId)
        if (pokemon === -1) {
            return;
        }

        const currentMoves = myTeam.value[pokemon].moves ?? []
        myTeam.value[pokemon].moves = currentMoves.filter(m => m.id != move.id)
    }

    return {
        myTeam,
        addPokemon,
        removePokemon,
        resetTeam,
        addMove,
        removeMove
    }

}, { persist: true })