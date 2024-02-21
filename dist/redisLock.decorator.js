"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisLock = void 0;
const redisLock_service_1 = require("./redisLock.service");
function RedisLock(lockName, expire, retryInterval, maxRetryTimes) {
    return function (target, key, descriptor) {
        const value = descriptor.value;
        const getLockService = (that) => {
            let lockService;
            for (let i in that) {
                if (that[i] instanceof redisLock_service_1.RedisLockService) {
                    lockService = that[i];
                    break;
                }
            }
            if (!lockService) {
                throw new Error('RedisLock: cannot find the instance of RedisLockService');
            }
            return lockService;
        };
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const lockService = getLockService(this);
                let name;
                if (typeof lockName === 'string') {
                    name = lockName;
                }
                else if (typeof lockName === 'function') {
                    name = lockName(this, ...args);
                }
                try {
                    yield lockService.lock(name, expire, retryInterval, maxRetryTimes);
                    return yield value.call(this, ...args);
                }
                finally {
                    lockService.unlock(name);
                }
            });
        };
        return descriptor;
    };
}
exports.RedisLock = RedisLock;
//# sourceMappingURL=redisLock.decorator.js.map