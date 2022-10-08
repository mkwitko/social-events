import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchsHomePage } from './matchs-home.page';

const routes: Routes = [
  {
    path: '',
    component: MatchsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchsHomePageRoutingModule {}
