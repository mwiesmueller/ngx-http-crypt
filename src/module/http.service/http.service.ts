import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CryptService } from '../crypt.service/crypt.service';
import { map } from 'rxjs/operators';

@Injectable()

export class CryptHttpService {
  secret: string = '';
  cryptInactive: boolean;
  warnInactive: boolean;
  running: boolean;
  isOnLoad = new BehaviorSubject<boolean>(this.running);

  constructor(@Inject(HttpClient) private http: HttpClient, private crypt: CryptService) {
  }

  private encrypt(content: any) {
    const ciphertext = this.crypt.encrypt(JSON.stringify(content), this.secret);
    return ciphertext;
  }

  private decrypt(content: any) {
    if (!this.cryptInactive) {
      if (content.text) {
        content = content.text();
      }

      const bytes = this.crypt.decrypt(content.toString(), this.secret);

      try {
        const decrypted = JSON.parse(bytes);
        this.isOnLoad.next(false);

        return decrypted;
      } catch (err) {
        this.isOnLoad.next(false);
        return { error: 'Can not decypted the content' };
      }
    }

    this.isOnLoad.next(false);

    if (!this.warnInactive) {
      this.warn();
    }

    return content;
  }

  private setCryptHeaders(headers: any) {
    if (!headers) {
      headers = new HttpHeaders();
    }

    headers = headers.append('Content-Type', 'application/text');
    headers = headers.append('Content-encrypted', 'aes');

    return headers;
  }

  private warn() {
    console.warn('Warning: You transfer non-encrypted content to the interface. Please check your settings');
  }

  public configure(options: any) {
    this.secret = options.secret;
    this.warnInactive = options.warnInactive;
    this.cryptInactive = options.cryptInactive;
  }

  public onLoad(): Observable<boolean> {
    return this.isOnLoad.asObservable();
  }

  public get(url: string, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      options.responseType = 'text';
    }

    return this.http.get(url, options).pipe(map(res => {
      if (options && options.observe === 'response') {
        const newRes: any = res;

        newRes.body = this.decrypt(newRes.body);

        return newRes;
      }

      return this.decrypt(res);
    }, e => this.isOnLoad.next(false)));
  }

  public patch(url: string, body: any, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      body = this.encrypt(body);
      options.responseType = 'text';
    }

    return this.http.patch(url, body, options).pipe(map(res => this.decrypt(res), e => this.isOnLoad.next(false)));
  }

  public post(url: string, body: any, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      options.responseType = 'text';
      body = this.encrypt(body);
    }

    return this.http.post(url, body, options).pipe(map(res => this.decrypt(res), e => this.isOnLoad.next(false)));
  }

  public put(url: string, body: any, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      body = this.encrypt(body);
      options.responseType = 'text';
    }


    return this.http.put(url, body, options).pipe(map(res => this.decrypt(res), e => this.isOnLoad.next(false)));
  }

  public delete(url: string, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      options.responseType = 'text';
    }

    return this.http.delete(url, options).pipe(map(res => this.decrypt(res), e => this.isOnLoad.next(false)));
  }

  public options(url: string, options: any): Observable<any> {
    this.isOnLoad.next(true);

    if (!this.cryptInactive) {
      options.headers = this.setCryptHeaders(options.headers);
      options.responseType = 'text';
    }

    return this.http.options(url, options).pipe(map(res => this.decrypt(res), e => this.isOnLoad.next(false)));
  }
}
