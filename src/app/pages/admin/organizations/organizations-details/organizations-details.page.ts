import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { OrganizationsInt } from './../../../../interfaces/organizations/organizations-int';
import { Organizations } from './../../../../classes/organizations/organizations';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organizations-details',
  templateUrl: './organizations-details.page.html',
  styleUrls: ['./organizations-details.page.scss'],
})
export class OrganizationsDetailsPage {
  public url = 'organizations-home';
  public form: FormGroup;
  public isSubmitted = false;

  private object: OrganizationsInt;

  constructor(
    public formBuilder: FormBuilder,
    private screen: ScreenService,
    private organization: Organizations,
    private navigation: NavigationService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
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
    return this.object;
  }

  back() {
    this.navigation.goTo(this.url);
  }

  add(object) {
    this.organization.add(object).then(() => {
      this.back();
    });
  }
}
