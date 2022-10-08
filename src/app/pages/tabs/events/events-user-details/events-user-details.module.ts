import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsUserDetailsPageRoutingModule } from './events-user-details-routing.module';

import { EventsUserDetailsPage } from './events-user-details.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MySkeletonBanner } from 'src/app/components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsUserDetailsPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MySkeletonBanner,
  ],
  declarations: [EventsUserDetailsPage],
})
export class EventsUserDetailsPageModule {}
