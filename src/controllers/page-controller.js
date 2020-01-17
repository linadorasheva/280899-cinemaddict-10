import {RenderPosition, render, remove} from '../utils/render.js';

import FilmsBoardComponent from '../components/films-container.js';
import LoadMoreButtonComponent from '../components/show-more-button.js';
import NoMoviesComponent from '../components/no-movies.js';
import Sort from '../components/sort.js';

import MovieController from './movie-controller';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;


const getTopRatingCards = (cards) => {
  const topRatingCards = cards.slice().sort((a, b) => b.filmRating - a.filmRating);
  return topRatingCards;
};

const getTopCommentsCards = (cards) => {
  const topCommentsCards = cards.slice().sort((a, b) => b.filmComments - a.filmComments);
  return topCommentsCards;
};

const getTopDateCardList = (cards) => {
  const topCommentsCards = cards.slice().sort((a, b) => b.filmDate.getFullYear() - a.filmDate.getFullYear());

  return topCommentsCards;
};


export default class PageController {
  constructor(container) {
    this._container = container;
    this._cards = [];

    this._movieController = new MovieController();

    this._filmsBoardComponent = new FilmsBoardComponent();
    this._filmsList = this._filmsBoardComponent.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._filmsBoardComponent.getElement().querySelector(`.films-list .films-list__container`);
    this._filmsListTopRating = this._filmsBoardComponent.getElement().querySelector(`.films-list--top-rated .films-list__container`);
    this._filmsListMostCommented = this._filmsBoardComponent.getElement().querySelector(`.films-list--most-commented .films-list__container`);

    this._sortingComponent = new Sort();
    this._noMoviesComponent = new NoMoviesComponent();
    this._loadMoreButton = new LoadMoreButtonComponent();
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
  }

  render(cards) {
    const container = this._container;
    this._cards = cards;

    render(container, this._sortingComponent, RenderPosition.BEFOREEND);

    if (cards.length) {
      render(container, this._filmsBoardComponent, RenderPosition.BEFOREEND);

      const filmsListTopRating = container.querySelector(`.films-list--top-rated .films-list__container`);
      const filmsListMostCommented = container.querySelector(`.films-list--most-commented .films-list__container`);

      cards.slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, this._filmsListContainer));

      this._sortingComponent.setSortTypeChangeHandler((evt) => {
        this._filmsListContainer.innerHTML = ``;
        this._sortingComponent.getElement().querySelectorAll(`.sort__button`).forEach((it) => it.classList.remove(`sort__button--active`));

        switch (true) {
          case evt.target.dataset.sorting === `default` && !evt.target.classList.contains(`sort__button--active`):
            cards.slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, this._filmsListContainer));
            evt.target.classList.add(`sort__button--active`);
            break;

          case evt.target.dataset.sorting === `date` && !evt.target.classList.contains(`sort__button--active`):
            getTopDateCardList(cards).slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, this._filmsListContainer));
            evt.target.classList.add(`sort__button--active`);
            break;

          case evt.target.dataset.sorting === `rating` && !evt.target.classList.contains(`sort__button--active`):
            getTopRatingCards(cards).slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, this._filmsListContainer));
            evt.target.classList.add(`sort__button--active`);
            break;
          default:
            break;
        }
      }, true);

      getTopRatingCards(cards).slice(0, 2).forEach((card) => this._movieController.render(card, filmsListTopRating));
      getTopCommentsCards(cards).slice(0, 2).forEach((card) => this._movieController.render(card, filmsListMostCommented));

      this._renderLoadMoreButton();
    } else {
      render(container, this._noMoviesComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderLoadMoreButton() {
    if (!this._cards.length) {
      return;
    }

    render(this._filmsList, this._loadMoreButton, RenderPosition.BEFOREEND);

    this._loadMoreButton.setClickHandler(this._loadMoreButton.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      this._cards.slice(prevCardsCount, this._showingCardsCount).forEach((card) => this._movieController.render(card, this._filmsListContainer));

      if (this._showingCardsCount >= this._cards.length) {
        remove(this._loadMoreButton);
      }
    }));
  }
}
