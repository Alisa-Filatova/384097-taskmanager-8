import moment from 'moment';
import flatpickr from 'flatpickr';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import API from './api';
import {createTagChart, createColorChart} from './statistic';
import {END_POINT, AUTHORIZATION, HIDDEN_CLASS} from './constants';

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const controlStatisticElement = document.querySelector(`#control__statistic`);
const containerStatistic = document.querySelector(`.statistic`);
const statisticInput = containerStatistic.querySelector(`.statistic__period-input`);
const tagsCtxWrap = document.querySelector(`.statistic__tags-wrap`);
const colorsCtxWrap = document.querySelector(`.statistic__colors-wrap`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
const placeholderContainer = document.querySelector(`.board__no-tasks`);
const filtersData = [
  {id: `all`, name: `All`, count: null, checked: true},
  {id: `overdue`, name: `Overdue`, count: null},
  {id: `today`, name: `Today`, count: null},
  {id: `favorites`, name: `Favorites`, count: null},
  {id: `repeating`, name: `Repeating`, count: null},
  {id: `tags`, name: `Tags`, count: null},
  {id: `archive`, name: `Archive`, count: null},
];

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const renderTasks = (tasks, container) => {
  tasks.map((task) => {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    container.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.update(task);
      editTaskComponent.render();
      container.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.destroy();
    };

    editTaskComponent.onSave = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      api.updateTask({id: task.id, data: task.toRAW()})
        .then((newTask) => {
          taskComponent.update(newTask);
          taskComponent.render();
          tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
          editTaskComponent.destroy();
        })
        .catch(() => editTaskComponent.showError());
    };

    editTaskComponent.onDelete = ({id}) => {
      editTaskComponent.disableForm();

      api.deleteTask(({id}))
        .then(() => {
          api.getTasks().then((newTasks) => {
            editTaskComponent.unblockForm();
            container.innerHTML = ``;
            renderTasks(newTasks, tasksContainer);
          })
          .catch(() => editTaskComponent.showError());
        });
    };
  });
};

const renderFilters = (data, tasks) => {
  filtersContainer.innerHTML = ``;

  data.forEach((filterItem) => {
    const filterData = Object.assign(filterItem);

    const calcTypeOfTasksCount = (filter, tasksData) => {
      if (filter.name === `Overdue`) {
        filter.count = tasksData.filter((task) => task.dueDate < Date.now()).length;
      } else if (filter.name === `Today`) {
        filter.count = 0;
      } else if (filter.name === `Favorites`) {
        filter.count = tasksData.filter((item) => item.isFavorite).length;
      } else if (filter.name === `Repeating`) {
        filter.count = tasksData.filter((item) => [...Object.entries(item.repeatingDays)]
          .some((rec) => rec[1])).length;
      } else if (filter.name === `Tags`) {
        filter.count = tasksData.filter((item) => [...Object.entries(item.tags)]
          .some((rec) => rec[1])).length;
      } else if (filter.name === `Archive`) {
        filter.count = 0;
      } else if (filter.name === `All`) {
        filter.count = tasksData.length;
      }
    };

    calcTypeOfTasksCount(filterData, tasks);
    const filterComponent = new Filter(filterData);

    filtersContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      containerStatistic.classList.add(HIDDEN_CLASS);
      tasksContainer.classList.remove(HIDDEN_CLASS);
      const taskCards = tasksContainer.querySelectorAll(`.card`);
      taskCards.forEach((card) => card.remove());

      switch (filterComponent._id) {
        case `all`:
          return renderTasks(tasks, tasksContainer);

        case `overdue`:
          return renderTasks(tasks.filter((item) => item.dueDate < Date.now()), tasksContainer);

        case `today`:
          return renderTasks(tasks.filter(() => true), tasksContainer);

        case `repeating`:
          return renderTasks(tasks.filter((item) => [...Object.entries(item.repeatingDays)]
            .some((rec) => rec[1])), tasksContainer);
        case `tags`:
          return renderTasks(tasks.filter((item) => [...Object.entries(item.tags)]
            .some((rec) => rec[1])), tasksContainer);
        case `favorites`:
          return renderTasks(tasks.filter((item) => item.isFavorite), tasksContainer);

        default:
          return renderTasks(tasks, tasksContainer);
      }
    };
  });
};

const onClickStatistic = () => {
  tagsCtxWrap.classList.remove(HIDDEN_CLASS);
  colorsCtxWrap.classList.remove(HIDDEN_CLASS);
  containerStatistic.classList.remove(HIDDEN_CLASS);
  tasksContainer.classList.add(HIDDEN_CLASS);

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

const showPlaceholder = (message) => {
  placeholderContainer.textContent = message;
  placeholderContainer.classList.remove(HIDDEN_CLASS);
};

const removePlaceholder = () => {
  placeholderContainer.classList.add(HIDDEN_CLASS);
};

showPlaceholder(`Loading tasks...`);

api.getTasks()
  .then((tasks) => {
    removePlaceholder();
    renderTasks(tasks, tasksContainer);
    renderFilters(filtersData, tasks);
  })
  .catch(() =>
    showPlaceholder(`Something went wrong while loading your tasks. Check your connection or try again later`));

