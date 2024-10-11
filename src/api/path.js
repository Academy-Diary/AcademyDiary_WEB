import { SECRET } from '../config/secret';

export const PATH_API = {
  API_DOMAIN: SECRET.server_ip,
  // user
  SIGN_IN: '/user/login',
  FIND_ID: '/user/find-id',
  RESET_PW: '/user/reset-password',
  SIGN_UP: '/user/signup',
  CHECK_DUP: '/user/check-id',
  SIGN_OUT: '/user/logout',
  PROFILE_BASIC: (userId) => `/user/${userId}/basic-info`,
  // register
  REGISTER_ACADEMY: '/registeration/request/academy',
  REGISTER_TEACHER: '/registeration/request/user',
};

export default PATH_API;
