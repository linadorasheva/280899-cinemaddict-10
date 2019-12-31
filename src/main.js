import {isEscPress, RenderPosition, render} from './util.js';

import MenuComponent from './components/menu.js';
import SortingComponent from './components/sorting.js';
import RankComponent from './components/rank.js';
import FilmsContainerComponent from './components/films-container.js';
import CardComponent from './components/card-template.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import PopupComponent from './components/popup.js';

import {generateCards} from './mock/card.js';

const QUANTITY_CARDS = 25;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const cards = generateCards(QUANTITY_CARDS);

const pageFooter = document.querySelector(`.footer`);
const footerStatistic = pageFooter.querySelector(`.footer__statistics`).querySelector(`p`);
footerStatistic.textContent = `${QUANTITY_CARDS}  movies inside`;

const pageHeader = document.querySelector(`.header`);
render(pageHeader, new RankComponent(QUANTITY_CARDS).getElement(), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);
render(main, new MenuComponent(cards).getElement(), RenderPosition.AFTERBEGIN);
render(main, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

render(main, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);

const filmListMain = main.querySelector(`.films-list`);
const loadMoreButton = new ShowMoreButtonComponent();
render(filmListMain, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

// const cardBoxMain = main.querySelector(`.films-list .films-list__container`);
// const cardBoxTopRating = main.querySelector(`.films-list--top-rated .films-list__container`);
// const cardBoxMostCommented = main.querySelector(`.films-list--most-commented .films-list__container`);

// let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
// cards.slice(0, showingCardsCount).forEach((card) => render(cardBoxMain, createCardTemplate(card)));

// loadMoreButton.addEventListener(`click`, () => {
//   const prevCardsCount = showingCardsCount;
//   showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

//   cards.slice(prevCardsCount, showingCardsCount).forEach((card) => render(cardBoxMain, createCardTemplate(card)));

//   if (showingCardsCount >= cards.length) {
//     loadMoreButton.remove();
//   }
// });

// const getTopRatingCardList = () => {
//   const topRatingCards = cards.slice().sort((a, b) => b.filmRating - a.filmRating).slice(0, 2);
//   return topRatingCards;
// };

// const getTopCommentsCardList = () => {
//   const topCommentsCards = cards.slice().sort((a, b) => b.filmComments - a.filmComments).slice(0, 2);
//   return topCommentsCards;
// };

// getTopRatingCardList().forEach((card) => render(cardBoxTopRating, createCardTemplate(card)));
// getTopCommentsCardList().forEach((card) => render(cardBoxMostCommented, createCardTemplate(card)));

// const onEscPress = () => {
//   if (isEscPress) {
//     popupClose();
//   }
// };

// const popupClose = () => {
//   document.querySelector(`.film-details`).remove();
//   document.removeEventListener(`keydown`, onEscPress);
// };

// const popupOpen = ()=> {
//   render(pageFooter, createPopup(cards[0]), `afterend`);
//   const popup = document.querySelector(`.film-details`);
//   const popupCloseBtn = popup.querySelector(`.film-details__close-btn`);
//   popupCloseBtn.addEventListener(`click`, () => popupClose());
//   document.addEventListener(`keydown`, onEscPress);
// };

// popupOpen();
