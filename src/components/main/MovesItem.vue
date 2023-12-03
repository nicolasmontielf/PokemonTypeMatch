<script setup lang="ts">
    import type { PokemonMove } from '@/types/Pokemon';
    import TYPES from '@/data/types.json'

    const props = defineProps<{
        move: PokemonMove
    }>()

    const types: any = Object.keys(TYPES)
    const typeLogo = types[props.move.type]

</script>

<template>
    <div class="flex gap-1">
        <img :src="typeLogo" class="w-16">
        <p>{{ move.name }}</p>
    </div>
</template>