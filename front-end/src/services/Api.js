import {Http} from './Http'
export const getRandomAnimes = (config) => Http.get("/random/animes", config);
export const getAnimes = (config) => Http.get("/animes", config);