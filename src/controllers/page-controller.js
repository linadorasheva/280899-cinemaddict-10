import {RenderPosition, render, remove, replace} from '../utils/render.js';

import FilmsBoardComponent from '../components/films-container.js';
import LoadMoreButtonComponent from '../components/show-more-button.js';
import NoMoviesComponent from '../components/no-movies.js';
import MenuComponent from '../components/menu.js';
import Sort from '../components/sort.js';

import MovieController from './movie-controller';

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;


const getTopRatingCards = (cards) => {
  const topRatingCards = cards.slice().sort((a, b) => b.rating - a.rating);
  return topRatingCards;
};

const getTopCommentsCards = (cards) => {
  const topCommentsCards = cards.slice().sort((a, b) => b.comments - a.comments);
  return topCommentsCards;
};

const getTopDateCardList = (cards) => {
  const topCommentsCards = cards.slice().sort((a, b) => b.date.getFullYear() - a.date.getFullYear());

  return topCommentsCards;
};

const renderCards = (cards, filmsListContainer, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(filmsListContainer, onDataChange, onViewChange);
    movieController.render(card);

    return movieController;
  });
};
export default class PageController {
  constructor(container) {
    this._container = container;
    this._cards = [];
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;


    this._showedMovieControllers = [];

    this._filmsBoardComponent = new FilmsBoardComponent();
    this._menuComponent = null;
    this._sortingComponent = new Sort();
    this._noMoviesComponent = new NoMoviesComponent();
    this._loadMoreButton = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(cards) {
    const container = this._container;
    this._cards = cards;

    this._renderMenu(this._cards);

    render(container, this._sortingComponent, RenderPosition.BEFOREEND);

    if (cards.length) {
      render(container, this._filmsBoardComponent, RenderPosition.BEFOREEND);
      const filmsListContainer = this._filmsBoardComponent.getElement().querySelector(`.films-list .films-list__container`);


      const topRatingFilmsContainer = container.querySelector(`.films-list--top-rated .films-list__container`);
      const mostCommentedFilmsContainer = container.querySelector(`.films-list--most-commented .films-list__container`);

      const newCards = renderCards(this._cards.slice(0, this._showingCardsCount), filmsListContainer, this._onDataChange, this._onViewChange);
      // console.log(`default`);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      // this._sortingComponent.setSortTypeChangeHandler((evt) => {
      //   filmsListContainer.innerHTML = ``;
      //   this._sortingComponent.getElement().querySelectorAll(`.sort__button`).forEach((it) => it.classList.remove(`sort__button--active`));

      //   switch (true) {
      //     case evt.target.dataset.sorting === `default` && !evt.target.classList.contains(`sort__button--active`):
      //       cards.slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, filmsListContainer));
      //       evt.target.classList.add(`sort__button--active`);
      //       break;

      //     case evt.target.dataset.sorting === `date` && !evt.target.classList.contains(`sort__button--active`):
      //       getTopDateCardList(cards).slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, filmsListContainer));
      //       evt.target.classList.add(`sort__button--active`);
      //       break;

      //     case evt.target.dataset.sorting === `rating` && !evt.target.classList.contains(`sort__button--active`):
      //       getTopRatingCards(cards).slice(0, this._showingCardsCount).forEach((card) => this._movieController.render(card, filmsListContainer));
      //       evt.target.classList.add(`sort__button--active`);
      //       break;
      //     default:
      //       break;
      //   }
      // }, true);

      renderCards(getTopRatingCards(cards).slice(0, 2), topRatingFilmsContainer, this._onDataChange, this._onViewChange);
      renderCards(getTopCommentsCards(cards).slice(0, 2), mostCommentedFilmsContainer, this._onDataChange, this._onViewChange);

      this._renderLoadMoreButton();
    } else {
      render(container, this._noMoviesComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderLoadMoreButton() {
    if (!this._cards.length) {
      return;
    }
    const filmsList = this._filmsBoardComponent.getElement().querySelector(`.films-list`);
    const filmsListContainer = this._filmsBoardComponent.getElement().querySelector(`.films-list .films-list__container`);
    render(filmsList, this._loadMoreButton, RenderPosition.BEFOREEND);

    this._loadMoreButton.setClickHandler(this._loadMoreButton.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const newCards = renderCards(this._cards.slice(prevCardsCount, this._showingCardsCount), filmsListContainer, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      if (this._showingCardsCount >= this._cards.length) {
        remove(this._loadMoreButton);
      }
    }));
  }

  _getQuantityFilmsByCategory(array) {
    const cards = array;
    const quantityFilmsByCategory = {};
    quantityFilmsByCategory.addedToWatchlist = cards.filter((it) => it.isAddWatchList).length;
    quantityFilmsByCategory.alreadyViewedFilms = cards.filter((it) => it.isWatched).length;
    quantityFilmsByCategory.favoriteFilms = cards.filter((it) => it.isFavorite).length;

    return quantityFilmsByCategory;
  }

  _renderMenu(array) {
    const cards = array;
    const oldMenuComponent = this._menuComponent;
    this._menuComponent = new MenuComponent(this._getQuantityFilmsByCategory(cards));

    if (oldMenuComponent && this._menuComponent) {
      replace(this._menuComponent, oldMenuComponent);
    } else {
      render(this._container, this._menuComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange(movieController, oldFilmCard, newData) {
    const index = this._cards.findIndex((it) => it === oldFilmCard);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
    this._renderMenu(this._cards);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
}
