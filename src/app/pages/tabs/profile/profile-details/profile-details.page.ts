import { UuidService } from './../../../../services/uuid/uuid.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UserClass } from 'src/app/classes/users/user';
import { Component, OnInit } from '@angular/core';
import { ImageBinaryService } from 'src/app/services/image-binary/image-binary.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage {
  public url = 'profile-home';
  public file;
  private base64;

  constructor(
    public userClass: UserClass,
    public convert: ImageBinaryService,
    private navigation: NavigationService,
    private uuid: UuidService
  ) {}

  choose(event) {
    const uuid = this.uuid.get();
    const picture = event.target.files;
    this.userClass.upload(uuid, picture).then((res) => {
      let user = this.userClass.get();
      user.avatar = res;
      this.userClass.update(user);
    });
  }

  salvar() {}

  back() {
    this.navigation.goTo(this.url);
  }
}
