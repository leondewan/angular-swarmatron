import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ScalingMath } from '../utils/scaling-math';
import { SwarmsynthComponent } from '../swarmsynth/swarmsynth.component';
import { KnobComponent } from '../knob/knob.component';

@Component({
	selector: 'drive',
	template: `
		
		<knob [turnValue]='getTurnValue()' 
		(turnValueChange)=setFromKnob($event)
		(valChange)=setDrive($event)
		[(boxValue)] = "dr">DR</knob>
        `
})

export class Drive {

	@Output() drive = new EventEmitter<any>();

	scalingMath: ScalingMath;

	dr: number=0;

	//cut q track
	
	getTurnValue(){
		return this.scalingMath.revLinScale(this.dr, 400);
	}

	getDr(){
		return this.dr;
	}

	setFromKnob(value){
		let dvalue = this.scalingMath['linScale'](value, 400);
		this.setDrive(dvalue);
	}

	setDrive(value) {
		this.dr=value;
		this.drive.emit(this.dr);
	}

	

	constructor(){
		this.scalingMath = new ScalingMath;
	}

}