import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useMakeClass = (academyId) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(PATH_API.MAKE_CLASS(academyId), data);
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useMakeClass:', error);
    },
  });
