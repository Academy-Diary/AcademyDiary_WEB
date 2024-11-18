import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// const example_lecture = {
//   academy_id: 'test_academy',
//   lecture_id: 1,
//   lecture_name: '한국사',
//   teacher_id: 'test_teacher',
//   teacher_name: '권해담',
//   days: ['TUESDAY', 'THURSDAY'],
//   headcount: 60,
//   start_time: '2024-10-16T04:30:00.000Z',
//   end_time: '2024-10-16T06:00:00.000Z',
// };

// 강의 상세 보기를 위한 전역 저장소
const LectureStore = (set) => ({
  // State
  lectureId: null,
  lecture: null,

  // Actions
  setLecture: (lectureData) => set({ lectureId: lectureData.lecture_id, lecture: lectureData }),
});

const useLectureStore = create(
  persist(devtools(LectureStore, 'LectureStore'), {
    name: 'LectureStore', // Storage 이름 지정 (default: localStorage)
  })
);

export default useLectureStore;
