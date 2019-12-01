import * as util from "../components/util.js";

const Ratio = {
  MIN: 0,
  MAX: 10
};

const DescriptionSize = {
  MIN: 1,
  MAX: 3
};

const Date = {
  MIN: 1972,
  MAX: 2019
};

const DurationInHours = {
  MIN: 0,
  MAX: 3
};

const DurationInMinutes = {
  MIN: 0,
  MAX: 60
};

const posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const filmsTitles = [`Friends`, `Warrior`, `Forrest Gump`, `The Godfather`, `Interstellar`, `The Shawshank Redemption`, `The Lord of the Rings`, `Fight Club`, `Catch Me If You Can`, `The Pursuit of Happyness `, `Titanic`, `The Blind Side`, `The Prestige`, `Million Dollar Baby`, `Joker`];

const descriptionTmpl = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const filmsGenres = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Triller`, `Action`, `Sitcom`, `Fiction`];

const getDescription = () => util.shuffle(descriptionTmpl).slice(0, util.getRandomInteger(DescriptionSize.MIN, DescriptionSize.MAX));

const generateCardData = () => {
  return {
    img: `./public/posters/${util.getRandomArrayItem(posters)}`,
    name: util.getRandomArrayItem(filmsTitles),
    ratio: util.getRandomInteger(Ratio.MIN, Ratio.MAX),
    description: getDescription().join(`. `),
    date: util.getRandomInteger(Date.MIN, Date.MAX),
    duration: `${util.getRandomInteger(DurationInHours.MIN, DurationInHours.MAX)}h ${util.getRandomInteger(DurationInMinutes.MIN, DurationInMinutes.MAX)}m`,
    genre: util.getRandomArrayItem(filmsGenres),
    comments: `${util.getRandomInteger(Ratio.MIN, Ratio.MAX)} comments`
  };
};

const generateCards = (quantity) => {
  return new Array(quantity).fill(``).map(generateCardData);
};

export {generateCards};
