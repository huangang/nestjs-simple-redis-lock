import { RedisLockOptions } from './interfaces/redisLockOptions.interface';
export declare class RedisLockService {
    protected readonly config: RedisLockOptions;
    readonly uuid: string;
    constructor(config: RedisLockOptions);
    private prefix;
    private getClient;
    private static generateUuid;
    lockOnce(name: any, expire: any): Promise<boolean>;
    lock(name: string, expire?: number, retryInterval?: number, maxRetryTimes?: number): Promise<void>;
    unlock(name: any): Promise<void>;
    setTTL(name: any, milliseconds: any): Promise<void>;
    sleep(ms: Number): Promise<Function>;
}
