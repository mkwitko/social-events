import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item;
  @Input() checkin = false;
  constructor(private nav: NavigationService) {}

  ngOnInit() {}

  goTo(id) {
    this.nav.rotaId('events-user-details', id);
  }
}
