import { MyCustomCardEvent } from './../../../../components/events/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsUserHomePageRoutingModule } from './events-user-home-routing.module';

import { EventsUserHomePage } from './events-user-home.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MySkeletonBanner } from 'src/app/components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MyCustomSearch } from 'src/app/components/search/search/search.module';
import { MyCustomSubtitle } from 'src/app/atoms/subtitle/subtitle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsUserHomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MySkeletonBanner,
    MyCustomCardEvent,
    MyCustomSearch,
    MyCustomSubtitle,
  ],
  declarations: [EventsUserHomePage],
})
export class EventsUserHomePageModule {}
