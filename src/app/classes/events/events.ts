import { Subscription } from 'rxjs';
import { EventsInt } from 'src/app/interfaces/events/events-int';
import { UserClass } from 'src/app/classes/users/user';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { CacheService } from 'src/app/services/cache/cache.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { environment } from 'src/environments/environment';
import { UpdateManagerClass } from '../managers/update-manager';

@Injectable()
export class EventsClass {
  private find;
  private findSwipe;
  private value = new Array<EventsInt>();
  private cachePath = environment.global.cachePath.events;
  private cachePathOrg = environment.global.cachePath.eventsOrg;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.firebasePath.events;
  private interfaceRef: EventsInt;

  private subAll: Subscription;
  private subId: Subscription;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private updateM: UpdateManagerClass,
    private userClass: UserClass
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
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
      this.subId = this.crud
        .get(this.collection, this.interfaceRef, id)
        .subscribe({
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

  getCache(path): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(path)
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

  setCache(value: any, path): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(path, value)
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
  }

  add(object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .add(this.collection, object)
        .then((res) => {
          const obj = object;
          obj.id = res.id;
          this.update(obj, res.id).then(() => {
            this.up();
          });
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  update(object, id?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, object, id ? id : object.id)
        .then(() => {
          this.up();
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  up() {
    const data: UpdateInterface = {
      Events: new Date().getTime(),
    };
    this.updateM.willUpdate(data);
    this.setClass(true);
  }

  delete(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .delete(this.collection, id)
        .then(() => {
          this.up();
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  deleteFromStorage(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .deleteFireStorage(id)
        .then(() => {
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

  fillAll() {
    this.find = [];
    for (const a of this.get()) {
      this.find[a.id] = a;
    }
  }

  fillSwipe(event: EventsInt) {
    this.findSwipe = [];
    for (const a of event.checkin) {
      if (a.userId !== this.userClass.get().userId) {
        this.findSwipe.push(this.userClass.finder(a.userId));
      }
    }
    return this.findSwipe;
  }

  finder(id) {
    return this.find[id];
  }

  findCheckin(event: EventsInt, id) {
    for (const a of event.checkin) {
      if (a.userId === id) {
        return false;
      }
    }
    return true;
  }

  setEvents(shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePath).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http: Array<EventsInt>) => {
              this.set(http);
              this.setCache(http, this.cachePath);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          resolve(cache);
        }
      });
    });
  }

  setEventsOrg(shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePathOrg).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http: Array<EventsInt>) => {
              let result = [];
              if (this.userClass.get().orgId) {
                for (const a of http) {
                  if (a.orgId === this.userClass.get().orgId) {
                    result.push(a);
                  }
                }
              } else {
                result = http;
              }
              this.set(result);
              this.setCache(result, this.cachePathOrg);
              resolve(result);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.set(cache);
          resolve(cache);
        }
      });
    });
  }

  setClass(shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userClass.get().orgId) {
        this.setEventsOrg(shouldUpdate)
          .then(() => {
            this.fillAll();
            if (this.subAll) {
              this.subAll.unsubscribe();
            }
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      } else {
        this.setEvents(shouldUpdate)
          .then(() => {
            this.fillAll();
            if (this.subAll) {
              this.subAll.unsubscribe();
            }
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      }
    });
  }
}
