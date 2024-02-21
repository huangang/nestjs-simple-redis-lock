"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var RedisLockModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisLockModule = void 0;
const common_1 = require("@nestjs/common");
const redisLock_service_1 = require("./redisLock.service");
const redisLock_constants_1 = require("./redisLock.constants");
function createRedisLockProvider(options) {
    return [{ provide: redisLock_constants_1.REDIS_LOCK_OPTIONS, useValue: options || {} }];
}
let RedisLockModule = RedisLockModule_1 = class RedisLockModule {
    static register(options) {
        return {
            module: RedisLockModule_1,
            providers: createRedisLockProvider(options),
        };
    }
    static registerAsync(options) {
        return {
            module: RedisLockModule_1,
            imports: options.imports || [],
            providers: this.createAsyncProviders(options),
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            }
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: redisLock_constants_1.REDIS_LOCK_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: redisLock_constants_1.REDIS_LOCK_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createRedisLockOptions(); }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
RedisLockModule = RedisLockModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [redisLock_service_1.RedisLockService],
        exports: [redisLock_service_1.RedisLockService],
    })
], RedisLockModule);
exports.RedisLockModule = RedisLockModule;
//# sourceMappingURL=redisLock.module.js.map