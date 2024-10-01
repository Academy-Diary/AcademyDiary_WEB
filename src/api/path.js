import { SECRET } from '../config/secret';

export const PATH_API = {
  API_DOMAIN: SECRET.server_ip,
  // user
  SIGN_IN: '/user/login',
  SIGN_UP: '/user/signup',
  SIGN_OUT: '/user/logout',
};

export default PATH_API;
