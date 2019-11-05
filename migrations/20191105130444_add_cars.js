
exports.up = function(knex) {
  return knex.schema.createTable("cars", function(table) {
    table.increments();

    table.string('VIN').notNullable().unique();
    table.string('make', 128).notNullable();
    table.string('model', 128).notNullable();
    table.integer('mileage').notNullable();
    table.string('transmission_type');
    table.integer('title_status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
