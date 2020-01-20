import AbstractComponent from './abstract-component.js';

export const SortType = {
  DATE: `date`,
  RATING: `date-up`,
  DEFAULT: `default`,
};

const createSorting = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button" data-sorting="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sorting="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sorting="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};
export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this._activeBtnClassName = `sort__button--active`;
  }

  getTemplate() {
    return createSorting();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sorting;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType, this._activeBtnClassName, evt);
    });
  }
}
