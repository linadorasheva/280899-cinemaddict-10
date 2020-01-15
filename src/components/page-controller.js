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

  cardComponent.setClickHandler(`.film-card__poster`, () => {
    popupOpen(popupComponent);
  });

  cardComponent.setClickHandler(`.film-card__title`, () => {
    popupOpen(popupComponent);
  });

  cardComponent.setClickHandler(`.film-card__comments`, () => {
    popupOpen(popupComponent);
  });

  render(container, cardComponent, RenderPosition.BEFOREEND);
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

    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    if (cards.length) {
      render(container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      const filmListMain = container.querySelector(`.films-list`);
      const cardBoxMain = container.querySelector(`.films-list .films-list__container`);

      const cardBoxTopRating = container.querySelector(`.films-list--top-rated .films-list__container`);
      const cardBoxMostCommented = container.querySelector(`.films-list--most-commented .films-list__container`);

      cards.slice(0, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));

      render(filmListMain, this._loadMoreButton, RenderPosition.BEFOREEND);

      this._loadMoreButton.setClickHandler(() => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        cards.slice(prevCardsCount, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));

        if (showingCardsCount >= cards.length) {
          remove(this._loadMoreButton);
        }
      });

      const getTopRatingCardList = () => {
        const topRatingCards = cards.slice().sort((a, b) => b.filmRating - a.filmRating).slice(0, 2);
        return topRatingCards;
      };

      const getTopCommentsCardList = () => {
        const topCommentsCards = cards.slice().sort((a, b) => b.filmComments - a.filmComments).slice(0, 2);
        return topCommentsCards;
      };

      getTopRatingCardList().forEach((card) => renderCard(card, cardBoxTopRating));
      getTopCommentsCardList().forEach((card) => renderCard(card, cardBoxMostCommented));
    } else {
      render(container, this._noMoviesComponent, RenderPosition.BEFOREEND);
    }
  }
}
