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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var crypt_service_1 = require("../crypt.service/crypt.service");
require("rxjs/add/operator/map");
var CryptHttpService = /** @class */ (function () {
    function CryptHttpService(http, crypt) {
        this.http = http;
        this.crypt = crypt;
        this.secret = '';
        this.isOnLoad = new rxjs_1.BehaviorSubject(this.running);
    }
    CryptHttpService.prototype.encrypt = function (content) {
        var ciphertext = this.crypt.encrypt(JSON.stringify(content), this.secret);
        return ciphertext;
    };
    CryptHttpService.prototype.decrypt = function (content) {
        if (!this.cryptInactive) {
            if (content.text) {
                content = content.text();
            }
            var bytes_1 = this.crypt.decrypt(content.toString(), this.secret);
            var decrypted = {
                json: function () {
                    return JSON.parse(bytes_1);
                }
            };
            this.isOnLoad.next(false);
            return decrypted;
        }
        this.isOnLoad.next(false);
        if (!this.warnInactive) {
            this.warn();
        }
        return content;
    };
    CryptHttpService.prototype.setCryptHeaders = function (headers) {
        if (!headers) {
            headers = new http_1.HttpHeaders();
        }
        headers = headers.append('Content-Type', 'application/text');
        headers = headers.append('Content-encrypted', 'aes');
        return headers;
    };
    CryptHttpService.prototype.warn = function () {
        console.warn('Warning: You transfer non-encrypted content to the interface. Please check your settings');
    };
    CryptHttpService.prototype.configure = function (options) {
        this.secret = options.secret;
        this.warnInactive = options.warnInactive;
        this.cryptInactive = options.cryptInactive;
    };
    CryptHttpService.prototype.onLoad = function () {
        return this.isOnLoad.asObservable();
    };
    CryptHttpService.prototype.get = function (url, options) {
        var _this = this;
        this.isOnLoad.next(true);
        if (!this.cryptInactive) {
            options.headers = this.setCryptHeaders(options.headers);
        }
        return this.http.get(url, options).map(function (res) { return _this.decrypt(res); }, function (e) { return _this.isOnLoad.next(false); });
    };
    CryptHttpService.prototype.patch = function (url, body, options) {
        var _this = this;
        this.isOnLoad.next(true);
        if (!this.cryptInactive) {
            options.headers = this.setCryptHeaders(options.headers);
            body = this.encrypt(body);
        }
        return this.http.patch(url, body, options).map(function (res) { return _this.decrypt(res); }, function (e) { return _this.isOnLoad.next(false); });
    };
    CryptHttpService.prototype.post = function (url, body, options) {
        var _this = this;
        this.isOnLoad.next(true);
        if (!this.cryptInactive) {
            options.headers = this.setCryptHeaders(options.headers);
            options.responseType = 'text';
            body = this.encrypt(body);
        }
        return this.http.post(url, body, options).map(function (res) { return _this.decrypt(res); }, function (e) { return _this.isOnLoad.next(false); });
    };
    CryptHttpService.prototype.put = function (url, body, options) {
        var _this = this;
        this.isOnLoad.next(true);
        if (!this.cryptInactive) {
            options.headers = this.setCryptHeaders(options.headers);
            body = this.encrypt(body);
        }
        return this.http.put(url, body, options).map(function (res) { return _this.decrypt(res); }, function (e) { return _this.isOnLoad.next(false); });
    };
    CryptHttpService.prototype.delete = function (url, options) {
        var _this = this;
        this.isOnLoad.next(true);
        if (!this.cryptInactive) {
            options.headers = this.setCryptHeaders(options.headers);
        }
        return this.http.delete(url, options).map(function (res) { return _this.decrypt(res); }, function (e) { return _this.isOnLoad.next(false); });
    };
    CryptHttpService.prototype.options = function (url, options) {
        var _this = this;
        this.isOnLoad.next(true);
        if (!this.cryptInactive) {
            options.headers = this.setCryptHeaders(options.headers);
        }
        return this.http.options(url, options).map(function (res) { return _this.decrypt(res); }, function (e) { return _this.isOnLoad.next(false); });
    };
    CryptHttpService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.HttpClient)),
        __metadata("design:paramtypes", [http_1.HttpClient, crypt_service_1.CryptService])
    ], CryptHttpService);
    return CryptHttpService;
}());
exports.CryptHttpService = CryptHttpService;
//# sourceMappingURL=http.service.js.map