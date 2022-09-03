function highlight(table) {

  for (const row of table.rows) {
    let available = row.cells[3].dataset.available;
    let gender = row.cells[2].textContent;
    let age = row.cells[1].textContent;

    row.classList.add(available === 'true' ? 'available' : 'unavailable');
    row.hidden = available === undefined;
    row.classList.add(gender === 'm' ? 'male' : 'female');

    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
