import AbstractComponent from './abstract-component.js';

const createSorting = () => {
  return (`
  <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sorting="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sorting="date">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sorting="rating">Sort by rating</a></li>
    </ul>`
  );
};
export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSorting();
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.sort__button`).addEventListener(`click`, handler);
  }
}
