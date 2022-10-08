import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UserClass } from 'src/app/classes/users/user';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.page.html',
  styleUrls: ['./profile-home.page.scss'],
})
export class ProfileHomePage {
  public url = 'profile-details';
  constructor(
    public userClass: UserClass,
    private navigation: NavigationService,
    private auth: AuthService,
    private alertController: AlertController
  ) {}

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  logout() {
    this.auth.logout();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.userClass.delete(this.userClass.get().userId);
          },
        },
      ],
    });

    await alert.present();
  }
}
