import {createElement} from '../util.js';


const createMenu = (cards) => {
  const getQuantityFilms = (flag) => {
    const quantityFilms = cards.filter((it) => it[flag]).length;

    return quantityFilms;
  };

  const isAddWatchList = getQuantityFilms(`isAddWatchList`);
  const isWatched = getQuantityFilms(`isWatched`);
  const isFavorite = getQuantityFilms(`isFavorite`);


  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${isAddWatchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${isWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${isFavorite}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class MenuComponent {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createMenu(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
