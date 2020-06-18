
import Cookies from 'js-cookie';
import faker from 'faker';
import socketClient from 'socket.io-client';

export const setUserName = (value) => {
  Cookies.set('userName', value, { expires: 365 });
};

export const getUserName = () => Cookies.get('userName');

export const getFakeName = () => faker.name.findName();

export const openSocket = () => socketClient(process.env.PORT);
