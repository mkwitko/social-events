import { CheckinInt } from './../../../../interfaces/checkin/checkin-int';
import { UserClass } from 'src/app/classes/users/user';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { EventsClass } from 'src/app/classes/events/events';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { EventsInt } from 'src/app/interfaces/events/events-int';

@Component({
  selector: 'app-events-user-details',
  templateUrl: './events-user-details.page.html',
  styleUrls: ['./events-user-details.page.scss'],
})
export class EventsUserDetailsPage {
  public url = 'events-user-home';
  public event: EventsInt;

  constructor(
    private route: ActivatedRoute,
    private events: EventsClass,
    private navigation: NavigationService,
    private userClass: UserClass
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id && events.get().length > 0) {
        this.event = this.events.finder(params.id);
      } else {
        this.back();
      }
    });
  }

  hasCheckin() {
    return this.events.findCheckin(this.event, this.userClass.get().userId);
  }

  checkin() {
    this.init();
    this.event.checkin.push(this.makeCheckin());
    this.events.update(this.event).then(() => {
      this.userClass.update(this.userClass.get()).then(() => {
        this.back();
      });
    });
  }

  find() {
    this.navigation.rotaId('swipe-home', this.event.id);
  }

  init() {
    if (!this.event.checkin || this.event.checkin.length === 0) {
      this.event.checkin = [];
    }
  }

  makeCheckin() {
    const checkin: CheckinInt = {
      userId: this.userClass.get().userId,
      orgId: this.event.orgId,
      eventId: this.event.id,
    };
    return checkin;
  }

  back() {
    this.navigation.goTo(this.url);
  }
}
