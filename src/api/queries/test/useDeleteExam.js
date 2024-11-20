import { useMutation } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';

export const useDeleteExam = (lectureId, examId) =>
  useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(PATH_API.DELETEEXAM(lectureId, examId));
      return response.data.data;
    },
  });
