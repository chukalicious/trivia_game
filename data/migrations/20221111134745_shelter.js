exports.up = function (knex) {
  return knex.schema
    .createTable("adopters", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("email").unique().notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username").notNullable();
      tbl.string("character");
      tbl.string("avatar");
    })
    .createTable("dogs", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.float("weight").notNullable();
      tbl
        .integer("adopter_id")
        .unsigned()
        .references("id")
        .inTable("adopters")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("dogs")
    .dropTableIfExists("users")
    .dropTableIfExists("adopters");
};
