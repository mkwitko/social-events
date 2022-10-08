import { Component, OnInit } from '@angular/core';
import { EventsClass } from 'src/app/classes/events/events';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-events-user-home',
  templateUrl: './events-user-home.page.html',
  styleUrls: ['./events-user-home.page.scss'],
})
export class EventsUserHomePage {
  constructor(
    public events: EventsClass,
    private navigation: NavigationService
  ) {}

  goTo(id) {
    this.navigation.rotaId('events-user-details', id);
  }
}
