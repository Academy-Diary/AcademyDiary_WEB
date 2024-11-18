import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useUpdateAttendees = (lectureId) =>
  useMutation({
    mutationFn: async (userIds) => {
      const response = await axiosInstance.put(PATH_API.UPDATE_ATTENDEES(lectureId), { studentList: userIds });
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useUpdateAttendees:', error);
    },
  });
