import * as api from './api.js'

const searchInput = document.querySelector('.SearchInput__input');
let resultArr = [];
let inputStr = '';
let nowSelectedIdx = 0;

window.onload = () => {
  // set initial focus
  searchInput.focus();
  const tmpInputLen = searchInput.value.length;
  searchInput.setSelectionRange(tmpInputLen, tmpInputLen);
  // call search request
  searchInput.addEventListener('input', async event => {
    inputStr = event.target.value;
    resultArr = await api.getResult(inputStr);
    updateResult();
  });
}

window.onkeydown = (e) => {
  if (resultArr.length === 0)
    return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    searchInput.blur();

    if (e.key === 'ArrowDown') {
      nowSelectedIdx++;
      if (nowSelectedIdx === resultArr.length)
        nowSelectedIdx = 0;
    }
    else if (e.key === 'ArrowUp') {
      nowSelectedIdx--;
      if (nowSelectedIdx < 0)
        nowSelectedIdx = resultArr.length - 1;
    }
    updateSelected();
  }
  if (e.key === 'Enter') {
    const suggestionList = document.querySelector('#SuggestionList');
    if (suggestionList.children.length === 0)
      return;
    [...suggestionList.children].forEach((li, idx) => {
      if (idx === nowSelectedIdx) {
        alert(li.innerText);
        return;
      }
    });
  }
};

// input box change input event
const updateResult = () => {
  const suggentionDiv = document.querySelector('.Suggestion');
  // result is empty
  if (resultArr.length === 0)
    suggentionDiv.style.display = 'none';
  else
    suggentionDiv.style.display = 'block';
  suggentionDiv.textContent = '';
  const ul = document.createElement('ul');
  ul.id = 'SuggestionList';
  const regex = new RegExp(`(${inputStr})`, 'gi');
  resultArr.forEach(re => {
    re = re.replace(regex,
      '<span class="Suggestion__item--matched">$1</span>');
    const li = document.createElement('li');
    li.innerHTML = re;
    li.addEventListener('click', (e => {
      alert(e.target.innerText);
    }));
    ul.appendChild(li);
  });
  suggentionDiv.appendChild(ul);
  nowSelectedIdx = 0;
  updateSelected();
}

const updateSelected = () => {
  const ul = document.querySelector('#SuggestionList');
  [...ul.children].forEach((li, idx) => {
    if (idx === nowSelectedIdx) {
      li.classList.add('Suggestion__item--selected');
    } else
      li.classList.remove('Suggestion__item--selected');
  });
}