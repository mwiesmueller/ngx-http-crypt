import { NgModule } from '@angular/core';
import { CryptHttpService } from './http.service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CryptService } from './crypt.service/crypt.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CryptHttpService, CryptService
  ]
})

export class NgxHttpCryptModule {}

export { CryptHttpService } from './http.service/http.service';
export { CryptService } from './crypt.service/crypt.service';
