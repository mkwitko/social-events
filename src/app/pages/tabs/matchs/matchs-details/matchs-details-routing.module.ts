import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchsDetailsPage } from './matchs-details.page';

const routes: Routes = [
  {
    path: '',
    component: MatchsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchsDetailsPageRoutingModule {}
