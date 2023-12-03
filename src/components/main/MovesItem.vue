<script setup lang="ts">
    import { computed } from 'vue'
    import type { PokemonMove, TypeValue } from '@/types';
    import { getIcon, calculateDamage } from '@/services/types';
    import { useTeamStore } from '@/stores/team';
    import { useCommonStore } from '@/stores/common';

    const props = defineProps<{
        move: PokemonMove,
        pokemonId: number
    }>()
    const commonStore = useCommonStore()

    const typeLogo = getIcon(props.move.type as TypeValue)

    function remove(): void {
        if (confirm("Estas seguro que quieres borrar este ataque?")) {
            useTeamStore().removeMove(props.pokemonId, props.move)
        }
    }

    const attackEffectivityColor = computed(() => {
        if (commonStore.enemyTypes.length === 0) {
            return [];
        }

        let color = ''
        const damage = calculateDamage(props.move.type as TypeValue, commonStore.enemyTypes)

        if (damage === 0) {
            color = 'bg-red-700'
        } else if (damage === 0.25 || damage === 0.5) {
            color = 'bg-orange-700'
        } else if (damage === 1) {
            color = 'bg-neutral-500'
        } else if (damage === 2) {
            color = 'bg-green-600'
        } else if (damage === 4) {
            color = 'bg-emerald-700'
        }

        return [color, damage];
    })

</script>

<template>
    <div class="relative flex gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-md items-center">
        <img :src="typeLogo" class="w-7 rounded-md">
        <p class="capitalize font-semibold text-md">
            {{ move.name }}
        </p>

        <span
            v-if="attackEffectivityColor.length > 0"
            :class="[
                attackEffectivityColor[0],
                'absolute left-[-7px] top-0 text-xs font-semibold text-white px-2 py-1 rounded-lg'
            ]">
            x{{ attackEffectivityColor[1] }}
        </span>

        <div class="absolute right-3 bottom-4">
            <button
                class="font-xs font-bold"
                type="button"
                @click="remove"
            >
                x
            </button>
        </div>
    </div>
</template>