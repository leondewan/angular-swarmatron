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
import { EnvelopeControlComponent } from './envelopes/envelope-control.component';
import { FilterEnvComponent } from './envelopes/filter-env.component';
import { Drive } from './drive/drive.component'
import { Volume } from './volume/volume.component'
import { PushSwitchComponent } from './switches/push-switch.component'
import { ToggleSwitchComponent } from './switches/toggle-switch.component'

@NgModule({
  declarations: [
    AppComponent,
    FilterControlComponent,
    SwarmsynthComponent,
    KnobComponent,
    Debounce,
    PitchRibbonComponent,
    SwarmRibbonComponent,
    EnvelopeControlComponent,
    FilterEnvComponent,
    Drive,
    Volume,
    PushSwitchComponent,
    ToggleSwitchComponent
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
