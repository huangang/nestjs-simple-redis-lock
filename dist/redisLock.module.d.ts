import { DynamicModule } from '@nestjs/common';
import { RedisLockOptions, RedisLockAsyncOptions } from './interfaces/redisLockOptions.interface';
export declare class RedisLockModule {
    static register(options: RedisLockOptions): DynamicModule;
    static registerAsync(options: RedisLockAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
