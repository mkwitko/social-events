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

@Injectable()
export class Organizations {
  private value = new Array<OrganizationsInt>();
  private cachePath = environment.global.cachePath.org;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.firebasePath.org;
  private interfaceRef: OrganizationsInt;

  private subAll: Subscription;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService,
    private updateM: UpdateManagerClass
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
      Orgs: new Date().getTime(),
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

  setClass(shouldUpdate: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache || shouldUpdate) {
          this.getAllHttp()
            .then((http) => {
              this.set(http);
              this.setCache(http);
              if (this.subAll) {
                this.subAll.unsubscribe();
              }
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
}
