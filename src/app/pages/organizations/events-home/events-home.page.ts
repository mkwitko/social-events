import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EventsClass } from 'src/app/classes/events/events';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.page.html',
  styleUrls: ['./events-home.page.scss'],
})
export class EventsHomePage {
  public url = 'events';

  constructor(
    public events: EventsClass,
    private alertController: AlertController
  ) {}

  async alert(item, storage = false) {
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
            this.delete(item, storage);
          },
        },
      ],
    });

    await alert.present();
  }

  delete(item, storage) {
    this.events.delete(item.id).then(() => {
      if (storage) {
        this.events.deleteFromStorage(item.id);
      }
    });
  }
}
