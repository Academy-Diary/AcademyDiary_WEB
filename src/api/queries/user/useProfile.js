import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PATH_API } from '../../path';
import { QUERY_KEY } from '../../queryKeys';
import { axiosInstance } from '../../axios';
import { useUserAuthStore } from '../../../store';

export const useProfileBasic = (userId) =>
  useQuery({
    queryKey: [QUERY_KEY.PROFILE_BASIC(userId)],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.PROFILE_BASIC(userId));
      const basicInfo = response.data.data;

      basicInfo.birth_date = basicInfo.birth_date.substr(0, 10);
      // console.log(basicInfo);
      return basicInfo;
    },
  });

export const useUpdateProfile = (userId) => {
  const navigate = useNavigate();
  const { updateUser } = useUserAuthStore();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(PATH_API.PROFILE_BASIC(userId), data);
      return response.data;
    },
    onSuccess: (data) => {
      updateUser(data);
      navigate('/director/profile');
    },
    onError: (error) => {
      console.log('Error occured at useProfileUpdate: ', error);
    },
  });
};

export const useUpdatePassword = (userId) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (password) => {
      const response = await axiosInstance.put(PATH_API.PROFILE_BASIC(userId), { password });
      return response.data;
    },
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다!');
      navigate('/director/profile');
    },
    onError: (error) => {
      console.log('Error occured at useUpdatePassword: ', error);
    },
  });
};
