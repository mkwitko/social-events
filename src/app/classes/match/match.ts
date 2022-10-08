import { EventsInt } from './../../interfaces/events/events-int';
import { UserClass } from 'src/app/classes/users/user';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/auth/user';
import { Match } from 'src/app/interfaces/match/match';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Injectable()
export class Matches {
  private value = new Array<Match>();

  constructor(private userClass: UserClass) {}

  get() {
    return this.value;
  }

  set(value) {
    this.value = value;
  }

  reset() {
    this.value = [];
  }

  checkMatch(to: User) {
    if (
      this.userClass.findReceived(to.userId) &&
      this.userClass.findReceived(to.userId).like
    ) {
      return true;
    } else {
      return false;
    }
  }

  match(to: User, event: EventsInt): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!to.Matchs || to.Matchs.length === 0) {
        to.Matchs = [];
      }
      to.Matchs.push(this.create(false, event, to));
      this.userClass
        .update(to)
        .then(() => {
          const user = this.userClass.get();
          if (!user.Matchs || user.Matchs.length === 0) {
            user.Matchs = [];
          }
          const send = this.create(true, event, to);
          user.Matchs.push(send);
          this.userClass
            .update(user)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  create(mine, event: EventsInt, to: User, expireMultiplier = 2) {
    if (mine) {
      const match: Match = {
        with: to.userId,
        eventId: event.id,
        createdAt: new Date().getTime(),
        expiration: event.when + 86400000 * expireMultiplier,
      };
      return match;
    } else {
      const match: Match = {
        with: this.userClass.get().userId,
        eventId: event.id,
        createdAt: new Date().getTime(),
        expiration: event.when + 86400000 * expireMultiplier,
      };
      return match;
    }
  }
}
