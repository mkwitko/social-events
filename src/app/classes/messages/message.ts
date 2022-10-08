import { MessageInt } from './../../interfaces/chats/message-int';
import { Injectable } from '@angular/core';
import { UserClass } from '../users/user';

@Injectable()
export class Message {
  constructor(private userClass: UserClass) {}

  create(message: string) {
    const result: MessageInt = {
      sender: this.userClass.get().userId,
      message,
      createdAt: new Date().getTime(),
    };
    return result;
  }
}
