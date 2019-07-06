"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_service_1 = require("../http.service/http.service");
var crypt_service_1 = require("../crypt.service/crypt.service");
var http_1 = require("@angular/common/http");
describe('Http Service', function () {
    beforeEach(function () {
        spyOn(window.console, 'warn');
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            providers: [
                http_service_1.CryptHttpService, crypt_service_1.CryptService
            ]
        });
    });
    it('... CryptHttpService.encrypt must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.encrypt).toBeTruthy();
    }));
    it('... CryptHttpService.decrypt must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.decrypt).toBeTruthy();
    }));
    it('... Test encrypt and decrypt function against each other', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        var encrypt = crypt.encrypt({ foo: 'bar' });
        var decrypt = crypt.decrypt(encrypt);
        expect(encrypt).toBeDefined();
        expect(decrypt.foo).toBe('bar');
    }));
    it('... Test decrypt function when encyrpt is inactive and a warn message must be log', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        crypt.cryptInactive = true;
        var decrypt = crypt.decrypt({ foo: 'bar' });
        expect(window.console.warn).toHaveBeenCalled();
        expect(decrypt.foo).toBe('bar');
    }));
    it('... CryptHttpService.setCryptHeaders must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.setCryptHeaders).toBeTruthy();
    }));
    it('... must return new Headers when no headers are defined', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        var headers = crypt.setCryptHeaders();
        expect(headers.get('Content-Type')).toBeDefined();
        expect(headers.get('Content-encrypted')).toBeDefined();
    }));
    it('... must append to Headers when are defined', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        var newheaders = new http_1.HttpHeaders();
        newheaders.set('foo', 'Bar');
        var headers = crypt.setCryptHeaders(newheaders);
        expect(headers.get('Content-Type')).toBeDefined();
        expect(headers.get('Content-encrypted')).toBeDefined();
        expect(headers.get('foo')).toBeDefined();
    }));
    it('... CryptHttpService.warn must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.warn).toBeTruthy();
    }));
    it('... CryptHttpService.warn must be a warn message into console', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        crypt.warn();
        expect(window.console.warn).toHaveBeenCalled();
    }));
    it('... CryptHttpService.configure must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.configure).toBeTruthy();
    }));
    it('... CryptHttpService.configure must configure the module', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        crypt.configure({ secret: '123', cryptInactive: true });
        expect(crypt.secret).toBe('123');
        expect(crypt.cryptInactive).toBe(true);
    }));
    it('... CryptHttpService.get must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.get).toBeTruthy();
    }));
    it('... CryptHttpService.patch must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.patch).toBeTruthy();
    }));
    it('... CryptHttpService.post must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.patch).toBeTruthy();
    }));
    it('... CryptHttpService.put must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.patch).toBeTruthy();
    }));
    it('... CryptHttpService.delete must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.patch).toBeTruthy();
    }));
    it('... CryptHttpService.options must exist', testing_1.inject([http_service_1.CryptHttpService], function (crypt) {
        expect(crypt.patch).toBeTruthy();
    }));
});
//# sourceMappingURL=http.service.spec.js.map