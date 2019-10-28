import knex from 'knex';

import { UserDTO } from '../models';
import { knexConfig } from './config';
const db = knex<UserDTO, UserDTO[]>(knexConfig);

const find = async () => {
  return await db('users');
};

const findByID = async (id: string | number) => {
  return await db('users')
    .where({ id: Number(id) })
    .first();
};

const insert = async (user: UserDTO) => {
  const ids = await db('users').insert(user);
  return ids[0];
};

const update = async (id: string | number, user: UserDTO) => {
  return (
    (await db('users')
      .where('id', Number(id))
      .update(user)) === 1
  );
};

const remove = async (id: string | number) => {
  return (
    (await db('users')
      .where('id', Number(id))
      .del()) === 1
  );
};

export { find, findByID, insert, update, remove };
