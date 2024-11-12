import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// const example_user = {
//   user_id: 'test_seonu',
//   academy_id: 'test_academy2',
//   email: 'seonu2001@naver.com',
//   birth_date: '2001-11-10T00:00:00.000Z',
//   user_name: 'test_seonu',
//   phone_number: '010-9999-9999',
//   role: 'TEACHER',
//   image: 'test_seonu.jpg',
//   userStatus: null
// };

const UserAuthStore = (set) => ({
  // State
  isLoggedIn: false,
  user: null,
  lectures: [],

  // Actions
  login: (userData) => set({ isLoggedIn: true, user: userData }),
  logout: () => set({ isLoggedIn: false, user: null, lectures: [] }),
  updateUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
  lecture: (lecture) => set({ lectures: lecture }),
});

const useUserAuthStore = create(
  persist(devtools(UserAuthStore, 'UserAuthStore'), {
    name: 'UserAuthStore', // Storage 이름 지정 (default: localStorage)
  })
);

export default useUserAuthStore;
