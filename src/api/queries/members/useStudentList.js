import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { PATH_API } from '../../path';

/**
 * 학원 아이디를 받아 학원의 전체 학생을 조회하는 useQuery
 * @param {String} academyId 학원 아이디
 * @param {int}    page      페이지 넘버
 */

export const useStudentList = (academyId, page) =>
  useQuery({
    queryKey: [QUERY_KEY.STUDENTLIST(academyId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.STUDENTLIST(academyId), {
        params: {
          page,
          page_size: 10, // 한 페이지당 몇명 보여줄지
        },
      });
      // console.log(response);
      if (response.status === 200) return response.data.data;
      return [];
    },
  });
