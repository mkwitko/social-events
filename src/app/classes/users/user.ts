import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { User } from 'src/app/interfaces/auth/user';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { UpdateManagerClass } from '../managers/update-manager';
import { Like } from 'src/app/interfaces/like/like';
import { Chat } from '../chats/chat';

@Injectable()
export class UserClass {
  private received: Array<Like>;
  private interactions: Array<Like>;
  private users: Array<User>;
  private usersFinder: Array<User>;
  private userInfo: User;
  private userInfoEdit: User;
  private cachePath = environment.global.cachePath.users;
  private cachePathAll = environment.global.cachePath.allUsers;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.firebasePath.users;
  private interfaceRef: User;
  private anon = false;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private updateM: UpdateManagerClass
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  hardReset() {
    for (const a of this.users) {
      let change = false;
      if (a.likesReceived && a.likesReceived.length > 0) {
        a.likesReceived = [];
        change = true;
      }
      if (a.likesSended && a.likesSended.length > 0) {
        a.likesSended = [];
        change = true;
      }
      if (a.dislikesReceived && a.dislikesReceived.length > 0) {
        a.dislikesReceived = [];
        change = true;
      }
      if (a.disikesSended && a.disikesSended.length > 0) {
        a.disikesSended = [];
        change = true;
      }
      if (a.Matchs && a.Matchs.length > 0) {
        a.Matchs = [];
        change = true;
      }
      if (change) {
        this.update(a);
      }
    }
  }

  getCollection() {
    return this.collection;
  }

  getAllHttp() {
    return new Promise((resolve) => {
      this.crud.getAll(this.collection).subscribe({
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
          this.set(res);
          this.setEdit(res);
          this.setCache(res);
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getCache(path = this.cachePath): Promise<any> {
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
    return this.userInfo;
  }

  getEdit() {
    return this.userInfoEdit;
  }

  getAnon() {
    return this.anon;
  }

  getAll() {
    return this.users;
  }

  fillAll() {
    this.usersFinder = [];
    for (const a of this.users) {
      this.usersFinder[a.userId] = a;
    }
  }

  fillInteractions() {
    let interactions = [];
    if (this.get().likesSended) {
      for (const a of this.get().likesSended) {
        interactions[a.to] = a;
      }
    }
    if (this.get().disikesSended) {
      for (const a of this.get().disikesSended) {
        interactions[a.to] = a;
      }
    }
    this.interactions = interactions;
  }

  fillReceived() {
    let interactions = [];
    if (this.get().likesReceived) {
      for (const a of this.get().likesReceived) {
        interactions[a.from] = a;
      }
    }
    this.received = interactions;
  }

  pushInteraction(interaction: Like) {
    this.interactions[interaction.to] = interaction;
  }

  findInteractions(id) {
    return this.interactions[id];
  }

  findReceived(id) {
    return this.received[id];
  }

  findNonInteractions(all: Array<User>) {
    let result = [];
    for (const a of all) {
      if (!this.findInteractions(a.userId)) {
        result.push(a);
      }
    }
    return result;
  }

  finder(id) {
    if (this.usersFinder[id]) {
      return this.usersFinder[id];
    } else {
      return null;
    }
  }

  setCache(value: any, path = this.cachePath): Promise<any> {
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
    this.userInfo = value;
    if (this.get() === undefined) {
      this.setAnon(true);
    } else {
      this.setAnon(false);
      this.fillInteractions();
      this.fillReceived();
    }
  }

  setEdit(value) {
    this.userInfoEdit = value;
  }

  setPicture(value) {
    this.userInfoEdit.avatar = value;
  }

  setAllUsers(value) {
    this.users = value;
    this.fillAll();
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

  upload(id, file): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .upload(id, file, this.ref, this.userInfo.userId)
        .then((res) => {
          resolve(res);
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

  up() {
    const data: UpdateInterface = {
      Usuarios: new Date().getTime(),
    };
    this.updateM.willUpdate(data);
    this.setAll(true);
  }

  reset() {
    this.userInfo = null;
  }

  resetEdit() {
    this.userInfoEdit = null;
  }

  setAll(shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache(this.cachePathAll).then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((res) => {
              this.setAllUsers(res);
              this.setCache(res, this.cachePathAll);
              resolve(res);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.setAllUsers(cache);
          resolve(cache);
        }
      });
    });
  }

  setSingle(id, shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache || shouldUpdate) {
          this.getHttp(id)
            .then((http) => {
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          resolve(cache);
        }
      });
    });
  }

  // setSingle(id, shouldUpdate: boolean): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.getCache().then((cache) => {
  //       if (!cache || shouldUpdate) {
  //         this.getHttp(id)
  //           .then((http) => {
  //             this.set(http);
  //             this.setEdit(http);
  //             this.setCache(http);
  //             resolve(http);
  //           })
  //           .catch((err) => {
  //             console.warn(err);
  //             reject(err);
  //           });
  //       } else {
  //         this.set(cache);
  //         this.setEdit(cache);
  //         resolve(cache);
  //       }
  //     });
  //   });
  // }

  add(user: User, id: string, withDate = true) {
    if (withDate) {
      user.userCreatedAt = Date.now();
    }
    this.crud.addUser(this.collection, user, id).then(() => {
      this.up();
    });
  }

  update(user: User, id?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, user, id ? id : user.userId)
        .then((res) => {
          this.up();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setAnon(bool) {
    if (bool) {
      this.userInfo = {
        userEmail: 'Venha fazer parte da Papada!',
        userName: 'Usuário anônimo',
      };
    }
    this.anon = bool;
  }
}
