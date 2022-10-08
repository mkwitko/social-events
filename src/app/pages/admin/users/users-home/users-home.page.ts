import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserClass } from 'src/app/classes/users/user';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.page.html',
  styleUrls: ['./users-home.page.scss'],
})
export class UsersHomePage {
  public url = 'users';

  constructor(
    public user: UserClass,
    private alertController: AlertController,
    private navigation: NavigationService
  ) {}

  async alert(item, storage = false) {
    const alert = await this.alertController.create({
      header: 'Você tem certeza que deseja realizar esta ação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.delete(item, storage);
          },
        },
      ],
    });

    await alert.present();
  }

  goTo(item) {
    this.navigation.rotaId(this.url + '-details', item.id);
  }

  delete(item, storage) {
    this.user.delete(item.id).then(() => {
      if (storage) {
        this.user.deleteFromStorage(item.id);
      }
    });
  }
}
