import Knex from 'knex';

const up = (knex: Knex, _: Promise<any>) => {
  return knex.schema.createTable('users', function(users) {
    users.increments();
    users.string('name', 255).notNullable();
    users.text('bio');
    users.timestamps(true, true);
  });
};

const down = (knex: Knex, _: Promise<any>) => {
  return knex.schema.dropTableIfExists('users');
};

export { up, down };
