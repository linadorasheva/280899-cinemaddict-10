import {isEscPress} from './utils/utils.js';
import {RenderPosition, render} from './utils/render.js';

import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import RankComponent from './components/rank.js';
import FilmsContainerComponent from './components/films-container.js';
import CardComponent from './components/card-template.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import PopupComponent from './components/popup.js';
import NoMoviesComponent from './components/no-movies.js';

import {generateCards} from './mock/card.js';

const QUANTITY_CARDS = 25;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const cards = generateCards(QUANTITY_CARDS);

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

const popupOpen = (element) => {
  render(pageBody, element, RenderPosition.BEFOREEND);
  document.addEventListener(`keydown`, onEscPress);
};

const renderCard = (card, container) => {
  const cardComponent = new CardComponent(card);
  const popupComponent = new PopupComponent(card);

  const popupCloseBtn = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  popupCloseBtn.addEventListener(`click`, () => popupClose());


  const filmPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  filmPoster.addEventListener(`click`, () => {
    popupOpen(popupComponent.getElement());
  });

  const filmTitle = cardComponent.getElement().querySelector(`.film-card__title`);
  filmTitle.addEventListener(`click`, () => {
    popupOpen(popupComponent.getElement());
  });

  const filmComments = cardComponent.getElement().querySelector(`.film-card__comments`);
  filmComments.addEventListener(`click`, () => {
    popupOpen(popupComponent.getElement());
  });

  render(container, cardComponent.getElement(), RenderPosition.BEFOREEND);
  render(container, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageFooter = document.querySelector(`.footer`);
const footerStatistic = pageFooter.querySelector(`.footer__statistics`).querySelector(`p`);
footerStatistic.textContent = `${QUANTITY_CARDS}  movies inside`;

const pageHeader = document.querySelector(`.header`);
render(pageHeader, new RankComponent(QUANTITY_CARDS).getElement(), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);
render(main, new MenuComponent(cards).getElement(), RenderPosition.AFTERBEGIN);
render(main, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

if (cards.length > 0) {
  render(main, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const filmListMain = main.querySelector(`.films-list`);
  const loadMoreButton = new ShowMoreButtonComponent();

  const cardBoxMain = main.querySelector(`.films-list .films-list__container`);

  const cardBoxTopRating = main.querySelector(`.films-list--top-rated .films-list__container`);
  const cardBoxMostCommented = main.querySelector(`.films-list--most-commented .films-list__container`);

  cards.slice(0, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));
  render(filmListMain, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    cards.slice(prevCardsCount, showingCardsCount).forEach((card) => renderCard(card, cardBoxMain));

    if (showingCardsCount >= cards.length) {
      filmListMain.removeChild(loadMoreButton.getElement());
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
  render(main, new NoMoviesComponent().getElement(), RenderPosition.BEFOREEND);
}
