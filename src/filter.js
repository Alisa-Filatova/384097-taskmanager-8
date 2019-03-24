import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._id = data.id;
    this._count = data.count;
    this._checked = data.checked;

    this._onFilter = this._onFilter.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilter(event) {
    event.preventDefault();

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  get template() {
    return `
      <label for="filter__${this._id}" class="filter__label">
        <input
          type="radio"
          id="filter__${this._id}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._checked ? `checked` : ``}
        />
        <span class="filter__label--name">
          ${this._name}
          <span class="filter__${this._id}-count">${this._count}</span>
        </span>
      </label>
    `;
  }

  addEventListeners() {
    this._element.querySelector(`.filter__input`)
      .addEventListener(`change`, this._onFilter);
  }

  removeEventListeners() {
    this._element.querySelector(`.filter__input`)
      .removeEventListener(`change`, this._onFilter);
  }
}

export default Filter;
