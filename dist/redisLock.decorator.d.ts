interface GetLockNameFunc {
    (target: any, ...args: any[]): string;
}
export declare function RedisLock(lockName: String | GetLockNameFunc, expire?: number, retryInterval?: number, maxRetryTimes?: number): (target: any, key: any, descriptor: any) => any;
export {};
