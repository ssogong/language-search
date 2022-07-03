import * as api from './api.js'

let resultArr = [];
let inputStr = '';

window.onload = () => {
  // set initial focus
  const searchInput = document.querySelector('.SearchInput__input');
  searchInput.focus();
  const tmpInputLen = searchInput.value.length;
  searchInput.setSelectionRange(tmpInputLen, tmpInputLen);
}

// input box change input event
const searchInput = document.querySelector('.SearchInput__input');
searchInput.addEventListener('input', async event => {
  inputStr = event.target.value;
  resultArr = await api.getResult(inputStr);
  updateResult();
});

const updateResult = () => {
  const suggentionDiv = document.querySelector('.Suggestion');
  // result is empty
  if (resultArr.length === 0)
    suggentionDiv.style.display = 'none';
  else
    suggentionDiv.style.display = 'block';
  suggentionDiv.textContent = '';
  const ul = document.createElement('ul');
  const regex = new RegExp(`(${inputStr})`, 'gi');
  resultArr.forEach(re => {
    re = re.replace(regex,
      '<span class="Suggestion__item--matched">$1</span>');
    const li = document.createElement('li');
    li.innerHTML = re;
    ul.appendChild(li);
  });
  suggentionDiv.appendChild(ul);
}