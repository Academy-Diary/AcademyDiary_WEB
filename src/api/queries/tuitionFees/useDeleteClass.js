import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteClass = (academyId, classId) =>
  useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(PATH_API.DELETE_CLASS(academyId, classId));
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useDeleteClass:', error);
    },
  });
