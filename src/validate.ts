import { UserDTO } from './models';
import { findByID } from './data/db';

const validID = async (id: number | string) => {
  const user = await findByID(id);
  return !!user;
};

const validUser = (user: UserDTO) => {
  return !!user.name && !!user.bio;
};

export { validID, validUser };
