window.onload = () => {
  // set initial focus
  const searchInput = document.querySelector('.SearchInput__input');
  searchInput.focus();
  const tmpInputLen = searchInput.value.length;
  searchInput.setSelectionRange(tmpInputLen, tmpInputLen);
}
