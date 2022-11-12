const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  allUsers,
  userById,
  add,
  update,
  remove,
};

function allUsers() {
  return db("users");
}

function userById(id) {
  return db("users").where({ id }).first();
}

function add(user) {
  return db("users")
    .insert(user)
    .then((ids) => {
      return userById(ids);
    });
}

function update(id, changes) {
  return db("users").where("id", Number(id)).update(changes);
}

function remove(id) {
  return db("users").where("id", Number(id)).del();
}
