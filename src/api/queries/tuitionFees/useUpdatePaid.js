import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

// 미납 목록을 납부 완료 처리하는 useMutation
export const useUpdatePaid = (academyId) =>
  useMutation({
    mutationFn: async (billList) => {
      const response = await axiosInstance.patch(PATH_API.UPDATE_PAID(academyId), {
        targetBillList: billList,
        paid: true,
      });
      //   console.log(response);
      return response.data;
    },
    onError: (error) => {
      console.log('Error occurred at useUpdatePaid:', error);
    },
  });
