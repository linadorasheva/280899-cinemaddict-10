const getButtonClass = (flag) => {
  return flag ? `film-card__controls-item--active` : ``;
};

export const createCardTemplate = (card) => {
  const {filmPosterSrc, filmName, filmDescription, filmRating, filmDate, filmDuration, filmGenre, filmComments, isAddWatchList, isWatched, isFavorite} = card;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${filmRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmDate}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${filmGenre}</span>
      </p>
      <img src="${filmPosterSrc}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmDescription}</p>
      <a class="film-card__comments">${filmComments}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getButtonClass(isAddWatchList)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getButtonClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getButtonClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};
