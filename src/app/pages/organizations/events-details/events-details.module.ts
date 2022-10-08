import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsDetailsPageRoutingModule } from './events-details-routing.module';

import { EventsDetailsPage } from './events-details.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsDetailsPageRoutingModule,
    ReactiveFormsModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [EventsDetailsPage],
})
export class EventsDetailsPageModule {}
