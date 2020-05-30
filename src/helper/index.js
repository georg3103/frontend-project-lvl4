import Cookies from 'js-cookie';
import faker from 'faker';

const cookieProp = 'user';

const setUser = () => {
  const name = faker.name.findName();

  Cookies.set(cookieProp, name);

  return name;
};

const getUser = () => {
  const name = Cookies.get(cookieProp);

  return name;
};

const genUser = () => {
  const name = getUser();

  if (name) return name;

  const newName = setUser();

  return newName;
};

export default genUser;
