import { useMutation } from '@tanstack/react-query';
// import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';
import { setSession } from '../../api_utils';
import { PATH } from '../../../route/path';
import { useUserAuthStore } from '../../../store';

export const useLogin = (options) => {
  const navigate = useNavigate();
  const { login } = useUserAuthStore();

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_IN],
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(PATH_API.SIGN_IN, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data.accessToken);
      login({ ...data.user, userStatus: data.userStatus });

      if (data.user.role === 'CHIEF') navigate(PATH.DIRECTOR.ROOT);
      else if (data.user.role === 'TEACHER') navigate(PATH.TEACHER.ROOT);
    },
    onError: (error) => {
      console.log('error occurred at useLogin:', error);
    },
    ...options,
  });
};

export default useLogin;
