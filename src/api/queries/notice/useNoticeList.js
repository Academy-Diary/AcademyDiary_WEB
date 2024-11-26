import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

/**
 * 학원 전체 또는 강의별 공지사항 목록 가져오는 useQuery
 * @param {String} lectureId 강의 ID, 0이면 학원 전체공지
 * @param {int} page
 * @param {int} pageSize
 *
 */
export const useNoticeList = (lectureId, page, pageSize) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTICELIST(lectureId, page, pageSize)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.NOTICE_LIST(lectureId, page, pageSize));
      // console.log(response.data)
      return response.data.data;
    },
    refetchOnMount: true,
  });
