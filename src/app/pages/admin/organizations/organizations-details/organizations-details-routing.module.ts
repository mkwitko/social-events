import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsDetailsPage } from './organizations-details.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsDetailsPageRoutingModule {}
