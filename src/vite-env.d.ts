/// <reference types="vite/client" />

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
    clarity: (action: string, ...args: any[]) => void;
  }
}

export {};
