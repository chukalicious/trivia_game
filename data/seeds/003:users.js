exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "Kat",
      character: "Elizabeth Bennet",
      avatar: "",
    },
    {
      username: "Al",
      character: "Mr. Bingley",
      avatar: "",
    },
  ]);
};
