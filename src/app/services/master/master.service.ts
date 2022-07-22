import { UpdateManagerClass } from 'src/app/classes/managers/update-manager';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    private userClass: UserClass,
    private updateManager: UpdateManagerClass
  ) {}

  setUser(id: string) {
    this.userClass.setClass(id).then((res) => {
      // if (res) {
      //   this.push.init();
      // }
    });
  }

  // makeUpdate(shouldUpdate) {
  //   console.log(shouldUpdate);
  //   let data: UpdateInterface = {};
  //   for (const a in shouldUpdate) {
  //     const obj = shouldUpdate[a];
  //     if (a !== 'id') {
  //       data[a] = obj;
  //     }
  //   }
  //   return data;
  // }

  // checkUpdate(shouldUpdate: UpdateInterface): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const data = this.makeUpdate(shouldUpdate);
  //     console.log(data);
  //     let shouldUpdateFinal: any = [];
  //     const oldData = this.updateManager.getOld();
  //     if (oldData && Object.keys(data).length > 0) {
  //       data.Banner !== oldData.Banner
  //         ? (shouldUpdateFinal.Banner = true)
  //         : (shouldUpdateFinal.Banner = false);

  //       data.Conveniencia !== oldData.Conveniencia
  //         ? (shouldUpdateFinal.Conveniencia = true)
  //         : (shouldUpdateFinal.Conveniencia = false);

  //       data.Elenco !== oldData.Elenco
  //         ? (shouldUpdateFinal.Elenco = true)
  //         : (shouldUpdateFinal.Elenco = false);

  //       data.Noticia !== oldData.Noticia
  //         ? (shouldUpdateFinal.Noticia = true)
  //         : (shouldUpdateFinal.Noticia = false);

  //       data.Playlist !== oldData.Playlist
  //         ? (shouldUpdateFinal.Playlist = true)
  //         : (shouldUpdateFinal.Playlist = false);

  //       data.Propaganda !== oldData.Propaganda
  //         ? (shouldUpdateFinal.Propaganda = true)
  //         : (shouldUpdateFinal.Propaganda = false);

  //       data.PlaylistExclusiva !== oldData.PlaylistExclusiva
  //         ? (shouldUpdateFinal.PlaylistExclusiva = true)
  //         : (shouldUpdateFinal.PlaylistExclusiva = false);
  //       resolve(shouldUpdateFinal);
  //     } else {
  //       resolve(false);
  //     }
  //   });
  // }

  // set() {
  //   this.updateManager.setClass().then((shouldUpdate: UpdateInterface) => {
  //     this.checkUpdate(shouldUpdate).then((res: UpdateBoolean) => {
  //       console.log(res);
  //       this.bannerclass.setClass(shouldUpdate !== false ? res.Banner : false);
  //       this.adClass.setClass(shouldUpdate !== false ? res.Propaganda : false);
  //       this.adconvClass.setClass(
  //         shouldUpdate !== false ? res.Conveniencia : false
  //       );
  //       this.playlistClass.setClass(
  //         shouldUpdate !== false ? res.Playlist : false
  //       );
  //       this.noticiaClass.setClass(
  //         shouldUpdate !== false ? res.Noticia : false
  //       );
  //       this.noticiaLengthClass.setClass(
  //         shouldUpdate !== false ? res.Noticia : false
  //       );
  //       this.elencoClas.setClass(shouldUpdate !== false ? res.Elenco : false);
  //       this.youtubeApi.setClass();
  //     });
  //   });
  //   this.apiFootball.setClass();
  // }
}
