<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'
    import { getPokemon } from '@/services/pokemon';
    import type { Pokemon, TypeValue } from '@/types';
    import { slugifyString } from '@/services/common';
    import TeamMember from '@/components/main/TeamMember.vue'
    import { useCommonStore } from '@/stores/common'

    const query = ref('')
    const pokemon = reactive<Pokemon>({
        id: 0,
        image: '',
        name: '',
        types: []
    })

    async function search(): Promise<void> {
        if (!query.value) {
            return
        }

        const response = await getPokemon(slugifyString(query.value))

        if (!response) {
            console.log("No se encontro el pokemon :(")
            return;
        }
        
        const arrayOfTypes = response.types.map((type) => type.type.name)

        pokemon.id = response.id
        pokemon.image = response.sprites.front_default
        pokemon.name = response.name.toUpperCase()
        pokemon.types = arrayOfTypes

        useCommonStore().setEnemyTypes(arrayOfTypes as TypeValue[])
    }

    const validPokemon = computed(() => {
        return pokemon.id !== 0
    })

</script>

<template>
    <div>
        <div class="flex flex-col flex-wrap mt-2 mb-10">
            <div class="flex gap-3">
                <h3 class="text-xl font-bold inline">Pokemon Enemigo</h3>
            </div>

            <div class="w-full">
                <label class="block text-sm font-medium leading-6 text-gray-900">Nombre del Pokemon</label>
                <div class="mt-2 relative">
                    <input v-model.lazy="query" type="text" class="px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">

                    <button type="button" class="absolute right-3 top-1" @click="search">
                        Click para buscar
                    </button>
                </div>
            </div>

            <div class="w-full" v-if="validPokemon">
                <TeamMember :pokemon="pokemon" />
            </div>

        </div>
    </div>
</template>