import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchsDetailsPageRoutingModule } from './matchs-details-routing.module';

import { MatchsDetailsPage } from './matchs-details.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchsDetailsPageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [MatchsDetailsPage],
})
export class MatchsDetailsPageModule {}
