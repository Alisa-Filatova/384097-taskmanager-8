import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._id = data.id;
    this._count = data.count;
    this._checked = data.checked;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick(event) {
    event.preventDefault();

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  get template() {
    return `<label for="${this._id}" class="filter__label">
      <input
        type="radio"
        id="${this._id}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._checked ? `checked` : ``}
				/>
					<span class="filter__label--name">${this._name}
        <span class="filter__${this._id}-count">${this._count}</span>
      </span>
     </label>`;
  }

  addEventListeners() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  removeEventListeners() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}

export default Filter;
