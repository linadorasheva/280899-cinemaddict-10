import {isEscPress} from '../utils/utils.js';
import {RenderPosition, render, replace, remove} from '../utils/render.js';
import CardComponent from '../components/film-card';
import PopupComponent from '../components/popup.js';

const Mode = {
  DEFAULT: `default`,
  EXTENDED: `extended`,
};

const pageBody = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._cardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;
    this._onEscPress = this._onEscPress.bind(this);
  }

  render(card) {
    const oldCardComponent = this._cardComponent;

    this._cardComponent = new CardComponent(card);
    this._popupComponent = new PopupComponent(card);

    this._popupComponent.setClickBtnCloseHandler(() => this._popupClose());

    this._cardComponent.setFilmPosterClickHandler(() => {
      this._onViewChange();
      this._renderPopup();
    });

    this._cardComponent.setFilmTitleClickHandler(() => {
      this._onViewChange();
      this._renderPopup();
    });

    this._cardComponent.setFilmCommentsClickHandler(() => {
      this._onViewChange();
      this._renderPopup();
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

  _renderPopup() {
    render(pageBody, this._popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscPress);

    this._mode = Mode.EXTENDED;
  }

  _onEscPress() {
    if (isEscPress) {
      this._popupComponent.getElement().remove();

      // ПРОБЛЕМА если удаляю так (вместо строчки выше), то после закрытия попапа по escape, при его последующем открытии, закрытие по крестику не срабатывает
      remove(this._popupComponent);
      this._mode = Mode.DEFAULT;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._renderPopup();
    }
  }

  _popupClose() {
    this._popupComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscPress);

    this._mode = Mode.DEFAULT;
  }
}
