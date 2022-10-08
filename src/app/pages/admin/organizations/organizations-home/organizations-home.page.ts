import { AuthService } from 'src/app/services/firebase/auth.service';
import { Organizations } from './../../../../classes/organizations/organizations';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-organizations-home',
  templateUrl: './organizations-home.page.html',
  styleUrls: ['./organizations-home.page.scss'],
})
export class OrganizationsHomePage {
  public url = 'organizations';

  constructor(
    public organization: Organizations,
    private alertController: AlertController,
    private authService: AuthService
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

  delete(item, storage) {
    this.organization.delete(item.id).then(() => {
      if (storage) {
        this.organization.deleteFromStorage(item.id);
      }
    });
  }
}
