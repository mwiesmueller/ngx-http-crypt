# ngx-http-crypt (Angular 4+)

This module is the counterpart to [express-crypto](https://www.npmjs.com/package/express-crypto) and designed to transmit a encrypted content to a REST API. As encryption is used the `AES Standard`.

It is simply passed through the `@angular/http` module only that this module will encrypt and decrypt the transmitted content.

## Installation

```
npm i --save-exact ngx-http-crypt
```

## Configure your Angular Application

#### Set the `CryptHttpService` as provider in your AppModule:

```
import { CryptHttpService } from 'ngx-http-crypt';

@NgModule({
  providers: [
    .
    .
    .
    CryptHttpService
  ]
})

```

#### Call the function to configure your settings in your app component

```
import { CryptHttpService } from 'ngx-http-crypt';
import { Component, ViewEncapsulation, Inject } from '@angular/core';


@Component({
  selector: 'demo', // <my-app></my-app>
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ ],
  providers: [ ]
})
export class AppComponent {

  constructor(public crypt: CryptHttpService) {
  }

  ngOnInit() {
    this.crypt.configure({
        secret: 'secret123!',
        cryptInactive: true|false
      })
  }
}
```

##### configure(object)

- secret: Define your own secret for the AES encryption
- cryptInactive: Set it to true when you like to disable the encryption. Default is false
- warnInactive: Set it to true when you like to disable the warn message on transfer of a not encrypted content.

### Make your first Call with encryption

The usage of this module is the same as the `@angular/http` module. You will find the docs [here](https://angular.io/api/http/Http)


Example:

```
import { CryptHttpService } from 'ngx-http-crypt';
import { Component, ViewEncapsulation, Inject } from '@angular/core';


@Component({
  .
  .
  .
})
export class IamAComponent {

  constructor(public crypt: CryptHttpService) {
  }

  send() {
    this.crypt.post(url: string, options?: RequestOptionArgs).subscribe(res => res)
  }
}

```

### Subscribe module activity

With this method it's possible to subscribe activity for ex a loadingbar.

Example:
```
import { CryptHttpService } from 'ngx-http-crypt';
import { Component, ViewEncapsulation, Inject } from '@angular/core';


@Component({
  .
  .
  .
})
export class IamAComponent {

  constructor(public crypt: CryptHttpService) {
    this.crypt.onLoad().subscribe(d => {
      d => true when a request is running, false when it's done
    });
  }

  send() {
    this.crypt.post(url: string, options?: RequestOptionArgs).subscribe(res => res)
  }
}

```

## License

The MIT License (MIT)
Copyright (c) 2017 Martin Wiesmüller - WERBAS AG / Werbas Innotec GmbH.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
