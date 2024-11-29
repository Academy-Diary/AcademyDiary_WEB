import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';

export const useQuizCreate = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.CREATEQUIZ, payload);
      return response.data.data;
    },
  });

export const useQuizProblem = (examId, quizNum) =>
  useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.QUIZDETAIL(examId, quizNum));
      return response.data;
    },
  });

export const useQuizInfo = (examId) =>
    useQuery({
        queryKey: [QUERY_KEY.QUIZINFO(examId)],
        queryFn: async () => {
            const response = await axiosInstance.get(PATH_API.QUIZINFO(examId));
            return response.data.data;
        }
    })