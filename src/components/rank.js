
import {getRandomInteger} from '../util.js';
import AbstractComponent from './abstract-component.js';

const getRank = (quantity) => {
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

const createRank = (quantity) => {
  const rankName = getRank(quantity);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rankName}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class RankComponent extends AbstractComponent {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createRank(this._quantity);
  }
}
