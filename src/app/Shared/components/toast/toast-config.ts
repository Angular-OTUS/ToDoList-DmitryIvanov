import { InjectionToken } from '@angular/core';

export const TOAST_DATA: InjectionToken<ToastData> = new InjectionToken<ToastData>('toast-data');

export interface ToastData {
  type: ToastType;
  text?: string;
}

export type ToastType = 'warning' | 'info' | 'success';

export interface ToastConfig {
  position?: {
    top: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

export const defaultToastConfig: ToastConfig = {
  position: {
    top: 20,
    right: 20,
  },
  animation: {
    fadeOut: 2500,
    fadeIn: 300,
  },
};

export const TOAST_CONFIG_TOKEN: InjectionToken<ToastConfig> = new InjectionToken<ToastConfig>('toast-config');
