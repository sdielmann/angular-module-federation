import { logger } from './logger';

export abstract class MockDatabase<T> {
  protected db: T;

  constructor() {
    logger.info('Creating database...');
    this.init();
  }

  protected abstract init()

  getPlainDatabase(): T {
    return this.db;
  }
}
