import { Injectable, Inject } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';

@Injectable()

export class CryptHttpService {
  secret: string = '';
  cryptInactive: boolean;
  running: boolean;
  isOnLoad = new BehaviorSubject<boolean>(this.running);

  constructor(@Inject(Http) private http: Http) {
  }

  private encrypt(content) {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(content), this.secret).toString();
    return ciphertext.toString();
  }

  private decrypt(content) {
    if (!this.cryptInactive) {
      if (content.text) {
        content = content.text();
      }

      const bytes = CryptoJS.AES.decrypt(content.toString(), this.secret);
      const decrypted = {
        json: () => {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
      };

      this.isOnLoad.next(false);
      return decrypted
    }

    this.isOnLoad.next(false);
    this.warn();
    return content;
  }

  private setCryptHeaders(headers) {
    if (!headers) {
      headers = new Headers();
    }

    headers.set('Content-Type', 'application/text');
    headers.set('Content-encrypted', 'aes');

    return headers;
  }

  private warn() {
    console.warn('Warning: You transfer non-encrypted content to the interface. Please check your settings');
  }

  public configure(options) {
    this.secret = options.secret;
    this.cryptInactive = options.cryptInactive;
  }

  public onLoad(): Observable<boolean> {
    return this.isOnLoad.asObservable();
  }

  public get(url: string, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
    }

    return this.http.get(url, options).map(res => this.decrypt(res));
  }

  public patch(url: string, body: any, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      body = this.encrypt(body);
    }

    return this.http.patch(url, body, options).map(res => this.decrypt(res));
  }

  public post(url: string, body: any, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      options.responseType = ResponseContentType.Text;
      body = this.encrypt(body);
    }

    return this.http.post(url, body, options).map(res => this.decrypt(res));
  }

  public put(url: string, body: any, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      body = this.encrypt(body);
    }


    return this.http.put(url, body, options).map(res => this.decrypt(res));
  }

  public delete(url: string, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
    }

    return this.http.delete(url, options).map(res => this.decrypt(res));
  }

  public options(url: string, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
    }

    return this.http.options(url, options).map(res => this.decrypt(res));
  }
}
