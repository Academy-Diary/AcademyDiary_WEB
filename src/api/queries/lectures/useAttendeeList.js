import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';

export const useAttendeeList = (lectureId) =>
  useQuery({
    queryKey: [QUERY_KEY.ATTENDEELIST(lectureId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.ATTENDEELIST(lectureId));
      //   console.log(response);
      return response.data.data;
    },
  });
