import {getRandomArrayItem, createElement} from '../util.js';

const getButtonClass = (flag) => {
  return flag ? `film-card__controls-item--active` : ``;
};

const createCardTemplate = (card) => {
  const {filmPosterSrc, filmNames, filmDescription, filmRating, filmDate, filmDuration, filmGenre, filmComments, isAddWatchList, isWatched, isFavorite} = card;

  const filmName = getRandomArrayItem(Array.from(filmNames));

  const getShortFilmDescription = () => {
    return filmDescription.length > 139 ? `${filmDescription.slice(0, 139)}...` : filmDescription;
  };

  const getShortDate = () => {
    return filmDate.getFullYear();
  };

  const generateGenre = () => {
    return getRandomArrayItem(Array.from(filmGenre));
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${filmRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getShortDate()}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${generateGenre()}</span>
      </p>
      <img src="${filmPosterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortFilmDescription()}</p>
      <a class="film-card__comments">${filmComments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getButtonClass(isAddWatchList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getButtonClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getButtonClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class CardComponent {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._card);
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
