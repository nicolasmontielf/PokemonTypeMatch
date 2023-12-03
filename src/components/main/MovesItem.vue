<script setup lang="ts">
    import type { PokemonMove, TypeValue } from '@/types';
    import { getIcon } from '@/services/types';
    import { useTeamStore } from '@/stores/team';

    const props = defineProps<{
        move: PokemonMove,
        pokemonId: number
    }>()

    const typeLogo = getIcon(props.move.type as TypeValue)

    function remove(): void {
        if (confirm("Estas seguro que quieres borrar este ataque?")) {
            useTeamStore().removeMove(props.pokemonId, props.move)
        }
    }
</script>

<template>
    <div class="relative flex gap-2 px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-md items-center">
        <img :src="typeLogo" class="w-5 rounded-md">
        <p class="capitalize font-semibold text-sm">{{ move.name }}</p>

        <div class="absolute right-3 bottom-2">
            <button
                class="font-xs font-bold"
                type="button"
                @click="remove"
            >
                x
            </button>
        </div>
    </div>
</template>