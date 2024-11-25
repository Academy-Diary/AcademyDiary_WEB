import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useScoreList = (lectureId, examId) =>
  useQuery({
    queryKey: [QUERY_KEY.SCORELIST(lectureId, examId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.SCORES(lectureId, examId));
      return response.data.data;
    },
    refetchOnMount: true,
  });

export const useScoreEdit = (lectureId, examId) =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(PATH_API.SCORES(lectureId, examId), payload);
      return response.data.data;
    },
  });

export const useScoreAdd = (lectureId, examId) =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.SCORES(lectureId, examId), payload);
      return response.data.data;
    },
  });
