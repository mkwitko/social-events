import { UpdateInterface } from './../../interfaces/update/update-interface';
import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { Subscription } from 'rxjs';

@Injectable()
export class UpdateManagerClass {
  private id: string;
  private oldValue;
  private value;
  private cachePath = environment.global.managers.update;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.managers.update;
  private any: any;

  private sub: Subscription;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
    // this.init();
  }

  // Função que inicializa a contagem da atualizacoes no banco de dados
  // Só precisa ser chamada uma vez.

  // init() {
  //   const init: UpdateInterface = {
  //     Orgs: new Date().getTime(),
  //   };
  //   this.crud.add(this.collection, init);
  // }

  getAllHttp(): Promise<any> {
    return new Promise((resolve) => {
      this.sub = this.crud.getAll(this.collection).subscribe({
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

  getId() {
    return this.id;
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

  setId(value) {
    this.id = value;
  }

  reset() {
    this.value = [];
  }

  checkUpdate(http, cache) {
    if (cache) {
      for (const a in http) {
        if (cache[a] !== http[a]) {
          return true;
        }
      }
    }
    return false;
  }

  willUpdate(data) {
    this.crud.update(this.collection, data, this.id);
  }

  setClass(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache()
        .then((cache: UpdateInterface) => {
          this.setOld(cache);
          this.getAllHttp()
            .then((http: UpdateInterface) => {
              let result: any;
              result = http;
              this.setId(result.id);
              this.set(http);
              this.setCache(http);
              if (this.sub) {
                this.sub.unsubscribe();
              }
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
