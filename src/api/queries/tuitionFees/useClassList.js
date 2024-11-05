import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';

export const useClassList = (academyId) =>
  useQuery({
    queryKey: [QUERY_KEY.CLASSLIST(academyId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.CLASSLIST(academyId));
      //   console.log(response);
      return response.data.data;
    },
  });
