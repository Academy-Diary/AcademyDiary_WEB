import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteCategory = () =>
  useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
      console.log(PATH_API.DELETE_CATEGORY(payload[0]));
      const response = await axiosInstance.delete(PATH_API.DELETE_CATEGORY(payload[0]), { data: payload[1] });
      return response;
    },
    onError: (error) => {
      console.log('During Delete Error is Occured', error);
    },
  });
