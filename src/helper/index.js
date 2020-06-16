import Cookies from 'js-cookie';
import faker from 'faker';
import socketClient from 'socket.io-client';

export const CookieBuilder = { // TODO: don't like the name
  setUserName: (value) => {
    Cookies.set('userName', value);
  },
  setFakeUserName: () => {
    const name = faker.name.findName();
    Cookies.set('userName', name);
  },
  getUserName: () => Cookies.get('userName'),
};

export const openSocket = () => socketClient(process.env.PORT);
