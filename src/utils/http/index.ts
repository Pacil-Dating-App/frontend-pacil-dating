import Cookies from 'js-cookie';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import HttpStatusCode from './httpStatusCode';
import { LOGIN_URL, REGISTER_URL, CSRF_TOKEN_URL } from '../../constants/routes';

export const httpClient = axios.create({
  withCredentials: true,
  validateStatus: () => true, // any response statuses wont raise error
});

axios.defaults.validateStatus = function(status) {
  return true; // Always return true to accept any status code
};

export type AxiosGet = (
  url: string,
  config?: AxiosRequestConfig<any>
) => Promise<AxiosResponse<any>>;
export type AxiosPost = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) => Promise<AxiosResponse<any>>;
export type AxiosPut = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) => Promise<AxiosResponse<any>>;
export type AxiosDelete = (
  url: string,
  config?: AxiosRequestConfig<any>
) => Promise<AxiosResponse<any>>;
export type AxiosPatch = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) => Promise<AxiosResponse<any>>;

export const isStatus2xx = (response: AxiosResponse): boolean => {
  return response.status >= 200 && response.status <= 299;
};

const handleRefreshToken = async () => {
  // const response = await httpClient.post(REFRESH_TOKEN_API_PATH);
  // if (!isStatus2xx(response)) {
  //   Cookies.remove(JWT_ACCESS_TOKEN_COOKIES_KEY);
  //   Cookies.remove(JWT_REFRESH_TOKEN_COOKIES_KEY);
  //   window.location.replace('/');
  // }
  await httpClient.get(CSRF_TOKEN_URL, {withCredentials: true});
};

const get: AxiosGet = async (url, config) => {
  const response = await httpClient.get(url, config);
  if (response.status === HttpStatusCode.CsrfTokenError) {
    await handleRefreshToken();
    return httpClient.get(url, config);
  }
  return response;
};

const post: AxiosPost = async (url, data, config) => {
  await handleRefreshToken();
  const response = await httpClient.post(url, data, config);
  if (response.status === HttpStatusCode.CsrfTokenError) {
    await handleRefreshToken();
    return httpClient.post(url, data, config);
  }
  return response;
};

const put: AxiosPut = async (url, data, config) => {
  const response = await httpClient.put(url, data, config);
  if (response.status === HttpStatusCode.CsrfTokenError) {
    await handleRefreshToken();
    return httpClient.put(url, data, config);
  }
  return response;
};

const del: AxiosDelete = async (url, config) => {
  const response = await httpClient.delete(url, config);
  if (response.status === HttpStatusCode.CsrfTokenError) {
    await handleRefreshToken();
    return httpClient.delete(url, config);
  }
  return response;
};

const patch: AxiosPatch = async (url, data, config) => {
  const response = await httpClient.patch(url, data, config);
  if (response.status === HttpStatusCode.CsrfTokenError) {
    await handleRefreshToken();
    return httpClient.patch(url, data, config);
  }
  return response;
};

function login(email: string, password: string) {
  const config = {
    headers: {
      ...axios.defaults.headers.common,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
  }
  const params = new URLSearchParams()
  params.append('username', email)
  params.append('password', password)
  return http.post(LOGIN_URL, params, config)
}

function register(email: string, password: string, name: string) {
  const config = {
    headers: {
      ...axios.defaults.headers.common,
    },
  }
  return http.post(REGISTER_URL, {
    name: name,
    email: email,
    password: password,
  }, config)
}

function logout() {
  Cookies.remove('Authentication')
}


const http = {
  get,
  post,
  del,
  put,
  patch,
  login,
  register,
  logout,
};

export default http;
