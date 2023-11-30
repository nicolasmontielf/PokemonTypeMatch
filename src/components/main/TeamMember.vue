<script setup lang="ts">
    import MovesItem from '@/components/main/MovesItem.vue'
    import { defineProps } from 'vue'

    const props = defineProps(['pokemon'])
</script>

<template>
    <div class="flex gap-5">
        <div>
            <img v-if="props.pokemon?.img" :src="props.pokemon?.img" class="w-16">
            <p v-else>Sin imagen</p>
        </div>
        <div>
            <div class="mb-2">
                <h3 class="font-bold">{{ props.pokemon.name }}</h3>
                <small v-if="props.pokemon?.type">{{ props.pokemon.type }}</small>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <div v-for="n in 4" :key="n">
                    <MovesItem />
                </div>
            </div>
        </div>
    </div>
</template>