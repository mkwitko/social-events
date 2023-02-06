import { MyCustomHeader } from './../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MySkeletonBanner } from 'src/app/components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomCardEvent } from 'src/app/components/events/card/card.module';
import { MyCustomSearch } from 'src/app/components/search/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MySkeletonBanner,
    MyCustomCardEvent,
    MyCustomSearch,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
