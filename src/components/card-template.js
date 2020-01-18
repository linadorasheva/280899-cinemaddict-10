import AbstractComponent from './abstract-component.js';

const createCardTemplate = (card) => {
  const {posterSrc, name, description, rating, date, duration, genres, comments, isAddWatchList, isWatched, isFavorite} = card;

  const getShortdescription = () => {
    return description.length > 139 ? `${description.slice(0, 139)}...` : description;
  };

  const getShortDate = () => {
    return date.getFullYear();
  };

  const generateGenre = () => {
    return genres.slice(0, 1);
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getShortDate()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${generateGenre()}</span>
      </p>
      <img src="${posterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortdescription()}</p>
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

  setClickHandler(element, handler) {
    this.getElement().querySelector(element).addEventListener(`click`, handler);
  }


}
