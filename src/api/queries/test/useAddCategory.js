import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useAddCategory = () =>
  useMutation({
    useMutation: [QUERY_KEY.addCategory],
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.ADD_CATEGORY, payload);
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log('error occured at addCategory: ', error);
    },
  });

export default useAddCategory;
