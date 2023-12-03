// @ts-ignore
import { Pokedex } from 'pokeapi-js-wrapper';
import type { PokemonData } from '@/types/Pokemon';

const P = new Pokedex({
    versionPath: '/api/v2/',
    cacheLimit: 3600 * 1000, // 1 hour
});

export async function getPokemon(name: string): Promise<PokemonData | undefined> {
    try {
        return await P.getPokemonByName(name);
    } catch (_e) {
        return undefined;
    }
}