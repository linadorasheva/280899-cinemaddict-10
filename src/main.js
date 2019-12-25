import {isEscPress} from './util.js';

import {createMenu} from './components/menu.js';
import {createRank} from './components/rank.js';
import {createFilmsContainer} from './components/films-container.js';
import {createCardTemplate} from './components/card-template.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createPopup} from './components/popup.js';

import {generateCards} from './mock/card.js';

const QUANTITY_CARDS = 15;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const cards = generateCards(QUANTITY_CARDS);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageFooter = document.querySelector(`.footer`);
const footerStatistic = pageFooter.querySelector(`.footer__statistics`).querySelector(`p`);
footerStatistic.textContent = `${QUANTITY_CARDS}  movies inside`;

const pageHeader = document.querySelector(`.header`);
render(pageHeader, createRank(QUANTITY_CARDS));

const main = document.querySelector(`.main`);
render(main, createMenu(cards), `afterbegin`);

render(main, createFilmsContainer());

const filmListMain = main.querySelector(`.films-list`);
render(filmListMain, createShowMoreButton());
const loadMoreButton = filmListMain.querySelector(`.films-list__show-more`);

const cardBoxMain = main.querySelector(`.films-list .films-list__container`);
const cardBoxTopRating = main.querySelector(`.films-list--top-rated .films-list__container`);
const cardBoxMostCommented = main.querySelector(`.films-list--most-commented .films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
cards.slice(0, showingCardsCount).forEach((card) => render(cardBoxMain, createCardTemplate(card)));

loadMoreButton.addEventListener(`click`, () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevCardsCount, showingCardsCount).forEach((card) => render(cardBoxMain, createCardTemplate(card)));

  if (showingCardsCount >= cards.length) {
    loadMoreButton.remove();
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

getTopRatingCardList().forEach((card) => render(cardBoxTopRating, createCardTemplate(card)));
getTopCommentsCardList().forEach((card) => render(cardBoxMostCommented, createCardTemplate(card)));

const onEscPress = () => {
  if (isEscPress) {
    popupClose();
  }
};

const popupClose = () => {
  document.querySelector(`.film-details`).remove();
  document.removeEventListener(`keydown`, onEscPress);
};

const popupOpen = ()=> {
  render(pageFooter, createPopup(cards[0]), `afterend`);
  const popup = document.querySelector(`.film-details`);
  const popupCloseBtn = popup.querySelector(`.film-details__close-btn`);
  popupCloseBtn.addEventListener(`click`, () => popupClose());
  document.addEventListener(`keydown`, onEscPress);
};

popupOpen();
