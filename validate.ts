import { User } from './models/User';
import { findByID } from './data/db';

const validID = async (id: number | string) => {
  const user = await findByID(id);
  return !!user;
};

const validUser = (user: User) => {
  if (!user.name || !user.bio) return false;
  else return true;
};

export { validID, validUser };
