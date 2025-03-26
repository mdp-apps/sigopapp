import { Platform } from "react-native";

import { AxiosAdapter } from "../adapters";

export const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL = (
  STAGE === "dev"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID
) as string;

export const sigopApiFetcher = new AxiosAdapter({
  baseURL: API_URL,
});

export const newSigopApiFetcher = new AxiosAdapter({
  baseURL: process.env.EXPO_PUBLIC_API_SIGOP as string,
});


