export const PATH = {
  root: '/',
  SIGNUP: 'signup',
  LOGIN: 'login',
  TEACHER: {
    ROOT: '/teacher',
    CLASS: 'class', // 강의목록
    COUNSELING: 'counseling', // 학생상담
    NOTICE: 'notice', // 전체공지
  },
  DIRECTOR: {
    ROOT: '/director',
    MANAGE_MEMBERS: {
      ROOT: 'manage-members',
      REQUESTLIST: 'request-list',
      TEACHERS: 'teachers',
      STUDENTS: 'students',
    },
    TUITION_FEES: {
      ROOT: 'tuition-fees',
      PAYMENTLIST: 'payment-list',
      CLAIM: 'claim',
      MAKE_CLASS: 'make-class',
    },
  },
};

export default PATH;
