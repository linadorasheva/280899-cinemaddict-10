// получить случайное число от (min-0.5) до (max+0.5)
function getRandomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// получить случайный элемент массива
const getRandomArrayItem = (array) => {
  const randomArrElement = Math.floor(Math.random() * array.length);
  return array[randomArrElement];
};

// Тасование Фишера — Йетса
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Нажат escape
const isEscPress = (evt) => {
  return evt.keyCode === KeyCode.ESC_KEY_CODE;
};

// Нажат enter
const isEnterPress = (evt) => {
  return evt.keyCode === KeyCode.ENTER_KEY_CODE;
};

export {getRandomInteger, getRandomArrayItem, shuffle, isEscPress, isEnterPress};
