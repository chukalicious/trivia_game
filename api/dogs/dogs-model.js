const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  find,
  onlyDog,
  update,
};

function find() {
  return db("dogs as d")
    .leftJoin("adopters as a", "a.id", "d.adopter_id")
    .select("d.id", "d.name", "d.weight", "a.name as adopter_name");
}

function onlyDog() {
  return db("dogs").select("dogs.id", "dogs.name", "dogs.weight");
}

function update(id, changes) {
  return db("dogs").where({ id }).update(changes, "*");
}
