import AbstractComponent from './abstract-component.js';

const createMenu = (cards) => {
  const getQuantityFilms = (flag) => {
    const quantityFilms = cards.filter((it) => it[flag]).length;

    return quantityFilms;
  };

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getQuantityFilms(`isAddWatchList`)}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getQuantityFilms(`isWatched`)}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getQuantityFilms(`isFavorite`)}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class MenuComponent extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createMenu(this._cards);
  }
}
