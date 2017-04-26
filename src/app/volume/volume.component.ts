import { Component, EventEmitter, Output} from '@angular/core';
import { ScalingMath } from '../utils/scaling-math';
import { SwarmsynthComponent } from '../swarmsynth/swarmsynth.component';
import { KnobComponent } from '../knob/knob.component';

@Component({
	selector: 'volume',
	template: `
		
		<knob [turnValue]='getTurnValue()' 
		(turnValueChange)=setFromKnob($event)
		(valChange)=setVolume($event)
		[(boxValue)] = "vol">V</knob>
        `
})

export class Volume {
	@Output() setvol = new EventEmitter<any>();

	scalingMath: ScalingMath;

	vol: number=.75;
	
	getTurnValue(){
		return this.scalingMath.revLinScale(this.vol, 1);
	}

	setFromKnob(value){
		let val = this.scalingMath['linScale'](value, 1);
		this.setVolume(val);
	}

	setVolume(value) {
		this.vol=value;
		this.setvol.emit(this.vol);
	}

	constructor(){
		this.scalingMath = new ScalingMath;
	}

}