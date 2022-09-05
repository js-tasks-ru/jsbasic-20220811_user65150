function hideSelf() {
  let button = document.querySelector('button');
  addEventListener('click', addHidden);

  function addHidden() {
    button.hidden = true;
  }
}
