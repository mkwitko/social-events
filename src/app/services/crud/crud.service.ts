import { MasterService } from './../master/master.service';
import { UpdateManagerClass } from 'src/app/classes/managers/update-manager';
import { User } from 'src/app/interfaces/auth/user';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ScreenService } from '../screen/screen.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '../translate/translate.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private screen: ScreenService,
    private translate: TranslateService
  ) {}

  collectionConstructor<T>(name) {
    return this.afs.collection<T>(name);
  }

  getAll(collection: AngularFirestoreCollection) {
    return collection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getLimit(path, length, limit, page = 1) {
    let startAfter = length;
    if (page > 1) {
      startAfter = length - (page - 1) * limit;
    }
    return this.afs
      .collection(path, (ref) =>
        ref.limit(limit).orderBy('index', 'desc').startAfter(startAfter)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  get<T>(collection: AngularFirestoreCollection, yourInterface: T, id: string) {
    return collection.doc<typeof yourInterface>(id).valueChanges();
  }

  addUser(
    collection: AngularFirestoreCollection,
    yourAsset: User,
    uid: string
  ) {
    return collection.doc(uid).set({
      userId: yourAsset.userId ? yourAsset.userId : uid,
      userEmail: yourAsset.userEmail ? yourAsset.userEmail : '',
      userName: yourAsset.userName ? yourAsset.userName : '',
      userCreatedAt: yourAsset.userCreatedAt ? yourAsset.userCreatedAt : '',
      role: 1,
    });
  }

  add<T>(collection: AngularFirestoreCollection, yourAsset: T): Promise<any> {
    return new Promise((resolve, reject) => {
      return collection
        .add(yourAsset)
        .then((res) => {
          // this.screen.presentToast(
          //   'Adicionado com sucesso',
          //   'Sucesso!',
          //   'sucess'
          // );
          resolve(res);
        })
        .catch((err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
          reject(err);
        });
    });
  }

  update<T>(collection: AngularFirestoreCollection, yourAsset: T, id: string) {
    return new Promise((resolve, reject) => {
      return collection
        .doc<any>(id)
        .update(yourAsset)
        .then((res) => {
          // this.screen.presentToast(
          //   'Atualizado com sucesso',
          //   'Sucesso!',
          //   'sucess'
          // );
          resolve(res);
        })
        .catch((err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
          reject(err);
        });
    });
  }

  delete(collection: AngularFirestoreCollection, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return collection
        .doc(id)
        .delete()
        .then((res) => {
          // this.screen.presentToast(
          //   'Deletado com sucesso',
          //   'Sucesso!',
          //   'sucess'
          // );
          resolve(res);
        })
        .catch((err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
          reject(err);
        });
    });
  }

  //******* Uploads ******//

  async upload(
    bannerId: string,
    file: string,
    storageFolder: string,
    userId: string
  ): Promise<any> {
    await this.screen.presentLoading();
    return new Promise((resolve, reject) => {
      if (file && file.length > 0) {
        try {
          this.storage
            .ref(storageFolder)
            .child(userId)
            .child(bannerId)
            .put(file[0])
            .then(() => {
              this.screen.dismissloading();
              resolve(
                this.storage
                  .ref(storageFolder + '/' + userId + '/' + bannerId)
                  .getDownloadURL()
                  .toPromise()
              );
            })
            .catch((error) => {
              this.screen.dismissloading();
              console.log(error);
              reject(false);
            });
        } catch (error) {
          this.screen.dismissloading();
          console.log(error);
          reject(false);
        }
      } else {
        this.screen.dismissloading();
        console.log('Else ');
        reject(false);
      }
    });
  }

  async deleteFireStorage(ref: string) {
    const photoRef = this.storage.refFromURL(ref);
    await this.screen.presentLoading();
    try {
      await photoRef.delete();
      this.screen.dismissloading();
    } catch (error) {
      this.screen.presentToast(error.message);
      this.screen.dismissloading();
    }
  }
}
