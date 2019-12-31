import {createElement} from '../util.js';

const createFilmsContainer = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container"></div>

      </section>
      <section class="films-list--extra films-list--top-rated">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container"></div>
      </section>
      <section class="films-list--extra films-list--most-commented">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

export default class FilmsContainerComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
