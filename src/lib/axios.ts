// import { LoginResponse } from "../features/auth/types";
import { AuthStorage } from "../features/auth/utils";
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

type Params = Record<string, any>;

const responseBody = (response: AxiosResponse) => response.data;

const onRequest = (config: InternalAxiosRequestConfig<AxiosRequestConfig>): InternalAxiosRequestConfig<AxiosRequestConfig> => {
    const [accessToken] = [AuthStorage.getAccessToken()];

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error.response?.data || error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

export default class AxiosService {
    private axios: AxiosInstance;
  
    private readonly downloadAxios: AxiosInstance;
  
    constructor(baseUrl?: string) {
      this.axios = Axios.create({
        baseURL: baseUrl || '',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      this.axios.interceptors.request.use(onRequest, onRequestError);
      this.axios.interceptors.response.use(onResponse, this.onResponseError);
  
      this.downloadAxios = Axios.create({
        baseURL: baseUrl || '',
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      this.downloadAxios.interceptors.request.use(onRequest, onRequestError);
      this.downloadAxios.interceptors.response.use(onResponse, this.onResponseError);
    }
  
    /* private refreshTokenAndRetryRequest = async (error: any): Promise<any> => {
      try {
        const refreshToken = AuthStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
  
        const { url } = error.config;
  
        if (url === REFRESH_TOKEN_URL) {
          AuthStorage.clearAuthData();
          window.location.href = '/';
          throw new Error('Failed to refresh token');
        }
  
        const response = await this.axios.post(REFRESH_TOKEN_URL, {
          refreshToken,
        });
        const { data }: { data: LoginResponse } = response;
  
        if (!data?.data?.accessToken) {
          throw new Error('Failed to refresh token');
        }
  
        console.info('[refresh token success]');
        AuthStorage.saveAuthData(data.data);
        error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
  
        return this.axios(error.config);
      } catch (refreshError) {
        console.error(`[refresh token error] [${JSON.stringify(refreshError)}]`);
        AuthStorage.clearAuthData();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }; */
  
    private onResponseError = async (error: AxiosError): Promise<any> => {
      console.error(`[response error] [${JSON.stringify(error)}]`);
  
      if (error.response?.status === 401 && error?.config?.headers) {
        // return await this.refreshTokenAndRetryRequest(error);
        return;
      }
  
      return Promise.reject(error.response?.data || error);
    };
  
    public async get(url: string, params?: Params) {
      const query = qs.stringify(params, { arrayFormat: 'repeat' });
      const path = query ? `${url}?${query}` : url;
      const response = await this.axios.get(path);
  
      return responseBody(response);
    }
  
    public async download(url: string, params?: Params) {
      const query = qs.stringify(params, { arrayFormat: 'repeat' });
      const path = query ? `${url}?${query}` : url;
      const response = await this.downloadAxios.get(path);
      return { data: response.data, headers: response.headers };
    }
  
    async post(url: string, body: Params) {
      const response = await this.axios.post(url, body);
      return responseBody(response);
    }
  
    async put(url: string, body: Params) {
      const response = await this.axios.put(url, body);
      return responseBody(response);
    }
  
    async patch(url: string, body: Params) {
      const response = await this.axios.patch(url, body);
      return responseBody(response);
    }
  
    async delete(url: string, params?: Params) {
      const response = await this.axios.delete(url, { data: params });
      return responseBody(response);
    }
  
    async upload(url: string, formData: FormData) {
      const response = await this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return responseBody(response);
    }
  }