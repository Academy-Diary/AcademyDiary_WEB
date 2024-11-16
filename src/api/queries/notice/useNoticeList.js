import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useNoticeList = (lectureId, page, pageSize) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTICELIST(lectureId, page, pageSize)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.NOTICE_LIST(lectureId, page, pageSize));

      return response.data.data;
    },
  });
