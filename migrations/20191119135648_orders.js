
exports.up = function (knex) {
  return knex.schema.createTable('orders', table => {
    table.increments('id');
    table.string('order_id');
    table.string('order_created_date');
    table.string('order_exchanged_date');
    table.boolean('order_exchanged');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
