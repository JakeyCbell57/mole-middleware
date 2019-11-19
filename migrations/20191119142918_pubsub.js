
exports.up = function(knex) {
  return knex.raw(`
    CREATE FUNCTION new_order_event() RETURNS TRIGGER AS $$
    DECLARE
    BEGIN
      PERFORM pg_notify('new-order-event', row_to_json(NEW)::text);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER new_order_trigger
    AFTER INSERT 
    ON orders
    FOR EACH ROW EXECUTE PROCEDURE new_order_event();
  `)
};

exports.down = function(knex) {
  return knex.raw(`
    DROP TRIGGER new_order_trigger ON orders;
    DROP FUNCTION new_order_event();
  `)
};
