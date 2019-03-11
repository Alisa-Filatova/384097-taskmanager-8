import drawFilter from './draw-filter';
import Task from './task';
import TaskEdit from './task-edit';
import {createTask, getRandomInteger} from './utils';
import {FILTERS, MAX_TASKS_COUNT, MAX_CARDS} from './constants';

const filter = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

// 5. При помощи функции, описанной в пункте 3 отрисуйте в .main__filter все фильтры, предусмотренные макетом:
// «All», «Overdue», «Today», «Favorites», «Repeating», «Tags», «Archive».
// Не забудьте возле каждого фильтра вывести произвольное количество задач.

FILTERS.forEach((filterName) => {
  const checked = filterName === `All` ? true : ``;
  filter.insertAdjacentHTML(`beforeend`, drawFilter(filterName, getRandomInteger(MAX_TASKS_COUNT), checked));
});

const renderTasks = (amount, container) => Array.from({length: amount}).map(() => {
  const data = createTask();
  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data);
  container.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    container.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.destroy();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    container.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.destroy();
  };
});

renderTasks(MAX_CARDS, tasksContainer);

// 7. Добавьте обработчик события click для отрисованных фильтров. При переключении фильтров очищайте
// контейнер board__tasks от ранее созданных задач и добавляйте случайное количество новых задач.

filter.addEventListener(`click`, (event) => {
  const tasks = tasksContainer.querySelectorAll(`.card`);

  if (event.target.className === `filter__label` && !event.target.previousElementSibling.hasAttribute(`disabled`)) {
    tasks.forEach((item) => item.remove());
    renderTasks(getRandomInteger(MAX_CARDS), tasksContainer);
  }
});
