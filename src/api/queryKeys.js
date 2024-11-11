import { PATH_API } from './path';

export const QUERY_KEY = {
  // auth
  SIGN_IN: PATH_API.SIGN_IN,
  SIGN_UP: PATH_API.SIGN_UP,
  SIGN_OUT: PATH_API.SIGN_OUT,
  PROFILE_BASIC: (userId) => PATH_API.PROFILE_BASIC(userId),

  // manage members
  REQUESTLIST: PATH_API.REQUESTLIST,
  TEACHERLIST: (academyId) => PATH_API.TEACHERLIST(academyId),
  STUDENTLIST: (academyId) => PATH_API.STUDENTLIST(academyId),

  // manage lectures
  LECTURELIST: PATH_API.LECTURELIST,
  ATTENDEELIST: (lectureId) => PATH_API.ATTENDEELIST(lectureId),
};
export default QUERY_KEY;
