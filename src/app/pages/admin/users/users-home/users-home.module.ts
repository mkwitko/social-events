import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersHomePageRoutingModule } from './users-home-routing.module';

import { UsersHomePage } from './users-home.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MySkeletonBanner } from 'src/app/components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersHomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MySkeletonBanner,
  ],
  declarations: [UsersHomePage],
})
export class UsersHomePageModule {}
