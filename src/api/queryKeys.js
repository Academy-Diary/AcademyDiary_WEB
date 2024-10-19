import { PATH_API } from './path';

export const QUERY_KEY = {
  // auth
  SIGN_IN: PATH_API.SIGN_IN,
  SIGN_UP: PATH_API.SIGN_UP,
  SIGN_OUT: PATH_API.SIGN_OUT,
  PROFILE_BASIC: (userId) => PATH_API.PROFILE_BASIC(userId),
};
export default QUERY_KEY;
