import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from '@dm/header/header.module';
import { SidebarModule } from '@dm/sidebar/sidebar.module';
import { CommonModule } from '@dm/common/common.module';
import { ConstantsModule } from '@dm/constants/constants.module';
import { CombatModule } from '@dm/combat/combat.module';

import { RootComponent } from '@dm/root/root.component';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    SidebarModule,
    CommonModule,
    CombatModule,
    ConstantsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
