

/* eslint-disable no-unused-vars */
export interface CacheService {
  cache(key: string, value: number): Promise<unknown>;
  get(key: string): Promise<unknown>;

}