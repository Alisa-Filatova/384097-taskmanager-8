'use strict';

const MAX_CARDS = 7;
const filter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

// Mocks

const filters = [
  {
    label: `all`,
    count: 15,
    checked: true,
  },
  {
    label: `overdue`,
    count: 0,
    checked: false,
  },
  {
    label: `today`,
    count: 0,
    checked: false,
  },
  {
    label: `favorites`,
    count: 7,
    checked: false,
  },
  {
    label: `repeating`,
    count: 2,
    checked: false,
  },
  {
    label: `tags`,
    count: 6,
    checked: false,
  },
  {
    label: `archive`,
    count: 115,
    checked: false,
  },
];

const cards = [
  {
    color: `black`,
    isEdit: true,
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

// 3. В файле main.js опишите функцию для отрисовки отдельного фильтра.
// Функция должна уметь отрисовывать любой фильтр, предусмотренный макетом.

const drawFilter = ({label, count, isChecked}) => (
  `<input
    type="radio"
    id="filter__${label}"
    class="filter__input visually-hidden"
    name="filter"
    checked="${isChecked}"
    ${count === 0 ? `disabled` : ``}
   />
   <label 
    for="filter__${label}" 
    class="filter__label"
   >${label} <span class="filter__${label}-count">${count}</span>
   </label>`
);

// 4. В файле main.js опишите функцию для отрисовки одной карточки задачи.
// Пока у нас нет данных о реальных задачах, пусть функция формирует шаблон карточки опираясь на данные из макета.

const drawCard = ({color, deadlineDate, deadlineTime, image, isEdit, missedDeadline, isRepeat, text}) => (
  `<article class="card card--${color} ${missedDeadline === true ? `card--deadline` : ``} ${isRepeat ? `card--repeat` : ``} ${isEdit ? `card--edit` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${text}</textarea>
          </label>
        </div>
        <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>
      
            <fieldset 
              class="card__date-deadline" 
              ${deadlineDate ? `` : `disabled`}
            >
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                  value="${deadlineDate}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                  value="${deadlineTime}"
                />
              </label>
            </fieldset>
      
            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">no</span>
            </button>
      
            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-5"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-5"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-5"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-5"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-5"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-5"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-5"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-5"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-5"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-5"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-5"
                />
                <label class="card__repeat-day" for="repeat-sa-5"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-5"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-5"
                  >su</label
                >
              </div>
            </fieldset>
          </div>
          
          <div class="card__hashtag">
            <div class="card__hashtag-list">
              <span class="card__hashtag-inner">
                <input
                  type="hidden"
                  name="hashtag"
                  value="repeat"
                  class="card__hashtag-hidden-input"
                />
                <button type="button" class="card__hashtag-name">
                  #repeat
                </button>
                <button type="button" class="card__hashtag-delete">
                  delete
                </button>
              </span>
    
              <span class="card__hashtag-inner">
                <input
                  type="hidden"
                  name="hashtag"
                  value="repeat"
                  class="card__hashtag-hidden-input"
                />
                <button type="button" class="card__hashtag-name">
                  #cinema
                </button>
                <button type="button" class="card__hashtag-delete">
                  delete
                </button>
              </span>
    
              <span class="card__hashtag-inner">
                <input
                  type="hidden"
                  name="hashtag"
                  value="repeat"
                  class="card__hashtag-hidden-input"
                />
                <button type="button" class="card__hashtag-name">
                  #entertaiment
                </button>
                <button type="button" class="card__hashtag-delete">
                  delete
                </button>
              </span>
            </div>
            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
          </div>
          </div>
          <label class="card__img-wrap ${image ? `` : `card__img-wrap--empty`}">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="${image ? image : `img/add-photo.svg`}"
              alt="task picture"
              class="card__img"
            />
          </label>
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-5"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
              />
              <label
                for="color-black-5"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-5"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
              />
              <label
                for="color-yellow-5"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-5"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-5"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-5"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
                checked
              />
              <label
                for="color-green-5"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-5"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
              />
              <label
                for="color-pink-5"
                class="card__color card__color--pink"
                >pink</label
              >
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
);

// 5. При помощи функции, описанной в пункте 3 отрисуйте в .main__filter все фильтры, предусмотренные макетом:
// «All», «Overdue», «Today», «Favorites», «Repeating», «Tags», «Archive».
// Не забудьте возле каждого фильтра вывести произвольное количество задач.

const drawFilters = (items) => items.map(drawFilter).join(``);
filter.innerHTML = drawFilters(filters);

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
