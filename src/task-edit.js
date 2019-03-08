import {createElement} from './utils/create-element';
import {COLORS} from './constants';

class EditTask {
  constructor(task) {
    this._title = task.title;
    this._dueDate = task.dueDate;
    this._picture = task.picture;
    this._tags = task.tags;
    this._repeatingDays = task.repeatingDays;
    this._color = task.color;
    this._element = null;
    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).filter((value) => value === true);
  }

  _onSubmitButtonClick(event) {
    event.preventDefault();

    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  _renderColorItems() {
    return (
      COLORS.map((color) => `<input 
        type="radio" id="color-${color}-5"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${this._color === color ? `checked` : ``}
      />
      <label for="color-${color}-5" class="card__color card__color--${color}">${color}</label >`).join(``)
    );
  }

  get template() {
    const deadlineDate = new Date(this._dueDate);

    return (`<article class="card card--${this._color} card--edit ${this._dueDate < Date.now() ? `card--deadline` : ``} 
      ${this._isRepeated().length > 0 ? `card--repeat` : ``}">
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
                  date: <span class="card__date-status">${this._dueDate ? deadlineDate.toLocaleDateString() : `no`}</span>
                </button>
          
                <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${deadlineDate.toLocaleDateString()}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                      value="${deadlineDate.toLocaleTimeString()}"
                    />
                  </label>
                </fieldset>
          
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._isRepeated().length > 0 ? `yes` : `no`}</span>
                </button>
          
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                   ${Object.keys(this._repeatingDays).map((key) =>`<input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-${key}-3"
                    name="repeat"
                    value="${key}"
                    ${this._repeatingDays[key] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-${key}-3">${key}</label>`).join(``)}
                </fieldset>
              </div>
              
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._tags.map((value) => `<span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #${value}
                    </button>
                    <button type="button" class="card__hashtag-delete">
                    delete
                    </button>
                  </span>`).join(``)}
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

  render() {
    this._element = createElement(this.template);
    this.addEventListeners();
    return this._element;
  }

  addEventListeners() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
  }

  destroy() {
    this.removeEventListeners();
    this._element.remove();
    this._element = null;
  }

  removeEventListeners() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}

export default EditTask;
