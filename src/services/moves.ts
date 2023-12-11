import MOVES from '@/data/moves.json'

export function getMovesForSelect() {
    return MOVES.map(move => {
        return {
            value: JSON.stringify(move),
            label: move.name
        }
    })
}