import { AxiosRequestConfig } from "axios";

export abstract class HttpAdapter {
  abstract get<T>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<T>;

  abstract post<T,B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig,
  ): Promise<T>;

  abstract put<T,B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig,
  ): Promise<T>;

  abstract delete<T>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<T>;
}
