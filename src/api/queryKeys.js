import { PATH_API } from './path';

export const QUERY_KEY = {
  // auth
  SIGN_IN: PATH_API.SIGN_IN,
  SIGN_UP: PATH_API.SIGN_UP,
  SIGN_OUT: PATH_API.SIGN_OUT,
  PROFILE_BASIC: (userId) => PATH_API.PROFILE_BASIC(userId),
  GET_LECTURES: PATH_API.GET_LECTURES,

  // manage members
  REQUESTLIST: PATH_API.REQUESTLIST,
  TEACHERLIST: (academyId) => PATH_API.TEACHERLIST(academyId),
  STUDENTLIST: (academyId) => PATH_API.STUDENTLIST(academyId),

  // examination (test)
  EXAM_CATEGORY: (academyId) => PATH_API.EXAM_CATEGORY(academyId),

  // manage lectures
  LECTURELIST: PATH_API.LECTURELIST,
  ATTENDEELIST: (lectureId) => PATH_API.ATTENDEELIST(lectureId),

  // notice
  NOTICELIST: (lectureId, page, pageSize) => PATH_API.NOTICE_LIST(lectureId, page, pageSize),
  NOTICERUD: (noticeId) => PATH_API.NOTICE_RUD(noticeId),
};
export default QUERY_KEY;
