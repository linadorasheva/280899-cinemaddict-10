import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createCardTemplate = (card) => {
  const {posterSrc, name, description, rating, date, duration, genres, comments, isAddWatchList, isWatched, isFavorite} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(date).format('YYYY')}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres.slice(0, 1)}</span>
      </p>
      <img src="${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 139 ? `${description.slice(0, 139)}...` : description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class CardComponent extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setFilmPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
  setFilmTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }
  setFilmCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setClickAddToWatchlistHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }
  setClickAlreadyWatchedHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }
  setClickAddToFavoritesHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
