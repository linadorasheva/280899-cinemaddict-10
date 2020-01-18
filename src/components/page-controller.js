import {isEscPress} from '../utils/utils.js';
import {RenderPosition, render, remove} from '../utils/render.js';

import FilmsContainerComponent from './films-container.js';
import ShowMoreButtonComponent from './show-more-button.js';
import NoMoviesComponent from './no-movies.js';
import CardComponent from './card-template.js';
import PopupComponent from './popup.js';
import Sort from './sort.js';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

const pageBody = document.querySelector(`body`);

const onEscPress = () => {
  if (isEscPress) {
    popupClose();
  }
};

const popupClose = () => {
  pageBody.removeChild(pageBody.querySelector(`.film-details`));
  document.removeEventListener(`keydown`, onEscPress);
};

const popupOpen = (component) => {
  render(pageBody, component, RenderPosition.BEFOREEND);
  document.addEventListener(`keydown`, onEscPress);
};

const renderCard = (card, container) => {
  const cardComponent = new CardComponent(card);
  const popupComponent = new PopupComponent(card);

  popupComponent.setClickHandler(popupClose);

  cardComponent.setFilmPosterClickHandler(() => popupOpen(popupComponent))
  cardComponent.setFilmTitleClickHandler(() => popupOpen(popupComponent))
  cardComponent.setFilmCommentsClickHandler(() => popupOpen(popupComponent))

  render(container, cardComponent, RenderPosition.BEFOREEND);
};

const getTopRatingCardList = (cards) => {
  const topRatingCards = cards.slice().sort((a, b) => b.rating - a.rating);
  return topRatingCards;
};

const getTopCommentsCardList = (cards) => {
  const topCommentsCards = cards.slice().sort((a, b) => b.comments - a.comments);
  return topCommentsCards;
};

const getTopDateCardList = (cards) => {
  const topCommentsCards = cards.slice().sort((a, b) => b.date.getFullYear() - a.date.getFullYear());

  return topCommentsCards;
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortingComponent = new Sort();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noMoviesComponent = new NoMoviesComponent();
    this._loadMoreButton = new ShowMoreButtonComponent();
  }

  render(cards) {
    const container = this._container;

    render(container, this._sortingComponent, RenderPosition.BEFOREEND);

    if (cards.length) {
      render(container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      const filmListMain = container.querySelector(`.films-list`);
      const cardBoxMain = container.querySelector(`.films-list .films-list__container`);

      const cardBoxTopRating = container.querySelector(`.films-list--top-rated .films-list__container`);
      const cardBoxMostCommented = container.querySelector(`.films-list--most-commented .films-list__container`);

      cards.slice(0, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));

      this._sortingComponent.setClickHandler((evt) => {
        cardBoxMain.innerHTML = ``;
        this._sortingComponent.getElement().querySelectorAll(`.sort__button`).forEach((it) => it.classList.remove(`sort__button--active`));

        switch (true) {
          case evt.target.dataset.sorting === `default` && !evt.target.classList.contains(`sort__button--active`):
            cards.slice(0, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));
            evt.target.classList.add(`sort__button--active`);
            break;
          case evt.target.dataset.sorting === `date` && !evt.target.classList.contains(`sort__button--active`):

            getTopDateCardList(cards).slice(0, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));
            evt.target.classList.add(`sort__button--active`);
            break;
          case evt.target.dataset.sorting === `rating` && !evt.target.classList.contains(`sort__button--active`):
            getTopRatingCardList(cards).slice(0, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));
            evt.target.classList.add(`sort__button--active`);
            break;
          default:
            break;
        }
      }, true);

      render(filmListMain, this._loadMoreButton, RenderPosition.BEFOREEND);

      this._loadMoreButton.setClickHandler(() => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        cards.slice(prevCardsCount, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));

        if (showingCardsCount >= cards.length) {
          remove(this._loadMoreButton);
        }
      });

      getTopRatingCardList(cards).slice(0, 2).forEach((card) => renderCard(card, cardBoxTopRating));
      getTopCommentsCardList(cards).slice(0, 2).forEach((card) => renderCard(card, cardBoxMostCommented));
    } else {
      render(container, this._noMoviesComponent, RenderPosition.BEFOREEND);
    }
  }
}
