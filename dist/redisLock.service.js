"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var RedisLockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisLockService = void 0;
const common_1 = require("@nestjs/common");
const debugFactory = require("debug");
const redisLock_constants_1 = require("./redisLock.constants");
const debug = debugFactory('nestjs-simple-redis-lock');
debug('booting %o', 'nestjs-simple-redis-lock');
let RedisLockService = RedisLockService_1 = class RedisLockService {
    constructor(config) {
        this.config = config;
        this.uuid = RedisLockService_1.generateUuid();
        debug(`RedisLock: uuid: ${this.uuid}`);
    }
    prefix(name) {
        if (this.config.prefix) {
            return this.config.prefix + name;
        }
        return `lock:${name}`;
    }
    getClient() {
        return this.config.client;
    }
    static generateUuid() {
        let d = Date.now();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
    lockOnce(name, expire) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClient();
            const result = yield client.set(this.prefix(name), this.uuid, 'PX', expire, 'NX');
            debug(`lock: ${name}, result: ${result}`);
            return result !== null;
        });
    }
    lock(name, expire = 60000, retryInterval = 100, maxRetryTimes = 36000) {
        return __awaiter(this, void 0, void 0, function* () {
            let retryTimes = 0;
            while (true) {
                if (yield this.lockOnce(name, expire)) {
                    break;
                }
                else {
                    yield this.sleep(retryInterval);
                    if (retryTimes >= maxRetryTimes) {
                        throw new Error(`RedisLockService: locking ${name} timed out`);
                    }
                    retryTimes++;
                }
            }
        });
    }
    unlock(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClient();
            const result = yield client.eval("if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end", 1, this.prefix(name), this.uuid);
            debug(`unlock: ${name}, result: ${result}`);
        });
    }
    setTTL(name, milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.getClient();
            const result = yield client.pexpire(this.prefix(name), milliseconds);
            debug(`set TTL: ${name}, result: ${result}`);
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, Number(ms)));
    }
};
RedisLockService = RedisLockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redisLock_constants_1.REDIS_LOCK_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], RedisLockService);
exports.RedisLockService = RedisLockService;
//# sourceMappingURL=redisLock.service.js.map