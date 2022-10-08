import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsUserHomePage } from './events-user-home.page';

const routes: Routes = [
  {
    path: '',
    component: EventsUserHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsUserHomePageRoutingModule {}
