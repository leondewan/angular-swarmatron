import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { ScalingMath } from '../utils/scaling-math';
import { SwarmsynthComponent } from '../swarmsynth/swarmsynth.component';
import { KnobComponent } from '../knob/knob.component';

@Component({
  selector: 'filter-env',
  template: `
  		<knob [turnValue]='getTurnValue()' 
		(turnValueChange)='setFromKnob($event)'
		(valChange)='setEnv($event)'
		[(boxValue)] = "filtern">N</knob>
  `
})


export class FilterEnvComponent implements OnInit {
	@Output() filterN = new EventEmitter<any>();

	filtern:number=0;

	scalingMath: ScalingMath;

  	constructor() {
  		this.scalingMath = new ScalingMath;
  	}

  	getTurnValue(){
  		return this.scalingMath.revLinScale(this.filtern, 1);
  	}

  	setFromKnob(value){
  		let val=this.scalingMath.linScale(value, 1);
		  this.setEnv(val);
  	}

  	setEnv(val){ 
  		this.filtern=val;
  		this.filterN.emit(val);
  		 
  	}

  ngOnInit() {

  }

}
