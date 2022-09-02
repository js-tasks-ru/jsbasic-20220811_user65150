function getMinMax(str) {
  let numbers = str
    .split(' ')
    .map(number => +number)
    .filter(number => !Number.isNaN(number));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  }
}
