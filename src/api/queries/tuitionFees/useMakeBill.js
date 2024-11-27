import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useMakeBill = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(PATH_API.MAKE_BILL, data);
      // console.log(response);
      return response.data;
    },
    onSuccess: () => {
      console.log('학원비 청구 성공!');
    },
    onError: (error) => {
      console.log('Error occurred at useMakeBill:', error);
    },
  });
