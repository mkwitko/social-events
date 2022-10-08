import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserClass } from './classes/users/user';
import { CrudService } from './services/crud/crud.service';
import { AuthService } from './services/firebase/auth.service';
import { MasterService } from './services/master/master.service';
import { MenuService } from './services/menu/menu.service';
import { NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public itens = [
    {
      nome: 'Home',
      icone: 'home-sharp',
      url: 'home',
      disabled: 'false',
    },
    {
      nome: 'Organizações',
      icone: 'home-sharp',
      url: 'organizations-home',
      disabled: 'false',
      role: 3,
    },
    {
      nome: 'Usuários',
      icone: 'home-sharp',
      url: 'users-home',
      disabled: 'false',
      role: 3,
    },
    {
      nome: 'Eventos',
      icone: 'home-sharp',
      url: 'events-home',
      disabled: 'false',
      role: 2,
    },
  ];

  public version = environment.global.version;
  constructor(
    public userClass: UserClass,
    private navigation: NavigationService,
    private menu: MenuService,
    private auth: AuthService,
    private master: MasterService,
    private crud: CrudService
  ) {
    this.auth.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.master.set(user.uid);
      }
    });
  }

  goTo(url: string) {
    this.navigation.goTo(url);
    this.menu.closeMenu();
  }

  logout() {
    this.auth.logout();
    this.menu.closeMenu();
  }
}
