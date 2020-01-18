import AbstractComponent from './abstract-component.js';

const createCardTemplate = (card) => {
  const {filmPosterSrc, filmName, filmDescription, filmRating, filmDate, filmDuration, filmGenres, filmComments, isAddWatchList, isWatched, isFavorite} = card;

  const getShortFilmDescription = () => {
    return filmDescription.length > 139 ? `${filmDescription.slice(0, 139)}...` : filmDescription;
  };

  const getShortDate = () => {
    return filmDate.getFullYear();
  };

  const generateGenre = () => {
    return filmGenres.slice(0, 1);
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

  setClickHandler(element, handler) {
    this.getElement().querySelector(element).addEventListener(`click`, handler);
  }


}
