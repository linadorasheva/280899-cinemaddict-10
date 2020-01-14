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

// Нажат escape
const isEscPress = (evt) => {
  return evt.keyCode === KeyCode.ESC_KEY_CODE;
};

// Нажат enter
const isEnterPress = (evt) => {
  return evt.keyCode === KeyCode.ENTER_KEY_CODE;
};

export {getRandomArrayItem, getRandomIntegerNumber, getRandomInteger, isEscPress, isEnterPress};
