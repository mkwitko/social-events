import { Subscription } from 'rxjs';
import { ChatInt } from './../../../interfaces/chats/chat-int';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Chat } from 'src/app/classes/chats/chat';
import { Message } from 'src/app/classes/messages/message';
import { User } from 'src/app/interfaces/auth/user';
import { UserClass } from 'src/app/classes/users/user';
import { EventsClass } from 'src/app/classes/events/events';
import { EventsInt } from 'src/app/interfaces/events/events-int';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnDestroy {
  public message = '';
  public chat: ChatInt;
  public url = 'matchs-home';
  public user: User;
  private event: EventsInt;
  private sub: Subscription;

  constructor(
    public chatClass: Chat,
    public userClass: UserClass,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private messageClass: Message,
    private eventClass: EventsClass,
    private crud: CrudService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id && params.event) {
        console.log(params.id);
        const chat: ChatInt = this.chatClass.find(params.id);
        console.log(chat);
        if (
          this.chatClass.get() &&
          this.userClass.getAll() &&
          this.eventClass.get()
        ) {
          this.user = this.userClass.finder(params.id);
          this.event = this.eventClass.finder(params.event);
          this.crud
            .get(this.chatClass.collection, this.chat, chat.id)
            .subscribe({
              next: (res) => {
                console.log('update -', res);
                this.chat = res;
                if (!res) {
                  this.back();
                }
              },
              error: (err) => {
                console.warn(err);
                this.back();
              },
            });
          if (!this.user || !this.event) {
            this.back();
          }
        } else {
          this.back();
        }
      } else {
        this.back();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  send() {
    const message = this.messageClass.create(this.message);
    if (!this.chat.messages) {
      this.chat.messages = [];
    }
    this.chat.messages.push(message);

    this.message = '';
    this.chatClass.update(this.chat, this.chat.id);
  }

  back() {
    this.navigation.goTo(this.url);
  }
}
