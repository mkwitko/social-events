import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsUserDetailsPage } from './events-user-details.page';

const routes: Routes = [
  {
    path: '',
    component: EventsUserDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsUserDetailsPageRoutingModule {}
