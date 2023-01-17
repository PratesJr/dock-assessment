import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { CacheService } from './cache.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheServiceImpl implements CacheService {
  private _logger: Logger;
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache) {
    this._logger = new Logger('CACHE_SERVICE');
  }

  cache(key: string, value: number): Promise<unknown> {
    return this._cacheManager
      .set(key, value)
      .catch((err) => {
        this._logger.error(err);
      });
  }

  get(key: string): Promise<unknown> {
    return this._cacheManager
      .get(key)
      .then((cached) => {
        return cached;
      })
      .catch((err) => {
        this._logger.error(err);
      });
  }

}