import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteStudent = () =>
  useMutation({
    mutationFn: async (studentId) => {
      const response = await axiosInstance.delete(PATH_API.DELETE_STUDENT(studentId));
      //   console.log(response);
      return response.data;
    },
    onSuccess: () => {
      alert('학생 삭제 성공!');
    },
    onError: (error) => {
      console.log('Error occurred at useDeleteStudent:', error);
    },
  });
