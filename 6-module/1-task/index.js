/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  render() {
    this.table = document.createElement('TABLE');

    this.table.innerHTML = this.rows.map(item => `
        <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.salary}</td>
        <td>${item.city}</td>
        <td><button>X</button></td>
      </tr>`)
      .join('');

    this.table.insertAdjacentHTML('afterBegin', `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`);

    this.table.addEventListener('click', this.onClick);

    return this.table;
  }

  onClick(event) {
    if (event.target.closest('button')) {
      event.target.closest('tr').remove();
    }
  }

}


