import {
  HttpStatusCode as AxiosHttp,
} from 'axios';

const CsrfTokenError = 499;

const HttpStatusCode = {
  CsrfTokenError,
  ...AxiosHttp
};

export default HttpStatusCode;