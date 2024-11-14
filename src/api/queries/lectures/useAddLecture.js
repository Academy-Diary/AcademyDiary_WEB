import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useAddLecture = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(PATH_API.ADD_LECTURE, data);
      //   console.log(response);
      return response;
    },
    onSuccess: () => {
      console.log('강의 생성 성공!');
    },
    onError: (error) => {
      console.log('Error occurred at useAddLecture:', error);
    },
  });
