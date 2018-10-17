import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@dm/common/common.module';
import { ConstantsModule } from '@dm/constants/constants.module';
import { CombatModule } from '@dm/combat/combat.module';
import { RoutingModule } from '@dm/routing/routing.module';

import { RootComponent } from '@dm/root/root.component';
import { HeaderComponent } from '@dm/root/header.component';
import { FooterComponent } from '@dm/root/footer.component';

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CombatModule,
    ConstantsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
