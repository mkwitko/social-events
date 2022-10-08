import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwipeHomePage } from './swipe-home.page';

const routes: Routes = [
  {
    path: '',
    component: SwipeHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwipeHomePageRoutingModule {}
