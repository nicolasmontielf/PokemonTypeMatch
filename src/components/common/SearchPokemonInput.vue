<script setup lang="ts">
    import SearchIcon from '@/components/common/SearchIcon.vue'
    import { slugifyString } from '@/services/common';
    import { getPokemon } from '@/services/pokemon';
    import type { Pokemon } from '@/types';
    import { ref } from 'vue'
    
    const query = ref<string>('')
    const isLoading = ref<boolean>(false)

    const emit = defineEmits<{
        (e: 'finded', pokemon: Pokemon): void,
        (e: 'notfinded'): void
    }>();

    function setLoader(value: boolean) {
        isLoading.value = value
    }
    
    async function search(): Promise<void> {
        if (!query.value) {
            return
        }
        setLoader(true)
        const response = await getPokemon(slugifyString(query.value))

        if (!response) {
            emit('notfinded')
            setLoader(false)
            return;
        }

        emit('finded', {
            id: response.id,
            image: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${(response.id.toString()).padStart(3, '0')}.png`,
            name: response.name.toUpperCase(),
            types: response.types.map((type) => type.type.name)
        })
        setLoader(false)
        query.value = ''
    }

</script>

<template>
    <div>
        <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
        <div class="mt-2 relative">
            <input
                v-model.trim="query"
                type="text"
                class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                @keyup.enter="search"
                :disabled="isLoading"
            >

            <button :disabled="isLoading" type="button" class="absolute right-3 top-2" @click="search">
                <SearchIcon class="w-5" />
            </button>
        </div>
    </div>
</template>