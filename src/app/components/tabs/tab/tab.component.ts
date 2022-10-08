import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  public tabs = [
    {
      name: 'Home',
      icon: 'search-sharp',
      path: 'home',
      active: false,
    },
    {
      name: 'Eventos',
      icon: 'people-outline',
      path: 'events-user-home',
      active: false,
    },
    {
      name: 'Novos',
      icon: 'add-sharp',
      path: 'matchs-home',
      active: false,
      special: true,
    },
    {
      name: 'Conveniência',
      icon: 'chatbox-ellipses-outline',
      path: 'matchs-home',
      active: false,
    },
    {
      name: 'Perfil',
      icon: 'person-outline',
      path: 'profile-home',
      active: false,
    },
  ];

  constructor(private navigation: NavigationService, private router: Router) {
    this.activeTab();
  }

  goTo(url: string) {
    this.navigation.goTo(url);
  }

  activeTab() {
    for (const a of this.tabs) {
      if (this.router.url === '/' + a.path) {
        a.active = true;
      } else {
        a.active = false;
      }
    }
  }

  getCustomCss(item) {
    if (item.special) {
      return 'special';
    } else {
      if (item.active === true) {
        return 'active';
      } else {
        return 'non-active';
      }
    }
  }
}
