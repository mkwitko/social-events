import { AdClass } from './../../../classes/ads/ad';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent{

  @Input() ads;

  adOpts = {
    allowTouchMove: false
  };

  constructor(
    private navigation: NavigationService
  ) { }

  goTo(url: string)
  {
    this.navigation.goTo(url);
  }

  away(url: string)
  {
    this.navigation.away(url);
  }


}
