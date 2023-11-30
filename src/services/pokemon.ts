import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex({
    versionPath: '/api/v2/',
    cacheLimit: 3600 * 1000, // 100s
});