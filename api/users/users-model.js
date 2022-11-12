const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  allUsers,
  userById,
  add,
  remove,
};

function allUsers() {
  return db("users");
}

function userById(id) {
  const numberId = Number(id);
  return db("users").where({ id }).first();
}

function add(user) {
  return db("users")
    .insert(user)
    .then((ids) => {
      return userById(ids);
    });
}

function remove(id) {
  return db("users").where("id", Number(id)).del();
}
