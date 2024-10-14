import { useQuery } from '@tanstack/react-query';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';

export const useProfileBasic = (userId) =>
  useQuery({
    queryKey: [QUERY_KEY.PROFILE_BASIC(userId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.PROFILE_BASIC(userId));
      return response.data.data;
    },
  });
