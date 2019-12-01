import {createMenu} from './components/menu.js';
import {createRank} from './components/rank.js';
import {createFilmsContainer} from './components/films-container.js';
import {createCardTemplate} from './components/card-template.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createPopup} from './components/popup.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
render(pageHeader, createRank());

const main = document.querySelector(`.main`);
render(main, createMenu(), `afterbegin`);

const addCards = (quantity) => {
  return new Array(quantity).fill(createCardTemplate()).join(``);
};

render(main, createFilmsContainer());

const filmListMain = main.querySelector(`.films-list`);
render(filmListMain, createShowMoreButton());

const cardBoxMain = main.querySelector(`.films-list .films-list__container`);
const cardBoxExtra = main.querySelectorAll(`.films-list--extra .films-list__container`);
render(cardBoxMain, addCards(5));
cardBoxExtra.forEach((element) => {
  render(element, addCards(2));
});

const pageFooter = document.querySelector(`.footer`);
// render(pageFooter, createPopup(), `afterend`);
