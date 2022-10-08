import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersDetailsPageRoutingModule } from './users-details-routing.module';

import { UsersDetailsPage } from './users-details.page';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersDetailsPageRoutingModule,
    ReactiveFormsModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [UsersDetailsPage],
})
export class UsersDetailsPageModule {}
