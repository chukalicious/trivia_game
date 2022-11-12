exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("table_name").insert([
        { id: 1, colName: "rowValue1" },
        { id: 2, colName: "rowValue2" },
        { id: 3, colName: "rowValue3" },
      ]);
    });
};
exports.seed = function (knex) {
  return knex("dogs").insert([
    {
      name: "Fido",
      weight: 25,
      adopter_id: 1,
    },
    {
      name: "Captain",
      weight: 15,
      adopter_id: 1,
    },
    {
      name: "Lucy",
      weight: 18,
      adopter_id: 2,
    },
    {
      name: "Aragorn",
      weight: 35,
      adopter_id: null,
    },
    {
      name: "Princess",
      weight: 25,
      adopter_id: null,
    },
  ]);
};
