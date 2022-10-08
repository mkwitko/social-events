import { MyCustomFab } from './../../../../components/fab/fab/fab.module';
import { MySkeletonBanner } from './../../../../components/skeleton/skeleton-banner/skeleton-banner.module';
import { MyCustomTab } from './../../../../components/tabs/tab/tab.module';
import { MyCustomHeader } from './../../../../components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationsHomePageRoutingModule } from './organizations-home-routing.module';

import { OrganizationsHomePage } from './organizations-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationsHomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MySkeletonBanner,
    MyCustomFab,
  ],
  declarations: [OrganizationsHomePage],
})
export class OrganizationsHomePageModule {}
