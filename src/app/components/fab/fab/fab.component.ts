import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent {
  @Input() url;
  constructor(private navigation: NavigationService) {}

  goTo() {
    this.navigation.goTo(this.url + '-details');
  }
}
