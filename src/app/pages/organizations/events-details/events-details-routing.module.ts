import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsDetailsPage } from './events-details.page';

const routes: Routes = [
  {
    path: '',
    component: EventsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsDetailsPageRoutingModule {}
