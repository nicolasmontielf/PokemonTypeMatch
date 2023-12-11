<script setup lang="ts">
    import { ref } from 'vue'
    import { useTeamStore } from '@/stores/team';
    import { getMovesForSelect } from '@/services/moves' 

    import { ModelListSelect } from 'vue-search-select'
    import "vue-search-select/dist/VueSearchSelect.css"

    const teamStore = useTeamStore()
    const moves = getMovesForSelect()
    const selectedMove = ref<string>()

    const props = defineProps<{
        open: boolean,
        pokemonId: number
    }>()

    const emit = defineEmits<{
        (e: 'dialog-closed'): void
    }>()

    function addMove() {
        if (!selectedMove.value) {
            return;
        }

        teamStore.addMove(props.pokemonId, JSON.parse(selectedMove.value))
        closeAndReset()
    }

    function closeAndReset() {
        selectedMove.value = undefined
        emit('dialog-closed')
    }
</script>

<template>
    <dialog class="p-5 fixed right-1 bottom-1/2 border rounded-md bg-red-200" :open="open">
        <form @submit.prevent="addMove">
            <div class="w-80">
                <div class="col-span-full">
                    <ModelListSelect
                        :list="moves"
                        optionValue="value"
                        optionText="label"
                        v-model="selectedMove"
                        placeholder="Busca el movimiento"
                    />
                </div>
                
                <div class="col-span-full mt-5">
                    <button
                        type="button"
                        class="inline px-3 mx-1 py-2 text-xs font-medium text-center text-white bg-red-400 rounded-lg"
                        @click="closeAndReset"
                    >
                        Cerrar
                    </button>

                    <button
                        type="submit"
                        class="inline px-3 mx-1 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                    >
                        Agregar
                    </button>
                </div> 
            </div>
        </form>
    </dialog>
</template>