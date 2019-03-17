import flatpickr from 'flatpickr';
import moment from 'moment';
import Component from './component';
import {Colors} from './enums/colors';

class EditTask extends Component {
  constructor(task) {
    super();
    this._title = task.title;
    this._dueDate = task.dueDate;
    this._picture = task.picture;
    this._tags = task.tags;
    this._repeatingDays = task.repeatingDays;
    this._color = task.color;

    this._onSave = null;
    this._onSaveButtonClick = this._onSaveButtonClick.bind(this);

    this._state = {
      isDate: !!this._dueDate,
      isRepeated: !!this._isRepeated().length,
    };

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  update(task) {
    this._title = task.title;
    this._tags = task.tags;
    this._color = task.color;
    this._repeatingDays = task.repeatingDays;
    this._dueDate = task.dueDate;
  }

  // createMapper сопоставляет поля формы с полями структуры и записывает в них полученные значения

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = value;
      },
      time: (value) => {
        target.dueDate = target.dueDate ? target.dueDate + ` ` + value : ``;
      },
    };
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).filter((value) => value === true);
  }

  // После получения данных из формы, нам требуется подготовить новый объект – объект в котором будет
  // записана обновленная сущность.

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = EditTask.createMapper(entry);

    Array.from(formData.entries())
      .forEach(([property, value]) => taskEditMapper[property] && taskEditMapper[property](value));

    return entry;
  }

  _onSaveButtonClick(event) {
    event.preventDefault();

    // formData для сбора данных из формы
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSave === `function` && this._onSave(newData)) {
      this.update(newData);
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeEventListeners();
    this._partialUpdate();
    this.addEventListeners();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeEventListeners();
    this._partialUpdate();
    this.addEventListeners();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSave(fn) {
    this._onSave = fn;
  }

  _renderColorItems() {
    return (
      Object.keys(Colors).map((color) => `<input 
        type="radio" id="color-${color}-5"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${this._color === color && `checked`}
      />
      <label for="color-${color}-5" class="card__color card__color--${color}">${color}</label >`).join(``)
    );
  }

  get template() {
    return (`<article class="card ${Colors[this._color]} card--edit ${this._dueDate < Date.now() ? `card--deadline` : ``} 
      ${this._isRepeated().length > 0 && this._state.isRepeated ? `card--repeat` : ``}">
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
                >${this._title}</textarea>
              </label>
            </div>
            <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>
          
                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      value="${moment(this._dueDate).format(`DD MMMM`)}"
                  />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                      value="${moment(this._dueDate).format(`LT`)}"
                    />
                  </label>
                </fieldset>
          
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>
          
                <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                  <div class="card__repeat-days-inner">
                   ${Object.keys(this._repeatingDays).map((key) =>`<input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-${key}-3"
                      name="repeat"
                      value="${key}"
                      ${this._repeatingDays[key] && `checked`}
                    />
                    <label class="card__repeat-day" for="repeat-${key}-3">${key}</label>`).join(``)}
                   </div>
                </fieldset>
              </div>
              
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${(Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="${tag}"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #${tag}
                    </button>
                    <button type="button" class="card__hashtag-delete">
                    delete
                    </button>
                  </span>`)).join(``)}
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
              <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="${this._picture ? this._picture : `img/add-photo.svg`}"
                  alt="task picture"
                  class="card__img"
                />
              </label>
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">${this._renderColorItems()}</div>
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
  }

  addEventListeners() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSaveButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(this.element.querySelector(`.card__date`), {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });

      flatpickr(this.element.querySelector(`.card__time`), {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }
  }

  removeEventListeners() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSaveButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
  }
}

export default EditTask;
