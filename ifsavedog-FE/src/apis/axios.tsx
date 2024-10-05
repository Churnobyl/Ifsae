import { HTTP_STATUS } from '@/apis/ApiConstants';
import config from '@/constants/Environments';
import { useTokenStore } from '@/stores/auth/tokenStore';
import axios, { InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

/**
 * 일반 Axios 인스턴스
 */
export const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: config.axiosTimeout * 1000,
  headers: {
    'Access-Control-Allow-Origin': config.baseUrl,
    'Access-Control-Allow-Credentials': 'true',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'comma' });
  },
});

/**
 * Auth없는 기본 Axios 인스턴스
 */
export const baseInstance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': config.baseUrl,
    'Access-Control-Allow-Credentials': 'true',
  },
});

/***************** 인터셉터 *************************/

/**
 * Request에 토큰 정보 담기
 */
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useTokenStore.getState().accessToken;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

/**
 * Response HTTP STATUS가 UNAUTHORIZED일 경우 로그인 페이지로 리다이렉트
 */
instance.interceptors.response.use(
  (response) => {
    console.log(response);

    const authorization = response.headers.getAuthorization;

    if (authorization && typeof authorization === 'function') {
      const authValue = authorization()?.toString();
      useTokenStore.getState().setAccessToken(authValue);
    }

    return response;
  },
  async (err) => {
    if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
      location.href = '/login';
    }

    return Promise.reject(err);
  },
);
