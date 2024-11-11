import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';

export const useLectureList = () =>
  useQuery({
    queryKey: [QUERY_KEY.LECTURELIST],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.LECTURELIST);
      //   console.log(response);
      return response.data.data;
    },
  });
