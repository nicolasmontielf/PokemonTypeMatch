<script setup lang="ts">
    import type { PokemonMove } from '@/types/Pokemon';
    import TYPES from '@/data/types.json'

    const props = defineProps<{
        move: PokemonMove
    }>()

    const pokemonTypes: any = TYPES;

    const typeLogo = pokemonTypes[props.move.type]?.data?.icon
</script>

<template>
    <div class="flex gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 justify-center items-center">
        <img :src="typeLogo" class="w-6">
        <p>{{ move.name }}</p>
    </div>
</template>