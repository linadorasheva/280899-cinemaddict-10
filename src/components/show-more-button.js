import AbstractComponent from './abstract-component.js';

const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createShowMoreButton();
  }
}
