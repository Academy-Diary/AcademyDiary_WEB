import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useUpdateLecture = (lectureId) =>
  useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(PATH_API.UPDATE_LECTURE(lectureId));
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occured at useUpdateLecture', error);
    },
  });
