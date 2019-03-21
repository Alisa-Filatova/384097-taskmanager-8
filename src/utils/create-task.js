import {getRandomInteger} from './get-random-integer';
import {getRandomArrayElement} from './get-random-array-element';
import {compareRandom} from './compare-random';
import {COLORS, DAY_LENGTH, BOOLEANS, WEEKDAYS_COUNT, MAX_TAGS_COUNT} from '../constants';

const TITLES = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const hashTags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `work`,
  `homework`,
]);

export const createTask = () => ({
  title: getRandomArrayElement(TITLES),
  dueDate: Date.now() + getRandomInteger(WEEKDAYS_COUNT) * DAY_LENGTH,
  tags: [...hashTags].sort(compareRandom).slice(0, Math.ceil(Math.random() * MAX_TAGS_COUNT)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomArrayElement(COLORS),
  repeatingDays: {
    'mo': getRandomArrayElement(BOOLEANS),
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: getRandomArrayElement(BOOLEANS),
  isDone: getRandomArrayElement(BOOLEANS),
});
