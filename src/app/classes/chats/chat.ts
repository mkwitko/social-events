import { Subscription } from 'rxjs';
import { OrganizationsInt } from './../../interfaces/organizations/organizations-int';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CacheService } from 'src/app/services/cache/cache.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { UpdateManagerClass } from '../managers/update-manager';
import { ChatInt } from 'src/app/interfaces/chats/chat-int';
import { UserClass } from '../users/user';
import { User } from 'src/app/interfaces/auth/user';
import { EventsInt } from 'src/app/interfaces/events/events-int';
import { EventsClass } from '../events/events';

@Injectable()
export class Chat {
  public collection: AngularFirestoreCollection;
  private finder = new Array<ChatInt>();
  private value = new Array<ChatInt>();
  private cachePath = environment.global.cachePath.chat;
  private ref = environment.global.firebasePath.chat;
  private interfaceRef: ChatInt;

  private subAll: Subscription;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private updateM: UpdateManagerClass,
    private userClass: UserClass,
    private events: EventsClass
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  hardReset() {
    this.getAllHttp().then((all: any) => {
      for (const a of all) {
        this.delete(a.id);
      }
      this.userClass.hardReset();
      this.events.hardReset();
    });
  }

  getAllMy(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.subAll = this.collection
        .valueChanges({
          id: id,
        })
        .subscribe({
          next: (res) => {
            const result = res;
            resolve(result);
          },
          error: (err) => {
            this.screen.presentToast(this.translate.verifyErrors(err.code));
            reject(err);
          },
        });
    });
  }

  getAllHttp() {
    return new Promise((resolve) => {
      this.subAll = this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getHttp(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.crud.get(this.collection, this.interfaceRef, id).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(this.cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.value;
  }

  setCache(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(this.cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(value) {
    this.value = value;
    this.fillMyChats();
  }

  create(who: User, event: EventsInt, expireMultiplier = 2) {
    const chat: ChatInt = {
      users: [this.userClass.get().userId, who.userId],
      eventId: event.id,
      createdAt: new Date().getTime(),
      expiration: event.when + 86400000 * expireMultiplier,
      messages: [],
      newMessage: 0,
    };
    return chat;
  }

  add(object: ChatInt): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .add(this.collection, object)
        .then((res) => {
          const obj = object;
          obj.id = res.id;
          this.update(obj, res.id).then(() => {
            // this.up();
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  update(object, id?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, object, id ? id : object.id)
        .then((res) => {
          // this.up();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // up() {
  //   const data: UpdateInterface = {
  //     Chats: new Date().getTime(),
  //   };
  //   this.updateM.willUpdate(data);
  //   this.setClass(true, this.userClass.get().userId);
  // }

  delete(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .delete(this.collection, id)
        .then(() => {
          // this.up();
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  reset() {
    this.value = [];
  }

  fillMyChats() {
    let result = [];
    const myId = this.userClass.get().userId;
    for (const a of this.get()) {
      for (const id of a.users) {
        if (id !== myId) {
          result[id] = a;
        }
      }
    }
    this.finder = result;
  }

  find(id: string) {
    return this.finder[id] ? this.finder[id] : null;
  }

  setClass(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAllMy(id)
        .then((http) => {
          this.set(http);
          this.setCache(http);
          this.subAll.unsubscribe();
          resolve(http);
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  }
}
