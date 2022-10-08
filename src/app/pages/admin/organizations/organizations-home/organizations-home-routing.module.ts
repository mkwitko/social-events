import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsHomePage } from './organizations-home.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationsHomePageRoutingModule {}
