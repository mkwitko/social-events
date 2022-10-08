import { ShuffleService } from './../../../services/shuffle/shuffle.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { UserClass } from 'src/app/classes/users/user';
import { EventsClass } from 'src/app/classes/events/events';
import { Component } from '@angular/core';
import { EventsInt } from 'src/app/interfaces/events/events-int';
import { Likes } from 'src/app/classes/likes/likes';

@Component({
  selector: 'app-swipe-home',
  templateUrl: './swipe-home.page.html',
  styleUrls: ['./swipe-home.page.scss'],
})
export class SwipeHomePage {
  public event: EventsInt;
  public swipe;
  public show;
  constructor(
    private eventClass: EventsClass,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private shuffle: ShuffleService,
    private likeClass: Likes
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.id && this.eventClass.get().length > 0) {
        this.event = this.eventClass.finder(params.id);
        this.swipe = this.eventClass.fillSwipe(this.event);
        this.swiper();
      } else {
        this.back();
      }
    });
  }

  like() {
    this.likeClass.like(this.show, this.event).then(() => {
      this.swiper();
    });
  }

  dislike() {
    this.likeClass.dislike(this.show, this.event).then(() => {
      this.swiper();
    });
  }

  swiper() {
    this.show = this.get();
  }

  get() {
    return this.shuffle.shuffle(this.swipe, this.event);
  }

  back() {
    this.navigation.goTo('home');
  }
}
