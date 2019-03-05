import {getRandomInteger} from './get-random-integer';
import {getRandomArrayElement} from './get-random-array-element';
import {compareRandom} from './compare-random';

const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const hashTags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `work`,
  `homework`,
]);
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const booleans = [false, true];
const DAY_LENGTH = 86400000;

export const getCard = () => ({
  title: getRandomArrayElement(titles),
  dueDate: Date.now() + getRandomInteger(7) * DAY_LENGTH,
  tags: [...hashTags].sort(compareRandom).slice(0, Math.ceil(Math.random() * 3)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomArrayElement(colors),
  repeatingDays: {
    'mo': getRandomArrayElement(booleans),
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: getRandomArrayElement(booleans),
  isDone: getRandomArrayElement(booleans),
  edit: false,
});
