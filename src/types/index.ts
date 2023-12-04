export interface PokemonTypeData {
    slot: number,
    type: {
        name: TypeValue,
    }
}

export interface PokemonData {
    id: number,
    name: string,
    sprites: {
        back_default: string
        front_default: string
    }
    types: PokemonTypeData[]
}

export interface PokemonMove {
    name: string,
    type: string
}

export interface Pokemon {
    id: number,
    image?: string,
    name: string,
    types: TypeValue[]
    moves?: PokemonMove[]
}

export type TypeValue = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel"

export interface Type {
    data: {
        name: string,
        icon: string
    },
    versus: {
        [key in TypeValue]: number
    }
}

export type TypesFile = {
    [key in TypeValue]: Type
}