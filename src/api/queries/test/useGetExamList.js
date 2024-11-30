import { useQuery } from '@tanstack/react-query';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useGetExamList = (lectureId) =>
  useQuery({
    queryKey: [QUERY_KEY.GETEXAMLIST(lectureId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.GETEXAMLIST(lectureId));
      return response.data.data;
    },
    refetchOnMount: true,
  });

export const useQuizList = (lectureId, categoryId) =>
  useQuery({
    queryKey: [QUERY_KEY.GETQUIZLIST(lectureId, categoryId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.GETQUIZLIST(lectureId, categoryId));
      return response.data.data;
    },
  });
