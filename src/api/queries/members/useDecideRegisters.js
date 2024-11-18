import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

// 원장이 사용자(강사/학생)의 등록 요청을 승인 또는 거절하는 useMutation
export const useDecideRegisters = (agreed) =>
  useMutation({
    mutationFn: async (userIds) => {
      const response = await axiosInstance.post(PATH_API.DECIDE_REGISTER, {
        user_id: userIds,
        agreed,
      });
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useDecideRegister:', error);
    },
  });
