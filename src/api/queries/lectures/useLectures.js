import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';
import { useUserAuthStore } from '../../../store';

export const useLectures = () => {
  const { user, lecture } = useUserAuthStore();
  return useQuery({
    queryKey: [QUERY_KEY.GET_LECTURES],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.GET_LECTURES(user.user_id));
      const lectures = response.data.data;
      lecture(lectures);

      return lectures;
    },
    enabled: false,
  });
};
