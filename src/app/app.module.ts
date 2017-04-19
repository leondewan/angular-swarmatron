import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FilterControlComponent } from './filter-control/filter-control.component';
import { SwarmsynthComponent } from './swarmsynth/swarmsynth.component';
import { KnobComponent } from './knob/knob.component';
import { Debounce } from './utils/debounce.directive';
import { PitchRibbonComponent } from './pitch-ribbon/pitch-ribbon.component';
import { SwarmRibbonComponent } from './swarm-ribbon/swarm-ribbon.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterControlComponent,
    SwarmsynthComponent,
    KnobComponent,
    Debounce,
    PitchRibbonComponent,
    SwarmRibbonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
