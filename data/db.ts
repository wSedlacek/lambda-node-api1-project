import knex from 'knex';

import { User } from '../models/User';
import { knexConfig } from '../knexfile.js';
const db = knex(knexConfig);

const find = () => {
  return db('users');
};

const findById = (id: number) => {
  return db('users')
    .where({ id: Number(id) })
    .first();
};

const insert = async (user: User) => {
  const ids = await db('users').insert(user);
  return { id: ids[0] };
};

const update = (id: number, user: User) => {
  return db('users')
    .where('id', Number(id))
    .update(user);
};

const remove = (id: number) => {
  return db('users')
    .where('id', Number(id))
    .del();
};

export { find, findById, insert, update, remove };
