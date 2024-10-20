// import { handleAlert } from 'react-handle-alert';
import dayjs from 'dayjs';
import { axiosInstance } from './axios';
import { PATH_API } from './path';
import { useUserAuthStore } from '../store';

// utils

// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------
/**
 *
 * @param {string} accessToken
 * @returns {boolean} expiration
 */
export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  return dayjs().isBefore(dayjs(decoded.exp));
};

// ----------------------------------------------------------------------
/**
 * refreshToken으로 토큰 재발급
 */
const useTokenRefresh = async () => {
  const { logout } = useUserAuthStore();

  try {
    const response = await axiosInstance.post(PATH_API.REISSUE_TOKEN);

    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

    const { exp } = jwtDecode(newAccessToken);
    // eslint-disable-next-line no-use-before-define
    tokenExpired(exp);

    return newAccessToken;
  } catch {
    // handleAlert('로그인이 만료되었습니다.');
    alert('로그인이 만료되었습니다.');

    localStorage.removeItem('accessToken');
    logout();

    window.location.reload();
    return '';
  }
};

/**
 * 만료 되기 전에 토큰 갱신하도록 setTimeout
 */
export const tokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();

  // 만료 되기 5분 전에 토큰 갱신
  // Test token expires after 10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  // 1일보다 많이 남으면 실행하지 않음
  if (timeLeft >= 86400000) {
    return;
  }

  expiredTimer = setTimeout(() => {
    useTokenRefresh();
  }, timeLeft);
};

// ----------------------------------------------------------------------
/**
 * store accessToken to localStorage & axios header
 * @param {any} accessToken
 */
export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // refresh 도입
    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');

    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export const removeSession = () => {
  localStorage.removeItem('accessToken');

  delete axiosInstance.defaults.headers.common.Authorization;
};

// ----------------------------------------------------------------------

/**
 * @description user_id를 반환하는 함수
 *
 * @returns {string} "userId" | ""
 *
 * 빈 스트링이면 로그인 상태가 아님
 */
export const getUserId = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return '';
  }

  if (!isValidToken(accessToken)) {
    return '';
  }

  const { user_id: userId } = jwtDecode(accessToken);

  return userId;
};
