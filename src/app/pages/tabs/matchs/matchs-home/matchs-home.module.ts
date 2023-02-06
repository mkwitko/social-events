import { MyCustomSubtitle } from './../../../../atoms/subtitle/subtitle.module';
import { MyCustomSearch } from './../../../../components/search/search/search.module';
import { MyCustomHeader } from 'src/app/components/header/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchsHomePageRoutingModule } from './matchs-home-routing.module';

import { MatchsHomePage } from './matchs-home.page';
import { MyCustomTab } from 'src/app/components/tabs/tab/tab.module';
import { MyCustomMatch } from 'src/app/components/matchs/matchs.module';
import { MyCustomChatMatch } from 'src/app/components/chat-match/chat-match.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchsHomePageRoutingModule,
    MyCustomHeader,
    MyCustomTab,
    MyCustomSearch,
    MyCustomSubtitle,
    MyCustomMatch,
    MyCustomChatMatch,
  ],
  declarations: [MatchsHomePage],
})
export class MatchsHomePageModule {}
