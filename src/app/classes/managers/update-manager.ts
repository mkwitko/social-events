import { UpdateInterface } from './../../interfaces/update/update-interface';
import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { isObject } from 'util';

@Injectable()
export class UpdateManagerClass {
  private oldValue;
  private value;
  private cachePath = environment.global.managers.update;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.managers.update;
  private any: any;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getAllHttp(): Promise<any> {
    return new Promise((resolve) => {
      this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          resolve(res[0]);
        },
        error: (err) => {
          console.warn(err);
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

  getOld() {
    return this.oldValue;
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

  setOld(value) {
    this.oldValue = value;
  }

  reset() {
    this.value = [];
  }

  checkUpdate(http, cache) {
    console.log(http, cache);
    if (cache) {
      for (const a in http) {
        if (cache[a] !== http[a]) {
          return true;
        }
      }
    }
    return false;
  }

  setClass(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache()
        .then((cache: UpdateInterface) => {
          this.setOld(cache);
          this.getAllHttp()
            .then((http: UpdateInterface) => {
              console.log('my http', http);
              this.set(http);
              this.setCache(http);
              if (this.checkUpdate(this.get(), this.getOld())) {
                resolve(this.get());
              } else {
                resolve(false);
              }
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
