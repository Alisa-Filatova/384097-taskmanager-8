import drawFilter from './draw-filter';
import drawCard from './draw-card';

const MAX_CARDS = 7;
const MAX_TASKS_COUNT = 15;
const filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

// Mocks

const cards = [
  {
    color: `black`,
    isEdit: false,
    text: `Here is a card with filled data`,
    missedDeadline: false,
    isRepeat: false,
  },
  {
    color: `blue`,
    text: `This is card with missing deadline`,
    missedDeadline: true,
    isEdit: false,
    isRepeat: false,
  },
  {
    color: `pink`,
    isRepeat: true,
    text: `It is example of repeating task. It marks by wave.`,
    deadlineDate: `22.09.2019`,
    deadlineTime: `11:03`,
    image: `img/sample-img.jpg`,
    isEdit: false,
    missedDeadline: false,
  },
  {
    color: `blue`,
    isEdit: false,
    missedDeadline: false,
    isRepeat: false,
    text: ``,
  },
  {
    color: `yellow`,
    text: `This is example of new task, you can add picture, set date and time, add tags.`,
    isEdit: false,
    missedDeadline: false,
    isRepeat: false,
  },
  {
    color: `yellow`,
    isRepeat: true,
    isEdit: false,
    missedDeadline: false,
    text: ``,
  },
  {
    color: `green`,
    isRepeat: true,
    isEdit: false,
    missedDeadline: false,
    text: ``,
  },
];

// 5. При помощи функции, описанной в пункте 3 отрисуйте в .main__filter все фильтры, предусмотренные макетом:
// «All», «Overdue», «Today», «Favorites», «Repeating», «Tags», «Archive».
// Не забудьте возле каждого фильтра вывести произвольное количество задач.

filters.forEach((filterName) => {
  const checked = filterName === `All` ? true : ``;
  return filter.insertAdjacentHTML(`beforeend`, drawFilter(filterName, Math.ceil(Math.random() * MAX_TASKS_COUNT), checked));
});

// 6. С помощью функции, созданной в пункте 4 отрисуйте семь одинаковых карточек задач в .board__tasks.

const drawCards = (items) => items.map(drawCard).join(``);
boardTasks.innerHTML = drawCards(cards);

// 7. Добавьте обработчик события click для отрисованных фильтров. При переключении фильтров очищайте
// контейнер board__tasks от ранее созданных задач и добавляйте случайное количество новых задач.

const getRandomCountCards = (items) => items.slice(0, Math.ceil(Math.random() * MAX_CARDS)).map(drawCard).join(``);

filter.addEventListener(`click`, (event) => {
  const tasks = boardTasks.querySelectorAll(`.card`);

  if (event.target.className === `filter__label` && !event.target.previousElementSibling.hasAttribute(`disabled`)) {
    tasks.forEach((item) => item.remove());
    boardTasks.innerHTML = getRandomCountCards(cards);
  }
});
