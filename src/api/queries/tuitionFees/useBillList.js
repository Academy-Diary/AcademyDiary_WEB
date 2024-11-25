import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';

export const useBillList = (academyId, isPaid) =>
  useQuery({
    queryKey: [QUERY_KEY.BILLLIST(academyId), isPaid],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.BILLLIST(academyId), { params: { isPaid } });
      // console.log(response);
      return response.data.responseBillList;
    },
  });
