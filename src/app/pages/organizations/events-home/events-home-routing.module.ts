import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsHomePage } from './events-home.page';

const routes: Routes = [
  {
    path: '',
    component: EventsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsHomePageRoutingModule {}
