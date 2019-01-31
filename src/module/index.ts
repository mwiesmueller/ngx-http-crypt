import { NgModule } from '@angular/core';
import { CryptHttpService } from './http.service/http.service';
import { CryptService } from './crypt.service/crypt.service';

@NgModule({
  providers: [
    CryptHttpService, CryptService
  ]
})

export class NgxHttpCryptModule {}

export { CryptHttpService } from './http.service/http.service';
export { CryptService } from './crypt.service/crypt.service';