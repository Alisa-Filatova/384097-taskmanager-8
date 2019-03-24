import moment from 'moment';
import flatpickr from 'flatpickr';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import {createTask} from './utils';
import {createTagChart, createColorChart} from './statistic.js';
import {MAX_CARDS} from './constants';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const controlStatisticElement = document.querySelector(`#control__statistic`);
const containerStatistic = document.querySelector(`.statistic`);
const statisticInput = containerStatistic.querySelector(`.statistic__period-input`);
const tagsCtxWrap = document.querySelector(`.statistic__tags-wrap`);
const colorsCtxWrap = document.querySelector(`.statistic__colors-wrap`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

// 5. При помощи функции, описанной в пункте 3 отрисуйте в .main__filter все фильтры, предусмотренные макетом:
// «All», «Overdue», «Today», «Favorites», «Repeating», «Tags», «Archive».
// Не забудьте возле каждого фильтра вывести произвольное количество задач.

// FILTERS.forEach((filterName) => {
//   const checked = filterName === `All` ? true : ``;
//   filtersContainer.insertAdjacentHTML(`beforeend`, drawFilter(filterName, getRandomInteger(MAX_TASKS_COUNT), checked));
// });

const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const createTasks = (count) => {
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(createTask(i));
  }
  return tasks;
};

const renderTasks = (amount, container) => Array.from({length: amount}).map(() => {
  const data = createTask();
  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data);

  container.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    editTaskComponent.update(data);
    editTaskComponent.render();
    container.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.destroy();
  };

  editTaskComponent.onSave = (newObject) => {
    data.title = newObject.title;
    data.tags = newObject.tags;
    data.color = newObject.color;
    data.repeatingDays = newObject.repeatingDays;
    data.dueDate = newObject.dueDate;

    taskComponent.update(data);
    taskComponent.render();
    container.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.destroy();
  };
});

renderTasks(MAX_CARDS, tasksContainer);

const filtersData = [
  {id: 1, name: `All`, count: 5, checked: true},
  {id: 2, name: `Overdue`, count: 2, checked: false},
  {id: 3, name: `Today`, count: 3, checked: false},
  {id: 4, name: `Favorites`, count: 1, checked: false},
  {id: 5, name: `Repeating`, count: 5, checked: false},
  {id: 6, name: `Tags`, count: 1, checked: false},
  {id: 7, name: `Archive`, count: 3, checked: false},
];

const renderFilters = (data, tasks) => {
  filtersContainer.innerHTML = ``;

  data.forEach((filter) => {
    const filterComponent = new Filter(filter);

    filtersContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      containerStatistic.classList.add(`visually-hidden`);
      tasksContainer.classList.remove(`visually-hidden`);

      switch (filterComponent._name) {
        case `All`:
          return renderTasks(tasks);

        case `Overdue`:
          return renderTasks(tasks.filter((item) => item.dueDate < Date.now()));

        case `Today`:
          return renderTasks(tasks.filter(() => true));

        case `Repeating`:
          return renderTasks(tasks.filter((item) => [...Object.entries(item.repeatingDays)]
          .some((rec) => rec[1])));
      }

      return renderTasks(tasks);
    };
  });
};

// filtersContainer.addEventListener(`click`, (event) => {
//   const taskElements = tasksContainer.querySelectorAll(`.card`);
//
//   if (event.target.className === `filter__label` && !event.target.previousElementSibling.hasAttribute(`disabled`)) {
//     taskElements.forEach((item) => item.remove());
//     renderTasks(getRandomInteger(MAX_CARDS), tasksContainer);
//   }
// });

const onClickStatistic = () => {
  tagsCtxWrap.classList.remove(`visually-hidden`);
  colorsCtxWrap.classList.remove(`visually-hidden`);
  containerStatistic.classList.remove(`visually-hidden`);
  tasksContainer.classList.add(`visually-hidden`);

  createTagChart(tagsCtx);
  createColorChart(colorsCtx);
};

const onStatisticInputChange = () => {
  createTagChart(tagsCtx);
  createColorChart(colorsCtx);
};

controlStatisticElement.addEventListener(`click`, onClickStatistic);

statisticInput.placeholder = `${moment().startOf(`week`).format(`D MMM`)} - ${moment().endOf(`week`).format(`D MMM`)}`;

flatpickr(statisticInput, {
  altInput: true,
  altFormat: `j F`,
  mode: `range`,
  dateFormat: `Y-m-d`,
  onChange(selectedDates, dateStr, instance) {
    dateStr = moment(selectedDates[0], `YYYY-MMMM-DD`).format(`D MMM`);
    if (selectedDates[1]) {
      dateStr = `${moment(selectedDates[0], `YYYY-MMMM-DD`).format(`D MMM`)} - ${moment(selectedDates[1], `YYYY-MMMM-DD`).format(`D MMM`)}`;
    }
    instance.altInput.value = dateStr;
  }
});

statisticInput.addEventListener(`change`, onStatisticInputChange);

renderFilters(filtersData, renderTasks(MAX_CARDS, tasksContainer));


