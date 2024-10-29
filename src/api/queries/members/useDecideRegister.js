import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

// 원장이 사용자(강사/학생)의 등록 요청을 승인 또는 거절하는 useMutation
export const useDecideRegister = (academyId, agreed) =>
  useMutation({
    mutationFn: async (userId) => {
      const response = await axiosInstance.post(PATH_API.DECIDE_REGISTER, {
        academy_id: academyId,
        user_id: userId,
        agreed,
      });
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useDecideRegister:', error);
    },
  });
