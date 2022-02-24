exports.up = function(knex) {
    return knex.schema.createTable('cats', tbl => {
        tbl.increments();
        tbl.string('name', 20).unique().notNullable();
        tbl.string('pelt', 20).notNullable();
        tbl.string('temperment', 20).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cats');
};