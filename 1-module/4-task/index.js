function checkSpam(str) {
  const changedStr = str.toLowerCase();

  return changedStr.indexOf('xxx') !== -1 || changedStr.indexOf('1xbet') !== -1;
}
