import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwipeHomePageRoutingModule } from './swipe-home-routing.module';

import { SwipeHomePage } from './swipe-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwipeHomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [SwipeHomePage],
})
export class SwipeHomePageModule {}
