"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var crypt_service_1 = require("../crypt.service/crypt.service");
describe('Crypt Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [],
            providers: [
                crypt_service_1.CryptService
            ]
        });
    });
    it('... CryptSerivce.encrypt must exist', testing_1.inject([crypt_service_1.CryptService], function (crypt) {
        expect(crypt.encrypt).toBeTruthy();
    }));
    it('... CryptSerivce.encrypt must encrypt a object to AES String', testing_1.inject([crypt_service_1.CryptService], function (crypt) {
        var string = crypt.encrypt(JSON.stringify({ hello: 'world' }), 'test');
        expect(typeof string).toEqual('string');
    }));
    it('... CryptSerivce.decrypt must exist', testing_1.inject([crypt_service_1.CryptService], function (crypt) {
        expect(crypt.decrypt).toBeTruthy();
    }));
    it('... CryptSerivce.decrypt must decrypt a AES String', testing_1.inject([crypt_service_1.CryptService], function (crypt) {
        var string = crypt.encrypt(JSON.stringify({ hello: 'world' }), 'test');
        var decrypted = JSON.parse(crypt.decrypt(string, 'test'));
        expect(typeof string).toEqual('string');
        expect(decrypted).toEqual({ hello: 'world' });
    }));
    it('... CryptSerivce.hexToBase64 must exist', testing_1.inject([crypt_service_1.CryptService], function (crypt) {
        expect(crypt.hexToBase64).toBeTruthy();
    }));
    it('... CryptSerivce.base64ToHex must exist', testing_1.inject([crypt_service_1.CryptService], function (crypt) {
        expect(crypt.base64ToHex).toBeTruthy();
    }));
});
//# sourceMappingURL=crypt.service.spec.js.map