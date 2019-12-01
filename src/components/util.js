// получить случайное число от (min-0.5) до (max+0.5)
function getRandomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// получить случайный элемент массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);

  return array[randomIndex];
};

// Тасование Фишера — Йетса
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export {getRandomInteger, getRandomArrayItem, shuffle};
