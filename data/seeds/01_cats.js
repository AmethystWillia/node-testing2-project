exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cats').del()
    .then(function () {
      // Inserts seed entries
      return knex('cats').insert([
        { name: 'Jinx', pelt: 'Black', temperment: 'Bitch <3' },
      ]);
    });
};
