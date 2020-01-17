
import {RenderPosition, render} from './utils/render.js';

import MenuComponent from './components/menu.js';
import PageController from './controllers/page-controller';
import RankComponent from './components/rank.js';

import {generateCards} from './mock/card.js';

const QUANTITY_CARDS = 25;

const cards = generateCards(QUANTITY_CARDS);

const pageFooter = document.querySelector(`.footer`);
const footerStatistic = pageFooter.querySelector(`.footer__statistics`).querySelector(`p`);
footerStatistic.textContent = `${QUANTITY_CARDS}  movies inside`;

const pageHeader = document.querySelector(`.header`);
render(pageHeader, new RankComponent(QUANTITY_CARDS), RenderPosition.BEFOREEND);

const main = document.querySelector(`.main`);
render(main, new MenuComponent(cards), RenderPosition.AFTERBEGIN);

const pageController = new PageController(main);
pageController.render(cards);
