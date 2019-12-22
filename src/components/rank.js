import {getRank} from '../mock/rank.js';

export const createRank = (quantity) => {
  const rankName = getRank(quantity);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rankName}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
