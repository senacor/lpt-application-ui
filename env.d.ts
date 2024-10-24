/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    VUE_CONFIG?: {
      backendBaseUrl?: string,
    };
  }
}
