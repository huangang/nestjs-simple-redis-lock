import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import Redis from 'ioredis';
export interface RedisLockOptions {
    prefix?: string;
    client?: Redis;
}
export interface RedisLockOptionsFactory {
    createRedisLockOptions(): Promise<RedisLockOptions> | RedisLockOptions;
}
export interface RedisLockAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<RedisLockOptionsFactory>;
    useClass?: Type<RedisLockOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<RedisLockOptions> | RedisLockOptions;
    inject?: any[];
}
