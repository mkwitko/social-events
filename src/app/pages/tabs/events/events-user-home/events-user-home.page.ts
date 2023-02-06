import { UserClass } from './../../../../classes/users/user';
import { Component, OnInit } from '@angular/core';
import { EventsClass } from 'src/app/classes/events/events';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-events-user-home',
  templateUrl: './events-user-home.page.html',
  styleUrls: ['./events-user-home.page.scss'],
})
export class EventsUserHomePage {
  public _events = [];
  constructor(
    public events: EventsClass,
    public user: UserClass,
    private navigation: NavigationService
  ) {}

  ionViewDidEnter() {
    if (this.user.get() && this.events.get()) {
      this._events = this.events.findUserEvents(this.user.get().userId);
      console.log(this._events);
    } else {
      this.back();
    }
  }

  goTo(id) {
    this.navigation.rotaId('events-user-details', id);
  }

  back() {
    this.navigation.goTo('home');
  }
}
