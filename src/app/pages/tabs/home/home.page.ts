import { UserClass } from 'src/app/classes/users/user';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { EventsClass } from 'src/app/classes/events/events';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/classes/chats/chat';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(
    public events: EventsClass,
    private navigation: NavigationService,
    private chatClass: Chat
  ) {}

  goTo(id) {
    this.navigation.rotaId('events-user-details', id);
  }

  reset() {
    this.chatClass.hardReset();
  }
}
