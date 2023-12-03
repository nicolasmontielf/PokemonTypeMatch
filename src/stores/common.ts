import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TypeValue } from '@/types'

export const useCommonStore = defineStore('common', () => {
    const enemyTypes = ref<TypeValue[]>([])

    function setEnemyTypes(types: TypeValue[]): void {
        enemyTypes.value = types
    }

    return {
        enemyTypes,
        setEnemyTypes
    }
})