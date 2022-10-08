import { Matches } from './../../../classes/match/match';
import { Organizations } from './../../../classes/organizations/organizations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from 'src/app/classes/users/user';
import { UpdateManagerClass } from 'src/app/classes/managers/update-manager';
import { EventsClass } from 'src/app/classes/events/events';
import { Likes } from 'src/app/classes/likes/likes';
import { Chat } from 'src/app/classes/chats/chat';
import { Message } from 'src/app/classes/messages/message';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserClass,
    UpdateManagerClass,
    Organizations,
    EventsClass,
    Likes,
    Matches,
    Chat,
    Message,
  ],
})
export class SharedModule {}
