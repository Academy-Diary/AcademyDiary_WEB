import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { PATH_API } from '../../path';

/**
 * 학원 아이디를 받아 학원의 전체 강사를 조회하는 useQuery
 * @param {String} academyId 학원 아이디
 *
 */
const useTeacherList = (academyId) =>
  useQuery({
    queryKey: [QUERY_KEY.TEACHER],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.TEACHERLIST(academyId));
      // console.log(response);
      if (response.state === 200) return response.data.data;
      return [];
    },
  });

export default useTeacherList;
