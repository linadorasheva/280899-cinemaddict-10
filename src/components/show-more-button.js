import AbstractComponent from './abstract-component.js';

const createLoadMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
