import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteTeacher = () =>
  useMutation({
    mutationFn: async (teachers) => {
      const response = await axiosInstance.delete(PATH_API.DELETE_TEACHER, { data: { user_id: teachers } });
      // console.log(response);
      return response.data;
    },
    onSuccess: () => {
      alert('강사 삭제 성공!');
    },
    onError: (error) => {
      console.log('Error occurred at useDeleteTeacher:', error);
    },
  });
