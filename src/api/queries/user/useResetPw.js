import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

const useResetPw = () =>
  useMutation({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.RESET_PW, payload);
      return response.data;
    },
  });

export default useResetPw;
