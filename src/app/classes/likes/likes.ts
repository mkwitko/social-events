import { EventsInt } from './../../interfaces/events/events-int';
import { UserClass } from 'src/app/classes/users/user';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/interfaces/like/like';
import { User } from 'src/app/interfaces/auth/user';
import { Matches } from '../match/match';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Injectable()
export class Likes {
  private value = new Array<Like>();
  private ref = environment.global.firebasePath.users;

  constructor(
    private userClass: UserClass,
    private matchClass: Matches,
    private screen: ScreenService
  ) {}

  get() {
    return this.value;
  }

  set(value) {
    this.value = value;
  }

  reset() {
    this.value = [];
  }

  like(to: User, event: EventsInt): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!to.likesReceived || to.likesReceived.length === 0) {
        to.likesReceived = [];
      }
      to.likesReceived.push(this.create(true, event, to, true));
      this.userClass
        .update(to)
        .then(() => {
          const user = this.userClass.get();
          if (!user.likesSended || user.likesSended.length === 0) {
            user.likesSended = [];
          }
          const send = this.create(false, event, to, true);
          user.likesSended.push(send);
          this.userClass
            .update(user)
            .then((res) => {
              if (this.matchClass.checkMatch(to)) {
                this.matchClass.match(to, event).then((res) => {
                  this.screen.presentToast('Match!', '', 'sucess');
                  resolve(res);
                });
              } else {
                resolve(res);
              }
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

  dislike(to: User, event: EventsInt): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!to.dislikesReceived || to.dislikesReceived.length === 0) {
        to.dislikesReceived = [];
      }
      to.dislikesReceived.push(this.create(true, event, to, false));
      this.userClass
        .update(to)
        .then(() => {
          const user = this.userClass.get();
          if (!user.disikesSended || user.disikesSended.length === 0) {
            user.disikesSended = [];
          }
          const send = this.create(false, event, to, false);
          user.disikesSended.push(send);
          this.userClass
            .update(user)
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              reject(false);
            });
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  create(send, event, to, like, expireMultiplier = 2) {
    if (send) {
      return {
        from: this.userClass.get().userId,
        eventId: event.id,
        createdAt: new Date().getTime(),
        expiration: event.when + 86400000 * expireMultiplier,
        like,
      };
    } else {
      return {
        to: to.userId,
        eventId: event.id,
        createdAt: new Date().getTime(),
        expiration: event.when + 86400000 * expireMultiplier,
        like,
      };
    }
  }
}
