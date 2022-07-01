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
  if (inputStr.length === 0)
    return;
  resultArr = await api.getResult(inputStr);
  //console.log(resultArr)
  updateResult();
});

const updateResult = () => {
  const suggentionDiv = document.querySelector('.Suggestion');
  suggentionDiv.textContent = '';
  let ul = document.createElement('ul');
  resultArr.forEach(re => {
    const regex = new RegExp(`(${inputStr})`, 'gi');
    console.log(regex.exec(re))
    re = re.replace(regex,
      '<span class="Suggestion__item--matched">$1</span>');
    let li = document.createElement('li');
    li.innerHTML = re;
    //li.appendChild(document.createTextNode(re));
    ul.appendChild(li);
  });
  suggentionDiv.appendChild(ul);
}