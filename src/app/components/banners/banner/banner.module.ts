import { BannerComponent } from './banner.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BannerComponent
  ],
  providers: []
})

export class MyBannerModule {}
