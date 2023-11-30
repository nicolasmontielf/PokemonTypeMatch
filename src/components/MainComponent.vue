<script setup lang="ts">
    import MyTeam from '@/components/main/MyTeam.vue'
</script>

<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-4 mt-5">
            <div class="col-span-3">
                <MyTeam />
            </div>
            <div class="col-span-1">
                <h3>Pokemon enemigo</h3>
            </div>
        </div>
    </div>
</template>