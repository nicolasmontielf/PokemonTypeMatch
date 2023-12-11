<script setup lang="ts">
    import SearchIcon from '@/components/common/SearchIcon.vue'
    import { slugifyString } from '@/services/common';
    import { getPokemon } from '@/services/pokemon';
    import type { Pokemon } from '@/types';
    import { ref } from 'vue'
    import POKEMONES from '@/data/pokemones.json'

    import { ModelListSelect } from 'vue-search-select'
    import "vue-search-select/dist/VueSearchSelect.css"
    
    const listOfPokemones = POKEMONES.map(pokemon => {
        return {
            label: pokemon.toUpperCase().trim(),
            value: pokemon.toLowerCase().trim()
        }
    })
    const query = ref<string>()
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
        query.value = undefined
    }

</script>

<template>
    <div>
        <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
        <div class="mt-2 relative">
    
            <ModelListSelect
                :list="listOfPokemones"
                v-model="query"
                optionValue="value"
                optionText="label"
                placeholder="Busca el pokemon"
                :isDisabled="isLoading"
            />

            <button :disabled="isLoading" type="button" class="absolute right-0 top-0 bg-blue-600 p-2 rounded text-white" @click="search">
                <SearchIcon class="w-5" />
            </button>
        </div>
    </div>
</template>