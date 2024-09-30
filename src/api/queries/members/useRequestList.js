import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useRequestList = (role, academyId) =>
  useQuery({
    queryKey: [QUERY_KEY.REQUESTLIST, role],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.REQUESTLIST, { params: { role, academyId } });
      //   console.log(response);
      if (response.status === 200) return response.data.data;
      return [];
    },
  });
