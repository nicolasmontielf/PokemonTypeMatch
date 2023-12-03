<script setup lang="ts">
    import type { PokemonMove, TypeValue } from '@/types';
    import { getIcon } from '@/services/types';

    const props = defineProps<{
        move: PokemonMove
    }>()

    const typeLogo = getIcon(props.move.type as TypeValue)
</script>

<template>
    <div class="flex gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-md justify-center items-center">
        <img :src="typeLogo" class="w-6 rounded-md">
        <p class="capitalize font-semibold">{{ move.name }}</p>
    </div>
</template>