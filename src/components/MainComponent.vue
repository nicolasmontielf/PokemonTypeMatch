<script setup lang="ts">
    import MyTeam from '@/components/main/MyTeam.vue'
    import EnemyTeam from '@/components/enemy/EnemyTeam.vue'
</script>

<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-4 mt-5">
            <div class="col-span-3">
                <MyTeam />
            </div>
            <div class="col-span-1">
                <EnemyTeam />
            </div>
        </div>
    </div>
</template>