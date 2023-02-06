import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMatchComponent } from './chat-match.component';

@NgModule({
  declarations: [ChatMatchComponent],
  imports: [CommonModule, IonicModule],
  exports: [ChatMatchComponent],
  providers: [],
})
export class MyCustomChatMatch {}
