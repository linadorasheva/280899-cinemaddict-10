import {getRandomInteger} from '../util.js';

export const getRank = (quantity) => {
  const filmsWatched = getRandomInteger(0, quantity);

  switch (true) {
    case filmsWatched > 1 && filmsWatched <= 10:
      return `Novice`;
    case filmsWatched > 10 && filmsWatched <= 20:
      return `Fan`;
    case filmsWatched > 20:
      return `Movie Buff`;
    default: return ``;
  }
};
