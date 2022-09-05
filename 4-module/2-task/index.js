function makeDiagonalRed(table) {
  let rows = table.rows;

  for (let row of rows) {
    let cells = row.cells;

    for (let cell of cells) {
      if (row.rowIndex === cell.cellIndex) {
        rows[row.rowIndex].cells[cell.cellIndex].style.backgroundColor = 'red';
      }
    }
  }
}
