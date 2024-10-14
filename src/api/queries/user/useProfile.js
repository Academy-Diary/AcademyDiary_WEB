import { useQuery } from '@tanstack/react-query';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';

export const useProfileBasic = (userId) =>
  useQuery({
    queryKey: [QUERY_KEY.PROFILE_BASIC(userId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.PROFILE_BASIC(userId));
      const basicInfo = response.data.data;

      basicInfo.birth_date = basicInfo.birth_date.substr(0, 10);
      // console.log(basicInfo);
      return basicInfo;
    },
  });
