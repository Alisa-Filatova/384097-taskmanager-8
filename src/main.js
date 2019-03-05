import drawFilter from './draw-filter';
import drawCard from './draw-card';
import {getCard} from './utils/get-card';
import {getRandomInteger} from './utils/get-random-integer';

const MAX_CARDS = 7;
const MAX_TASKS_COUNT = 15;
const filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

// 5. При помощи функции, описанной в пункте 3 отрисуйте в .main__filter все фильтры, предусмотренные макетом:
// «All», «Overdue», «Today», «Favorites», «Repeating», «Tags», «Archive».
// Не забудьте возле каждого фильтра вывести произвольное количество задач.

filters.forEach((filterName) => {
  const checked = filterName === `All` ? true : ``;
  filter.insertAdjacentHTML(`beforeend`, drawFilter(filterName, getRandomInteger(MAX_TASKS_COUNT), checked));
});

const drawCards = (amount) => new Array(amount).fill(``).map(() => drawCard(getCard())).join(``);

boardTasks.insertAdjacentHTML(`beforeend`, drawCards(MAX_CARDS));

// 7. Добавьте обработчик события click для отрисованных фильтров. При переключении фильтров очищайте
// контейнер board__tasks от ранее созданных задач и добавляйте случайное количество новых задач.

filter.addEventListener(`click`, (event) => {
  const tasks = boardTasks.querySelectorAll(`.card`);

  if (event.target.className === `filter__label` && !event.target.previousElementSibling.hasAttribute(`disabled`)) {
    tasks.forEach((item) => item.remove());
    boardTasks.insertAdjacentHTML(`beforeend`, drawCards(getRandomInteger(MAX_CARDS)));
  }
});
