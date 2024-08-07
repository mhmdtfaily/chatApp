import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MatchesComponent } from 'src/app/components/matches/matches.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { SettingComponent } from 'src/app/components/setting/setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    

  ],
  declarations: [HomePage, ProfileComponent, SettingComponent, MatchesComponent,]
})
export class HomePageModule {}
