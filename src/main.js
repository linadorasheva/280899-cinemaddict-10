import {createMenu} from './components/menu.js';
import {createRank} from './components/rank.js';
import {createFilmsContainer} from './components/films-container.js';
import {createCardMarkup} from './components/card-template.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createPopup} from './components/popup.js';
import {generateCards} from './mock/card.js';
const cards = generateCards(1);


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
render(pageHeader, createRank());

const main = document.querySelector(`.main`);
render(main, createMenu(), `afterbegin`);

render(main, createFilmsContainer());

const filmListMain = main.querySelector(`.films-list`);
render(filmListMain, createShowMoreButton());

const cardBoxMain = main.querySelector(`.films-list .films-list__container`);
const cardBoxExtra = main.querySelectorAll(`.films-list--extra .films-list__container`);
render(cardBoxMain, createCardMarkup(cards));
console.log(cards);

// cardBoxExtra.forEach((element) => {
//   render(element, createCardMarkup(generateCards(2)));
// });

const pageFooter = document.querySelector(`.footer`);
// render(pageFooter, createPopup(), `afterend`);
