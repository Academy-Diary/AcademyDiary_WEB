import { useMutation, useQuery } from '@tanstack/react-query';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';

export const useAcademyInfo = () =>
  useQuery({
    queryKey: [QUERY_KEY.ACADEMY_INFO],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.ACADEMY_INFO);
      // console.log(response);
      return response.data.data;
    },
  });

export const useUpdateAcademyInfo = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(PATH_API.ACADEMY_INFO, data);
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useUpdateAcademyInfo:', error);
    },
  });
