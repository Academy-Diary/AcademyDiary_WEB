import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useUpdateClass = (academyId, classId) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(PATH_API.UPDATE_CLASS(academyId, classId), data);
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useUpdateClass:', error);
    },
  });
