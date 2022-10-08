import { EventsClass } from './../../../classes/events/events';
import { UserClass } from 'src/app/classes/users/user';
import { EventsInt } from './../../../interfaces/events/events-int';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.page.html',
  styleUrls: ['./events-details.page.scss'],
})
export class EventsDetailsPage {
  public url = 'events-home';
  public form: FormGroup;
  public isSubmitted = false;

  private object: EventsInt;
  private orgId;

  constructor(
    public formBuilder: FormBuilder,
    private screen: ScreenService,
    private userClass: UserClass,
    private navigation: NavigationService,
    private events: EventsClass
  ) {
    this.orgId = this.userClass.get().orgId;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      when: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      this.screen.presentToast(
        'Por favor, preencha todas informações solicitadas.'
      );
      return false;
    } else {
      this.add(this.make(this.form.value));
    }
  }

  make(value) {
    this.object = value;
    this.object.createdAt = new Date().getTime();
    this.object.orgId = this.orgId;
    return this.object;
  }

  back() {
    this.navigation.goTo(this.url);
  }

  add(object) {
    this.events.add(object).then(() => {
      this.back();
    });
  }
}
