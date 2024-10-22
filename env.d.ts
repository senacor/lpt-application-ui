/// <reference types="vite/client" />

declare global {
  interface Window {
    VUE_CONFIG?: {
      backendBaseUrl?: string,
    };
  }
}
