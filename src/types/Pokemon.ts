export interface PokemonTypeData {
    slot: number,
    type: {
        name: string,
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
    types: string[]
    moves?: PokemonMove[]
}