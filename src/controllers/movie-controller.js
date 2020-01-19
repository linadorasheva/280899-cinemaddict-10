import {isEscPress} from '../utils/utils.js';
import {RenderPosition, render, replace} from '../utils/render.js';
import CardComponent from '../components/film-card';
import PopupComponent from '../components/popup.js';

const pageBody = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._cardComponent = null;
  }

  render(card) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new CardComponent(card);
    this._popupComponent = new PopupComponent(card);

    this._cardComponent.setFilmPosterClickHandler(() => {
      render(pageBody, this._popupComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscPress);
    });

    this._cardComponent.setFilmTitleClickHandler(() => {
      render(pageBody, this._popupComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscPress);
    });

    this._cardComponent.setFilmCommentsClickHandler(() => {
      render(pageBody, this._popupComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscPress);
    });

    this._cardComponent.setClickAddToWatchlistHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isAddWatchList: !card.isAddWatchList
      }));
    });

    this._cardComponent.setClickAlreadyWatchedHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched
      }));
    });

    this._cardComponent.setClickAddToFavoritesHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite
      }));
    });

    if (oldCardComponent && this._cardComponent) {
      replace(this._cardComponent, oldCardComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  _onEscPress() {
    if (isEscPress) {
      pageBody.removeChild(pageBody.querySelector(`.film-details`));
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }
}
