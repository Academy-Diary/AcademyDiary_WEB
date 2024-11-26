import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useCheckPassword = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.CHECK_PW, payload);
      return response.data;
    },
  });
