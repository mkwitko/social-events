import { MyCustomTab } from './../../../../components/tabs/tab/tab.module';
import { MyCustomHeader } from './../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationsDetailsPageRoutingModule } from './organizations-details-routing.module';

import { OrganizationsDetailsPage } from './organizations-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationsDetailsPageRoutingModule,
    ReactiveFormsModule,
    MyCustomHeader,
    MyCustomTab,
  ],
  declarations: [OrganizationsDetailsPage],
})
export class OrganizationsDetailsPageModule {}
