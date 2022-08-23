function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    typeof salaries[key] === "number" && !isNaN(salaries[key]) && salaries[key] !== Infinity && salaries[key] !== -Infinity
      ? sum = sum + salaries[key]
      : sum;
  }
  return sum;
}
