let users = [
  {name: 'Вася', age: 30},
  {name: 'Петя', age: 20},
  {name: 'Маша', age: 25},
]

function namify(users) {
  return users.map(item => item.name);
}

namify(users);
