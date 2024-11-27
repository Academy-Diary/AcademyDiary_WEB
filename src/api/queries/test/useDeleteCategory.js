import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteCategory = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.delete(PATH_API.DELETE_CATEGORY(payload.examTypeId), { data: { academy_id: payload.academyID } });
      return response;
    },
    onError: (error) => {
      console.log('During Delete Error is Occured', error);
    },
  });
