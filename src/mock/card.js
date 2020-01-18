import {getRandomArrayItem, getRandomInteger, getRandomIntegerNumber} from '../utils/utils.js';

const names = [`Побег из Шоушенка`, `Форрест Гамп`, `Крестный отец`, `Интерстеллар`, `Нокдаун`, `Прислуга`, `В погоне за счастьем`, `Адвокат дьявола`, `Воин`, `Гаттака`, `Бойцовский клуб`, `Терминал`, `Титаник`, `Семь`];

const filmOriginalsName = {
  'Побег из Шоушенка': `The Shawshank Redemption`,
  'Форрест Гамп': `Forrest Gump`,
  'Крестный отец': `The Godfather`,
  'Интерстеллар': `Interstellar`,
  'Нокдаун': `Cinderella Man`,
  'Прислуга': `The Help`,
  'В погоне за счастьем': `The Pursuit of Happyness`,
  'Адвокат дьявола': `The Devil's Advocate`,
  'Воин': `Warrior`,
  'Гаттака': `Gattaca`,
  'Бойцовский клуб': `Fight Club`,
  'Терминал': `The Terminal`,
  'Титаник': `Titanic`,
  'Семь': `Se7en`
};

const descriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

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

const generateDescription = (template) => {
  return template.split(`.`).filter(() => Math.random() > 0.5).slice(0, 3).join(`.`);
};

const generatePosterSrc = () => {
  return `${imgPath}${getRandomArrayItem(imgNames)}`;
};

const generateRating = () => {
  return getRandomInteger(Rating.MIN, Rating.MAX) / 10;
};

const generateDuration = () => {
  return `${getRandomInteger(Timing.hourMin, Timing.hourMax)}h ${getRandomInteger(Timing.minuteMin, Timing.minuteMax)}m`;
};

const generateCommentsQuantity = () => {
  return getRandomInteger(Comments.MIN, Comments.MAX);
};

const getDate = () => {
  const date = new Date();
  const diffValue = getRandomIntegerNumber(0, 7);

  date.setDate(date.getDate() + diffValue);
  date.setMonth(date.getMonth() + diffValue);
  date.setFullYear(getRandomInteger(Release.MIN, Release.MAX));

  return date;
};

const filmDirectors = [`James Cameron`, `David Fincher`, `Christopher Nolan`, `Gavin O'Connor`, `Francis Ford Coppola`, `Tate Taylor`];
const filmWriters = [`James Cameron`, `Chuck Palahniuk`, `Christopher Nolan`, `Gavin O'Connor`, `Cliff Dorfman`, `Anthony Tambakis`, `Francis Ford Coppola`, `Tate Taylor`];
const filmActors = [`Robert De Niro`, `Gwyneth Paltrow`, `Al Pacino`, `Brad Pitt`, `Leonardo DiCaprio`, `Tom Cruise`, `Kate Winslet`, `Tom Hardy`, `Joel Edgerton`, `Marlon Brando`, `Emma Stone`];
const filmCountries = [`USA`, `UK`, `Italy`, `Spain`, `France`, `Japan`, `Norway`, `Portugal`, `Mexico`];
const filmAgeRatings = [0, 6, 12, 16, 18];

const generateActors = () => {
  return filmActors.filter(() => Math.random() > 0.5).join(`, `);
};

const generateWriters = () => {
  return filmWriters.filter(() => Math.random() > 0.5).join(`, `);
};

const generateCard = () => {
  const generateGenres = () => {
    return genres.filter(() => Math.random() > 0.5);
  };

  return {
    posterSrc: generatePosterSrc(),
    name: getRandomArrayItem(names),
    filmOriginalName: filmOriginalsName,
    description: generateDescription(descriptionTemplate),
    rating: generateRating(),
    date: getDate(),
    duration: generateDuration(),
    genres: generateGenres(),
    comments: generateCommentsQuantity(),
    isAddWatchList: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    filmDirectors: new Set(filmDirectors),
    filmWriters: generateWriters(),
    filmActors: generateActors(),
    filmCountry: getRandomArrayItem(filmCountries),
    filmAgeRating: getRandomArrayItem(filmAgeRatings)
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};
