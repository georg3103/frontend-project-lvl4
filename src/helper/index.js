import Cookies from 'js-cookie';
import faker from 'faker';
import socketClient from 'socket.io-client';

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

export const generateUser = () => {
  const name = getUser();

  if (name) return name;

  const newName = setUser();

  return newName;
};

export const openSocket = () => socketClient(process.env.PORT);
