import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useQuizCreate = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.CREATEQUIZ, payload);
      return response.data.data;
    },
  });
