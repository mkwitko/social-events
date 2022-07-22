import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Component } from '@angular/core';
import { BannerClass } from 'src/app/classes/banners/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent{

  bannerOpts = {
    autoplay: true,
    speed: 1200
  };

  constructor(
    public bannerClass: BannerClass,
    private navigation: NavigationService
  ) { }

  away(url: string)
  {
    this.navigation.away(url);
  }
}
