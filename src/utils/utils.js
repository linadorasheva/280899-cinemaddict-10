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

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {getRandomArrayItem, getRandomIntegerNumber, getRandomInteger, isEscPress, isEnterPress, RenderPosition, createElement, render};
