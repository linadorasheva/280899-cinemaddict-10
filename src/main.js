import {shuffleArray, isEscPress} from './util.js';

import {createMenu} from './components/menu.js';
import {createRank} from './components/rank.js';
import {createFilmsContainer} from './components/films-container.js';
import {createCardTemplate} from './components/card-template.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createPopup} from './components/popup.js';

import {generateCards} from './mock/card.js';


const QUANTITY_CARDS = 100;
const cards = generateCards(QUANTITY_CARDS);

const getMarkupCards = (count, data) => {
  const markupCards = shuffleArray(data)
    .slice(0, count)
    .map((it) => (createCardTemplate(it)))
    .join(`\n`);

  return markupCards;
};

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

const cardBoxMain = main.querySelector(`.films-list .films-list__container`);
const cardBoxExtra = main.querySelectorAll(`.films-list--extra .films-list__container`);
const cardBoxTopRating = cardBoxExtra[0];
const cardBoxMostCommented = cardBoxExtra[1];

render(cardBoxMain, getMarkupCards(5, cards));

const getTopRatingCardList = () => {
  const topRatingCards = cards.slice().sort((a, b) => b.filmRating - a.filmRating).slice(0, 2);
  return topRatingCards;
};

const getTopCommentsCardList = () => {
  const topCommentsCards = cards.slice().sort((a, b) => b.filmComments - a.filmComments).slice(0, 2);
  return topCommentsCards;
};


render(cardBoxTopRating, getMarkupCards(2, getTopRatingCardList()));
render(cardBoxMostCommented, getMarkupCards(2, getTopCommentsCardList()));


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
