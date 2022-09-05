function makeFriendsList (friends) {
  let ul = document.createElement('UL');

  for (let i of friends) {
    ul.insertAdjacentHTML('beforeEnd', `<li>${i.firstName} ${i.lastName}</li>`);
  }

  return ul;
}
