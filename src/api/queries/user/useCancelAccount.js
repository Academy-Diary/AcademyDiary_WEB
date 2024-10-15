import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useCancelAccount = (userId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(PATH_API.CANCEL_ACCOUNT(userId));
      return response.data;
    },
    onSuccess: () => {
      console.log('회원 탈퇴 성공');
      navigate('/');
    },
    onError: (error) => {
      console.log('Error occurred at useCancelAccount:', error);
    },
  });
};
