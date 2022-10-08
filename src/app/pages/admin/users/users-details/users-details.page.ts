import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organizations } from 'src/app/classes/organizations/organizations';
import { UserClass } from 'src/app/classes/users/user';
import { User } from 'src/app/interfaces/auth/user';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ScreenService } from 'src/app/services/screen/screen.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.page.html',
  styleUrls: ['./users-details.page.scss'],
})
export class UsersDetailsPage {
  public url = 'users-home';
  public form: FormGroup;

  public user: User;
  private object: User;

  constructor(
    public organization: Organizations,
    public formBuilder: FormBuilder,
    private screen: ScreenService,
    private navigation: NavigationService,
    private userClass: UserClass,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id && this.userClass.getAll()) {
        this.user = this.userClass.finder(params.id);
        this.form.patchValue({
          name: this.user.userName ? this.user.userName : '',
          role: this.user.role ? this.user.role : 1,
          orgId: this.user.orgId ? this.user.orgId : '',
        });
      } else {
        this.back();
      }
    });
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      role: [''],
      orgId: [''],
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  submit() {
    if (!this.form.valid) {
      this.screen.presentToast(
        'Por favor, preencha todas informações solicitadas.'
      );
      return false;
    } else {
      this.update(this.make(this.form.value));
    }
  }

  make(value) {
    this.object = value;
    return this.object;
  }

  back() {
    this.navigation.goTo(this.url);
  }

  update(object) {
    this.userClass.update(object, this.user.userId).then(() => {
      this.back();
    });
  }
}
