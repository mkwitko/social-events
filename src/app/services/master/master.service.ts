import { Organizations } from './../../classes/organizations/organizations';
import { UpdateManagerClass } from 'src/app/classes/managers/update-manager';
import { Injectable } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { UpdateInterface } from 'src/app/interfaces/update/update-interface';
import { UpdateBoolean } from 'src/app/interfaces/update/update-bool';
import { EventsClass } from 'src/app/classes/events/events';
import { User } from 'src/app/interfaces/auth/user';
import { Chat } from 'src/app/classes/chats/chat';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    public updateManager: UpdateManagerClass,
    private userClass: UserClass,
    private organization: Organizations,
    private events: EventsClass,
    private chats: Chat
  ) {}

  makeUpdate(shouldUpdate) {
    let data: UpdateInterface = {};
    for (const a in shouldUpdate) {
      const obj = shouldUpdate[a];
      if (a !== 'id') {
        data[a] = obj;
      }
    }
    return data;
  }

  checkUpdate(shouldUpdate: UpdateInterface): Promise<any> {
    return new Promise((resolve) => {
      const data = this.makeUpdate(shouldUpdate);
      let shouldUpdateFinal: any = [];
      const oldData = this.updateManager.getOld();
      if (oldData && Object.keys(data).length > 0) {
        data.Usuarios !== oldData.Usuarios
          ? (shouldUpdateFinal.Usuarios = true)
          : (shouldUpdateFinal.Usuarios = false);
        data.Orgs !== oldData.Orgs
          ? (shouldUpdateFinal.Orgs = true)
          : (shouldUpdateFinal.Orgs = false);
        data.Events !== oldData.Events
          ? (shouldUpdateFinal.Events = true)
          : (shouldUpdateFinal.Events = false);
        resolve(shouldUpdateFinal);
      } else {
        resolve(false);
      }
    });
  }

  set(userId) {
    this.updateManager.setClass().then((shouldUpdate: UpdateInterface) => {
      this.checkUpdate(shouldUpdate).then((res: UpdateBoolean) => {
        this.userClass.setAll(shouldUpdate !== false ? res.Usuarios : false);
        this.userClass.setSingle(userId, true).then((user: User) => {
          this.chats.setClass(userId);
          this.events.setClass(shouldUpdate !== false ? res.Events : false);
          if (user.role === 3) {
            this.organization.setClass(
              shouldUpdate !== false ? res.Orgs : false
            );
          }
        });
      });
    });
  }
}
