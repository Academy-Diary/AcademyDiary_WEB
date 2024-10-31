export const PATH = {
  root: '/',
  SIGNUP: '/signup',
  LOGIN: {
    ROOT: '/login',
    FIND_ID: 'find-id',
    RESET_PW: 'reset-pw',
  },
  REGISTER_ACADEMY: '/register-academy',
  REGISTER_TEACHER: '/register-teacher',
  TEACHER: {
    ROOT: '/teacher',
    COUNSELING: 'counseling', // 학생상담
    PROFILE: {
      ROOT: 'profile',
      UPDATE: 'update',
    },
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
        TEST: {
          ROOT: 'test', // 시험리스트
          DETAILS: {
            ROOT: ':testid', // 해당 시험에 대한 성적 리스트
            ADD: 'add-score', // 전체 성적 추가
          },
          ADD: 'add', // 시험 추가
        }, // 시험 관련
        QUIZ: {
          ROOT: 'quiz',
          DETAIL: ':quizid',
          NEW: 'new',
        },
        ALL: 'all', // 전체성적 그래프
      },
    },
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
      UPDATE_PW: 'update-password',
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
