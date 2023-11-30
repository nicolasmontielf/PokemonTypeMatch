<script setup lang="ts">
    import MovesItem from '@/components/main/MovesItem.vue'
</script>

<template>
    <div class="flex gap-5">
        <div>
            <img src="http://placekitten.com/200/300" class="w-16">
        </div>
        <div>
            <h3 class="font-bold mb-2">Nombre</h3>
            <div class="grid grid-cols-2 gap-3">
                <div v-for="n in 4" :key="n">
                    <MovesItem />
                </div>
            </div>
        </div>
    </div>
</template>