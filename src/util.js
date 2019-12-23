import {KeyCode} from './constants.js';

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Нажат escape
const isEscPress = (evt) => {
  return evt.keyCode === KeyCode.ESC_KEY_CODE;
};

// Нажат enter
const isEnterPress = (evt) => {
  return evt.keyCode === KeyCode.ENTER_KEY_CODE;
};

export {getRandomArrayItem, getRandomIntegerNumber, getRandomInteger, shuffleArray, isEscPress, isEnterPress};
