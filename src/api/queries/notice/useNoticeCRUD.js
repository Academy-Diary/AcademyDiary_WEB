import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useNoticeDetil = (noticeId) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTICECRUD(noticeId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.NOTICE_CRUD(noticeId));
      return response.data.data;
    },
  });
