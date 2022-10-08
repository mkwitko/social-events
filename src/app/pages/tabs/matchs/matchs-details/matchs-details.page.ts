import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { User } from 'src/app/interfaces/auth/user';
import { Chat } from 'src/app/classes/chats/chat';
import { EventsClass } from 'src/app/classes/events/events';
import { EventsInt } from 'src/app/interfaces/events/events-int';

@Component({
  selector: 'app-matchs-details',
  templateUrl: './matchs-details.page.html',
  styleUrls: ['./matchs-details.page.scss'],
})
export class MatchsDetailsPage {
  public user: User;
  public url = 'matchs-home';
  private event: EventsInt;
  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private userClass: UserClass,
    private eventClass: EventsClass,
    private chatClass: Chat
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.userClass.getAll() && params.id) {
        this.user = this.userClass.finder(params.id);
        console.log(this.user);
        this.event = this.eventClass.finder(params.event);
        if (!this.user) {
          this.back();
        }
      } else {
        this.back();
      }
    });
  }

  back() {
    this.navigation.goTo(this.url);
  }

  chat() {
    if (this.chatClass.find(this.user.userId)) {
      this.navigation.rotaId('chat', this.user.userId, this.event.id);
    } else {
      const chat = this.chatClass.create(this.user, this.event);
      this.chatClass.add(chat);
    }
  }
}
