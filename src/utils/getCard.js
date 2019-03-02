import {getRandomInteger} from './getRandomInteger';

export const getCard = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandomInteger(3)],
  dueDate: Date.now() + 1 + getRandomInteger(7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `work`,
    `homework`,
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [`black`, `yellow`, `blue`, `green`, `pink`][getRandomInteger(5)],
  repeatingDays: {
    'mo': [true, false][getRandomInteger(2)],
    'tu': [true, false][getRandomInteger(2)],
    'we': [true, false][getRandomInteger(2)],
    'th': [true, false][getRandomInteger(2)],
    'fr': [true, false][getRandomInteger(2)],
    'sa': [true, false][getRandomInteger(2)],
    'su': [true, false][getRandomInteger(2)],
  },
  isFavorite: [true, false][getRandomInteger(2)],
  isDone: [true, false][getRandomInteger(2)],
  edit: false,
});
