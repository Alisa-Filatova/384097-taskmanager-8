import Component from './component';

class Task extends Component {
  constructor(task) {
    super();
    this._title = task.title;
    this._dueDate = task.dueDate;
    this._color = task.color;
    this._repeatingDays = task.repeatingDays;
    this._tags = task.tags;
    this._picture = task.picture;
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).filter((value) => value === true);
  }

  _onEditButtonClick(event) {
    event.preventDefault();

    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    const deadlineDate = new Date(this._dueDate);

    return (
      `<article class="card card--${this._color} ${this._dueDate < Date.now() ? `card--deadline` : ``} 
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
                  date: <span class="card__date-status">no</span>
                </button>
          
                <fieldset 
                  class="card__date-deadline" 
                  ${this._dueDate ? `` : `disabled`}
                >
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
                  repeat:<span class="card__repeat-status">no</span>
                </button>
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
            </div>
          </div>
        </form>
      </article>`
    );
  }

  addEventListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  removeEventListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }
}

export default Task;

