import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import { HttpAdapter } from "./http.adapter";

type ErrorMessage = {
  error: string;
};

interface Options {
  baseURL: string;
  params?: Record<string, string>;
  headers?: Record<string, string | boolean>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseURL,
      params: options.params,
      headers: options.headers,
    });
  }

  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, options);

      return data;
    } catch (error) {
      const serverError = error as AxiosError;
       const errorMessage =
         (serverError.response?.data as ErrorMessage)?.error ||
         "Unknown error occurred";
      //  console.log(errorMessage);

       throw new Error(errorMessage);
    }
  }

  async post<T, B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.axiosInstance.post<T>(url, body, options);
      return data;
    } catch (error) {
      const serverError = error as AxiosError;
      const errorMessage =
        (serverError.response?.data as ErrorMessage)?.error ||
        "Unknown error occurred";
      // console.log(errorMessage);

      throw new Error(errorMessage);
    }
  }

  async put<T, B>(
    url: string,
    body: B,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.axiosInstance.put<T>(url, body, options);
      return data;
    } catch (error) {
      const serverError = error as AxiosError;
      const errorMessage =
        (serverError.response?.data as ErrorMessage)?.error ||
        "Unknown error occurred";
      // console.log(errorMessage);

      throw new Error(errorMessage);
    }
  }

  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.delete<T>(url, options);
      return data;
    } catch (error) {
      const serverError = error as AxiosError;
      const errorMessage =
        (serverError.response?.data as ErrorMessage)?.error ||
        "Unknown error occurred";
      // console.log(errorMessage);

      throw new Error(errorMessage);
    }
  }
}
