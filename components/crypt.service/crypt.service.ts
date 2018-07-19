import { Injectable, Inject } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable()

export class CryptService {
  private keySize: number = 256;
  private ivSize: number = 128;
  private saltSize: number = 256;
  private iterations: number = 1000;

  constructor() {
  }

  public encrypt(msg: any, pass: any) {
    const salt = CryptoJS.lib.WordArray.random(this.saltSize / 8);
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });

    const iv = CryptoJS.lib.WordArray.random(this.ivSize / 8);
    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    const encryptedHex = this.base64ToHex(encrypted.toString());
    const base64result = this.hexToBase64(salt + iv + encryptedHex);

    return base64result;
  }

  public decrypt(transitmessage: any, pass: any) {
    if (transitmessage.toString() === '{}') {
      return JSON.stringify({});
    }

    const hexResult: any = this.base64ToHex(transitmessage)

    const salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    const iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    const encrypted = this.hexToBase64(hexResult.substring(96));

    const key = CryptoJS.PBKDF2(pass, salt, {
        keySize: this.keySize / 32,
        iterations: this.iterations
      });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  private hexToBase64(str: any) {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
  }

  private base64ToHex(str: any) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      let tmp = bin.charCodeAt(i).toString(16);

      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }

    return hex.join("");
  }
}
