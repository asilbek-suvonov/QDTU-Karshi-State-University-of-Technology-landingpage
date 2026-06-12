import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig 
} from 'axios';

/**
 * Mocking userStore to prevent import errors as per requirements.
 * In a real scenario, this would be imported from your state management (e.g., Zustand).
 */
const useUserStore = {
  getState: () => ({
    userToken: {
      accessToken: null as string | null,
    },
  }),
};

const clearUserInfoAndToken = () => {
  console.log('Clearing user info and token...');
};

class ApiClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = useUserStore.getState().userToken?.accessToken;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        const status = error.response?.status;
        const isAuthPage = typeof window !== 'undefined' && window.location.pathname.includes('/login');

        if ((status === 400 || status === 401) && !isAuthPage) {
          clearUserInfoAndToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        if (status === 500) {
          const message = 'A generic server error occurred. Please try again later.';
          // @ts-ignore
          if (typeof toast !== 'undefined') {
            // @ts-ignore
            toast.error(message);
          } else {
            alert(message);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.request<T>(config);
    return response.data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export const apiClient = new ApiClient();
