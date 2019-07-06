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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CryptoJS = require("crypto-js");
var CryptService = /** @class */ (function () {
    function CryptService() {
        this.keySize = 256;
        this.ivSize = 128;
        this.saltSize = 256;
        this.iterations = 1000;
    }
    CryptService.prototype.encrypt = function (msg, pass) {
        var salt = CryptoJS.lib.WordArray.random(this.saltSize / 8);
        var key = CryptoJS.PBKDF2(pass, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        var iv = CryptoJS.lib.WordArray.random(this.ivSize / 8);
        var encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        var encryptedHex = this.base64ToHex(encrypted.toString());
        var base64result = this.hexToBase64(salt + iv + encryptedHex);
        return base64result;
    };
    CryptService.prototype.decrypt = function (transitmessage, pass) {
        if (transitmessage.toString() === '{}') {
            return JSON.stringify({});
        }
        var hexResult = this.base64ToHex(transitmessage);
        var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
        var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
        var encrypted = this.hexToBase64(hexResult.substring(96));
        var key = CryptoJS.PBKDF2(pass, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    CryptService.prototype.hexToBase64 = function (str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    };
    CryptService.prototype.base64ToHex = function (str) {
        for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
            var tmp = bin.charCodeAt(i).toString(16);
            if (tmp.length === 1)
                tmp = "0" + tmp;
            hex[hex.length] = tmp;
        }
        return hex.join("");
    };
    CryptService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CryptService);
    return CryptService;
}());
exports.CryptService = CryptService;
//# sourceMappingURL=crypt.service.js.map