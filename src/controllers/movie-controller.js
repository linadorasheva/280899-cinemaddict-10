import {isEscPress} from '../utils/utils.js';
import {RenderPosition, render} from '../utils/render.js';
import CardComponent from '../components/card-film';
import PopupComponent from '../components/popup.js';

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


export default class MovieController {

  render(card, container) {
    const cardComponent = new CardComponent(card);
    const popupComponent = new PopupComponent(card);

    popupComponent.setClickHandler(popupClose);

    cardComponent.setFilmPosterClickHandler(() => popupOpen(popupComponent));
    cardComponent.setFilmTitleClickHandler(() => popupOpen(popupComponent));
    cardComponent.setFilmCommentsClickHandler(() => popupOpen(popupComponent));

    render(container, cardComponent, RenderPosition.BEFOREEND);
  }
}
