"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_service_1 = require("./http.service/http.service");
var crypt_service_1 = require("./crypt.service/crypt.service");
var NgxHttpCryptModule = /** @class */ (function () {
    function NgxHttpCryptModule() {
    }
    NgxHttpCryptModule = __decorate([
        core_1.NgModule({
            providers: [
                http_service_1.CryptHttpService, crypt_service_1.CryptService
            ]
        })
    ], NgxHttpCryptModule);
    return NgxHttpCryptModule;
}());
exports.NgxHttpCryptModule = NgxHttpCryptModule;
var http_service_2 = require("./http.service/http.service");
exports.CryptHttpService = http_service_2.CryptHttpService;
var crypt_service_2 = require("./crypt.service/crypt.service");
exports.CryptService = crypt_service_2.CryptService;
//# sourceMappingURL=index.js.map