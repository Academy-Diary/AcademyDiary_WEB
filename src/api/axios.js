import axios from 'axios';

import { PATH_API } from './path';
import { PATH } from '../route/path';

const TIMEOUT_TIME = 10_000;

export const axiosInstance = axios.create({
  baseURL: PATH_API.API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 cors 통신 설정
});

// 취소 토큰을 생성하는 함수
const cancelTokenSource = () => {
  const cancelToken = axios.CancelToken.source();
  return {
    token: cancelToken.token,
    cancel: cancelToken.cancel,
  };
};

let firstRequestCancelToken = null;
// Request interceptor for API calls

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    /* eslint-disable no-param-reassign */
    config.headers.Authorization = `Bearer ${token}`;

    firstRequestCancelToken = cancelTokenSource();
    config.cancelToken = firstRequestCancelToken.token;
    config.timeout = TIMEOUT_TIME;
    return config;
    /* eslint-enable no-param-reassign */
  },
  (error) =>
    // 요청 전 에러 처리
    // add error handling before sending the request
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 액세스 토큰이 만료된 경우
    const originalRequest = error.config;

    if (error.response.status === 403) {
      // originalRequest._retry = true; // 무한 재요청 방지

      try {
        const res = await axiosInstance.post(PATH_API.REISSUE_TOKEN);
        const newAccessToken = res.data.accessToken;
        // console.log(newAccessToken);
        // console.log(isValidToken(newAccessToken));

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // api 재요청
        return axios(originalRequest);
      } catch {
        // TODO: 잘 되는지 확인 필요
        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        localStorage.removeItem('accessToken');
        delete originalRequest.headers.Authorization;

        // window.location.reload();
        window.location.href = PATH.root;
        // Promise.resolve('Error! failed token refresh');
        // }
        // }
      }
    }

    // timeout
    if (axios.isCancel(error)) {
      // 취소된 요청은 에러로 처리하지 않음
      await Promise.resolve();
    }

    // 그 외의 에러는 그대로 반환
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;
