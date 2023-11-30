<script setup lang="ts">
    import TeamMember from '@/components/main/TeamMember.vue'
</script>

<template>
    <div>
        <div class="flex items-center">
            <h3 class="text-xl font-bold">Mi equipo</h3>
            <button class="flex mx-5">Agregar</button>
        </div>
        <div class="flex flex-col">
            <div class="my-2" v-for="n in 5" :key="n">
                <TeamMember />
            </div>
        </div>
    </div>
</template>