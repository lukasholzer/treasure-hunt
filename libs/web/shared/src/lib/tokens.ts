import { InjectionToken } from '@angular/core';

export interface ApiConfiguration {
  url: string;
}

/** Dependency injection token for the api endpoint */
export const API_CONFIGURATION_TOKEN = new InjectionToken<ApiConfiguration>('API_CONFIGURATION');
