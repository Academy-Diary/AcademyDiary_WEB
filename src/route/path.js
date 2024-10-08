export const PATH = {
  root: '/',
  SIGNUP: 'signup',
  LOGIN: 'login',
  TEACHER: {
    ROOT: '/teacher',
    CLASS: {
      ROOT: 'class', // 강의목록
      DETAIL: {
        ROOT: ':courseid', // 각 강의 페이지
        LECTURENOTICE: {
          ROOT: 'notice', // 각 강의별 공지사항
          ADD: 'add',
          UPDATE: 'update',
          DETAIL: ':id',
        },
      },
    },
    COUNSELING: 'counseling', // 학생상담
    NOTICE: {
      ROOT: 'notice',
      DETAILS: ':id',
    }, // 전체공지
  },
  DIRECTOR: {
    ROOT: '/director',
    PROFILE: {
      ROOT: 'profile',
      UPDATE: 'update',
    },
    MANAGE_MEMBERS: {
      ROOT: 'manage-members',
      REQUESTLIST: 'request-list',
      TEACHERS: 'teachers',
      STUDENTS: 'students',
    },
    MANAGE_COURSES: {
      ROOT: 'manage-courses',
      ADDCOURSE: 'add-course',
      COURSEDETAILS: 'course-details',
      UPDATE: 'update',
    },
    TUITION_FEES: {
      ROOT: 'tuition-fees',
      PAYMENTLIST: 'payment-list',
      CLAIM: 'claim',
      MAKE_CLASS: 'make-class',
    },
    NOTICE: {
      ROOT: 'notice',
      ADD: 'add',
      UPDATE: 'update',
      DETAILS: ':id',
    },
  },
};

export default PATH;
