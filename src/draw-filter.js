export default (label, count, isChecked = false) => (
  `<input
    type="radio"
    id="filter__${label}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${count === 0 ? `disabled` : ``}
   />
   <label 
    for="filter__${label}" 
    class="filter__label"
   >${label} <span class="filter__${label}-count">${count}</span>
   </label>`
);
