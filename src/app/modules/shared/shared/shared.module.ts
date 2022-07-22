import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClass } from 'src/app/classes/users/user';
import { UpdateManagerClass } from 'src/app/classes/managers/update-manager';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserClass, UpdateManagerClass],
})
export class SharedModule {}
