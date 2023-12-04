<script setup lang="ts">
    import logo from '@/assets/images/logo.png'
</script>

<template>
    <nav class="relative bg-white shadow dark:bg-gray-800">
        <div class="container px-6 py-4 mx-auto flex justify-center">
            <div class="flex items-center justify-between">
                <img class="w-auto h-12" :src="logo" alt="">
            </div>
        </div>
    </nav>
</template>