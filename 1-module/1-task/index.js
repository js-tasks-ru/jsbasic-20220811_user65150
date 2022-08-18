function factorial(n) {
  let result = n;

  if (n === 1 || n === 0) {

    return 1;

  } else {

    for (let i = n; i > 1; i--) {
      result = result * (i - 1);
    }

    return result;
  }
}

