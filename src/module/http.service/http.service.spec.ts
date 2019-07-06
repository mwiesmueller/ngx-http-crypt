import { inject, TestBed} from '@angular/core/testing';
import { CryptHttpService } from '../http.service/http.service';
import { CryptService } from '../crypt.service/crypt.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

describe('Http Service', () => {
  beforeEach(() => {
    spyOn(window.console, 'warn');

    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        CryptHttpService, CryptService
      ]
    });
  });

  it('... CryptHttpService.encrypt must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.encrypt).toBeTruthy();
  }));

  it('... CryptHttpService.decrypt must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.decrypt).toBeTruthy();
  }));

  it('... Test encrypt and decrypt function against each other', inject([ CryptHttpService ], (crypt) => {
    const encrypt = crypt.encrypt({ foo: 'bar' });
    const decrypt = crypt.decrypt(encrypt);

    expect(encrypt).toBeDefined();
    expect(decrypt.foo).toBe('bar');
  }));

  it('... Test decrypt function when encyrpt is inactive and a warn message must be log', inject([ CryptHttpService ], (crypt) => {
    crypt.cryptInactive = true;

    const decrypt = crypt.decrypt({ foo: 'bar' });

    expect(window.console.warn).toHaveBeenCalled();
    expect(decrypt.foo).toBe('bar');
  }));

  it('... CryptHttpService.setCryptHeaders must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.setCryptHeaders).toBeTruthy();
  }));

  it('... must return new Headers when no headers are defined', inject([ CryptHttpService ], (crypt) => {
    const headers = crypt.setCryptHeaders();

    expect(headers.get('Content-Type')).toBeDefined();
    expect(headers.get('Content-encrypted')).toBeDefined();
  }));

  it('... must append to Headers when are defined', inject([ CryptHttpService ], (crypt) => {
    const newheaders = new HttpHeaders();

    newheaders.set('foo', 'Bar');

    const headers = crypt.setCryptHeaders(newheaders);

    expect(headers.get('Content-Type')).toBeDefined();
    expect(headers.get('Content-encrypted')).toBeDefined();
    expect(headers.get('foo')).toBeDefined();
  }));

  it('... CryptHttpService.warn must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.warn).toBeTruthy();
  }));

  it('... CryptHttpService.warn must be a warn message into console', inject([ CryptHttpService ], (crypt) => {
    crypt.warn();

    expect(window.console.warn).toHaveBeenCalled();
  }));

  it('... CryptHttpService.configure must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.configure).toBeTruthy();
  }));

  it('... CryptHttpService.configure must configure the module', inject([ CryptHttpService ], (crypt) => {
    crypt.configure({ secret: '123', cryptInactive: true });

    expect(crypt.secret).toBe('123');
    expect(crypt.cryptInactive).toBe(true);
  }));

  it('... CryptHttpService.get must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.get).toBeTruthy();
  }));

  it('... CryptHttpService.patch must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.patch).toBeTruthy();
  }));

  it('... CryptHttpService.post must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.patch).toBeTruthy();
  }));

  it('... CryptHttpService.put must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.patch).toBeTruthy();
  }));

  it('... CryptHttpService.delete must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.patch).toBeTruthy();
  }));

  it('... CryptHttpService.options must exist', inject([ CryptHttpService ], (crypt) => {
    expect(crypt.patch).toBeTruthy();
  }));
});
