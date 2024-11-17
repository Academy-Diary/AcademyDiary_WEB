import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useNoticeDetail = (noticeId) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTICECRUD(noticeId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.NOTICE_CRUD(noticeId));
      return response.data.data;
    },
    refetchOnMount: true,
  });

export const useNoticeDelete = () =>
  useMutation({
    mutationFn: async (noticeId) => {
      const response = await axiosInstance.delete(PATH_API.NOTICE_CRUD(noticeId));
      return response.data.data;
    },
  });

export const useNoticeUpdate = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.putForm(PATH_API.NOTICE_CRUD(payload.noticeId), payload.body, { headers: { 'Content-Type': 'multipart/form-data' } });
      return response.data.data;
    },
    onError: (error) => console.log('updateError', error),
  });
