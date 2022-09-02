function camelize(str) {
  let arr = str.split([]);
  let changedArr = arr.filter((item) => {
    if(item === '-') {
      arr[arr.indexOf(item) + 1] = arr[arr.indexOf(item) + 1].toUpperCase();
      delete arr[arr.indexOf(item)];
    }else{
      return item;
    }
  })
  return changedArr.join('');
}

camelize('background-color-true');
