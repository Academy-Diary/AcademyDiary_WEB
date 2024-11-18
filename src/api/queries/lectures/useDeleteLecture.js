import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteLecture = () =>
  useMutation({
    mutationFn: async (lectureId) => {
      const response = await axiosInstance.delete(PATH_API.DELETE_LECTURE(lectureId));
      //   console.log(response);
      return response.data;
    },
    onSuccess: () => {
      console.log('강의 삭제 성공!');
    },
    onError: (error) => {
      console.log('Error occurred at useDeleteLecture:', error);
    },
  });
