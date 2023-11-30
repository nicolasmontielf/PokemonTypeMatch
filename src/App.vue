<script setup lang="ts">
    import LayoutNavbar from "@/components/LayoutNavbar.vue";
    import LayoutFooter from "@/components/LayoutFooter.vue";
    import MainComponent from "@/components/MainComponent.vue";
</script>

<template>
    <div>
        <header id="header-container">
            <LayoutNavbar />
        </header>
        <main class="min-h-[80vh]">
            <MainComponent />
        </main>
        <div id="footer-container">
            <LayoutFooter />
        </div>
    </div>
</template>