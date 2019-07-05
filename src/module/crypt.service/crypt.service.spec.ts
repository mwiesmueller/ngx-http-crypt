import { inject, TestBed, async, tick } from '@angular/core/testing';
import { CryptService } from '../crypt.service/crypt.service';

describe('Crypt Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      providers: [
        CryptService
      ]
    });
  });

  it('... CryptSerivce.encrypt must exist', inject([ CryptService ], (crypt) => {
    expect(crypt.encrypt).toBeTruthy();
  }));

  it('... CryptSerivce.encrypt must encrypt a object to AES String', inject([ CryptService ], (crypt) => {
    let string = crypt.encrypt(JSON.stringify({ hello: 'world' }), 'test');

    expect(typeof string).toEqual('string');
  }));

  it('... CryptSerivce.decrypt must exist', inject([ CryptService ], (crypt) => {
    expect(crypt.decrypt).toBeTruthy();
  }));

  it('... CryptSerivce.decrypt must decrypt a AES String', inject([ CryptService ], (crypt) => {
    let string = crypt.encrypt(JSON.stringify({ hello: 'world' }), 'test');
    let decrypted = JSON.parse(crypt.decrypt(string, 'test'));

    expect(typeof string).toEqual('string');
    expect(decrypted).toEqual({ hello: 'world' });
  }));

  it('... CryptSerivce.hexToBase64 must exist', inject([ CryptService ], (crypt) => {
    expect(crypt.hexToBase64).toBeTruthy();
  }));

  it('... CryptSerivce.base64ToHex must exist', inject([ CryptService ], (crypt) => {
    expect(crypt.base64ToHex).toBeTruthy();
  }));
});
