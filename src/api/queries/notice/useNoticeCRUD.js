import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useNoticeDetail = (noticeId) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTICERUD(noticeId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.NOTICE_RUD(noticeId));
      return response.data.data;
    },
    refetchOnMount: true,
  });

export const useNoticeDelete = () =>
  useMutation({
    mutationFn: async (noticeId) => {
      const response = await axiosInstance.delete(PATH_API.NOTICE_RUD(noticeId));
      return response.data.data;
    },
    onError: (error) => console.log('Error occurred at useNoticeDelete:', error),
  });

export const useNoticeUpdate = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.putForm(PATH_API.NOTICE_RUD(payload.noticeId), payload.body, { headers: { 'Content-Type': 'multipart/form-data' } });
      return response.data.data;
    },
    onError: (error) => console.log('Error occurred at useNoticeUpdate:', error),
  });

export const useNoticeAdd = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.postForm(PATH_API.NOTICE_CREATE, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
      return response.data.data;
    },
    onError: (error) => console.log('Error occurred at useNoticeAdd:', error),
  });
