// ALL base urls are expected to NOT have a trailing slash
export type BaseUrls = {
  creditApplication: string
}

export interface ApplicationConfig {
  baseUrls: BaseUrls
}

declare global {
  interface Window {
    baseUrls: BaseUrls
  }
}
