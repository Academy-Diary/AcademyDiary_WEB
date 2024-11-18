import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useCategory = (academyId) =>
  useQuery({
    queryKey: [QUERY_KEY.EXAM_CATEGORY(academyId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.EXAM_CATEGORY(academyId));
      const categories = response.data.data.exam_types;

      return categories;
    },
  });
