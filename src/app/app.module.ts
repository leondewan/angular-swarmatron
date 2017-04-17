import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FilterControlComponent } from './filter-control.component';
import { SwarmsynthComponent } from './swarmsynth.component';
import { KnobComponent } from './knob.component';
import { Debounce } from './debounce.directive';

@NgModule({
  declarations: [
    AppComponent,
    FilterControlComponent,
    SwarmsynthComponent,
    KnobComponent,
    Debounce
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
