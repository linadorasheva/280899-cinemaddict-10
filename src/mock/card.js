import * as util from '../util.js';

const filmNames = [`Побег из Шоушенка`, `Форрест Гамп`, `Крестный отец`, `Интерстеллар`, `Властелин колец`, `Нокдаун`, `Прислуга`, `В погоне за счастьем`, `Адвокат дьявола`, `Воин`, `Гаттака`, `Бойцовский клуб`, `Терминал`, `Титаник`];

const filmDescriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const imgPath = `./images/posters/`;
const imgNames = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const Rating = {
  MIN: 0,
  MAX: 100
};

const Release = {
  MIN: 1972,
  MAX: 2014
};

const Timing = {
  hourMin: 0,
  hourMax: 2,
  minuteMin: 0,
  minuteMax: 59
};
const genres = [`Comedy`, `Drama`, `Fantasy`, `Fiction`, `Action`];

const Comments = {
  MIN: 0,
  MAX: 30
};

const generateFilmDescription = (template) => {
  return template.split(`.`).filter(() => Math.random() > 0.5).slice(0, 3).join(`.`);
};

const generateFilmPosterSrc = () => {
  return `${imgPath}${util.getRandomArrayItem(imgNames)}`;
};

const generateFilmRating = () => {
  return util.getRandomInteger(Rating.MIN, Rating.MAX) / 10;
};

const generateFilmDuration = () => {
  return `${util.getRandomInteger(Timing.hourMin, Timing.hourMax)}h ${util.getRandomInteger(Timing.minuteMin, Timing.minuteMax)}m`;
};

const generateCommentsQuantity = () => {
  return `${util.getRandomInteger(Comments.MIN, Comments.MAX)} comments`;
};

const getDate = () => {
  const date = new Date();
  const diffValue = util.getRandomIntegerNumber(0, 7);

  date.setDate(date.getDate() + diffValue);
  date.setMonth(date.getMonth() + diffValue);
  date.setFullYear(util.getRandomInteger(Release.MIN, Release.MAX));

  return date;
};

const generateCard = () => {
  return {
    filmPosterSrc: generateFilmPosterSrc(),
    filmName: util.getRandomArrayItem(filmNames),
    filmDescription: generateFilmDescription(filmDescriptionTemplate),
    filmRating: generateFilmRating(),
    filmDate: getDate(),
    filmDuration: generateFilmDuration(),
    filmGenre: new Set(genres),
    filmComments: generateCommentsQuantity(),
    isAddWatchList: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};
