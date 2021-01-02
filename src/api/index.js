const faker = require("faker");

module.exports = () => {
  const db = { todos: [] };
  const size = 5;

  for (let index = 1; index <= size; index++) {
    const item = {
      id: index,
      text: faker.random.words(),
      completed: faker.random.boolean(),
    };

    db.todos.push(item);
  }

  return db;
};
