import { UserClass } from 'src/app/classes/users/user';
import { Injectable } from '@angular/core';
import { Likes } from 'src/app/classes/likes/likes';
import { EventsInt } from 'src/app/interfaces/events/events-int';

@Injectable({
  providedIn: 'root',
})
export class ShuffleService {
  constructor(private likeClass: Likes, private userClass: UserClass) {}

  shuffle(array, event: EventsInt) {
    const nonInteractions = this.userClass.findNonInteractions(array);
    return nonInteractions[Math.floor(Math.random() * nonInteractions.length)];
  }
}
