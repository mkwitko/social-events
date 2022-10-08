import { Component, OnInit } from '@angular/core';
import { UserClass } from 'src/app/classes/users/user';
import { Match } from 'src/app/interfaces/match/match';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-matchs-home',
  templateUrl: './matchs-home.page.html',
  styleUrls: ['./matchs-home.page.scss'],
})
export class MatchsHomePage {
  constructor(
    public userClass: UserClass,
    private navigation: NavigationService
  ) {}

  goTo(match: Match) {
    this.navigation.rotaId('matchs-details', match.with, match.eventId);
  }
}
