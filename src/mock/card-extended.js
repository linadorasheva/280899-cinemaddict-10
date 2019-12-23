import {getRandomArrayItem} from '../util.js';

const filmDirector = [`James Cameron`, `Christopher Nolan`, `Gavin O'Connor`, `Francis Ford Coppola`, `Tate Taylor`];
const filmWriter = [`James Cameron`, `Christopher Nolan`, `Gavin O'Connor`, `Cliff Dorfman`, `Anthony Tambakis`, `Francis Ford Coppola`, `Tate Taylor`];
const filmActors = [`Robert De Niro`, `Al Pacino`, `Brad Pitt`, `Leonardo DiCaprio`, `Tom Cruise`, `Kate Winslet`, `Tom Hardy`, `Joel Edgerton`, `Marlon Brando`, `Emma Stone`];
const filmCountries = [`USA`, `UK`, `Italy`, `Spain`, `France`, `Japan`, `Norway`, `Portugal`, `Mexico`];
const filmAgeRatings = [0, 6, 12, 16, 18];

export const generateCardExtended = () => {
  return {
    filmDirector: getRandomArrayItem(filmDirector),
    filmWriter: getRandomArrayItem(filmWriter),
    filmActors: new Set(filmActors),
    filmCountry: new Set(filmCountries),
    filmAgeRating: new Set(filmAgeRatings)
  };
};
