import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

const useRequestList = (role, academyId) =>
  useQuery({
    queryKey: [QUERY_KEY.REQUESTLIST, role],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.REQUESTLIST, { params: { role, academy_id: academyId } });
      // console.log(response.data.data.formattedResult);
      return response.data.data.formattedResult;
    },
  });

export default useRequestList;
