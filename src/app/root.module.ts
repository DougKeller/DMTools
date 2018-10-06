import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from '@dm/header/header.module';
import { CommonModule } from '@dm/common/common.module';
import { ConstantsModule } from '@dm/constants/constants.module';
import { CombatModule } from '@dm/combat/combat.module';

import { RootComponent } from '@dm/root/root.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    CommonModule,
    CombatModule,
    ConstantsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
