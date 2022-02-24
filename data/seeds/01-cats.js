
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cats').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cats').insert([
        { name: 'Jinx', pelt: 'Sleek black', temperment: 'Bitch <3' },
        { name: 'Little Bit', pelt: 'Grey tabby', temperment: 'Blank' },
        { name: 'Venus', pelt: 'Calico', temperment: 'Timid' },
      ]);
    });
};
