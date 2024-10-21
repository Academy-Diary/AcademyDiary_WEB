import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { removeSession } from '../../api_utils';
import { PATH } from '../../../route/path';
import { useUserAuthStore } from '../../../store';

const useLogout = (options) => {
  const navigate = useNavigate();
  const { logout } = useUserAuthStore();

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_OUT],
    mutationFn: async () => {
      const response = await axiosInstance.post(PATH_API.SIGN_OUT);
      return response.data;
    },
    onSuccess: () => {
      removeSession();
      logout();
      navigate(PATH.root);
    },
    onError: (error) => {
      console.log('error occurred at useLogout:', error);
    },
    ...options,
  });
};

export default useLogout;
