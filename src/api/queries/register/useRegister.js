import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useRegisterTeacher = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(PATH_API.REGISTER_TEACHER, data);
      return response.data;
    },
  });
