import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsHomePageRoutingModule } from './events-home-routing.module';

import { EventsHomePage } from './events-home.page';
import { MyCustomFab } from 'src/app/components/fab/fab/fab.module';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MySkeletonBanner } from 'src/app/components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsHomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MySkeletonBanner,
    MyCustomFab,
  ],
  declarations: [EventsHomePage],
})
export class EventsHomePageModule {}
