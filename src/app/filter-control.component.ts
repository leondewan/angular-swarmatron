import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ScalingMath } from './scaling-math';
import { SwarmsynthComponent } from './swarmsynth.component'
import { KnobComponent } from './knob.component';

@Component({
	selector: 'filter-control',
	template: `
		<knob [turnValue]='getCutTurnValue()' 			
		(turnValueChange)=setCutFromKnob($event)
		(valChange) = setCutoff($event)
		[(boxValue)] = "cutoff">FRQ</knob>
		<br />

		<knob [turnValue]='getQTurnValue()' 
		(turnValueChange)=setQFromKnob($event)
		(valChange)=setQ($event)
		[(boxValue)] = "q">Q</knob>
        `
})


export class FilterControlComponent {

	@Output() cutval = new EventEmitter<any>();
	@Output() qval = new EventEmitter<any>();

	scalingMath: any;

	cutoff: number=0;
	q: number = 0;
	
	getCutTurnValue(){
		let tvalue=this.scalingMath.revExpScale(this.cutoff, 3000, 1);
		return tvalue;
	}

	setCutFromKnob(value){
		let cvalue = this.scalingMath.expScale(value, 3000, 1);
		this.setCutoff(cvalue);
	}

	setCutoff(value) {
		this.cutoff=value;
		this.cutval.emit(this.cutoff);
	}

	getQTurnValue() {
		let tvalue=this.scalingMath.revLinScale(this.q, 24);
		return tvalue;
	}

	setQFromKnob(value){
		let qvalue=this.scalingMath.linScale(value, 24);
		this.setQ(qvalue);
	}

	setQ(value){
		this.q=value;
		this.qval.emit(this.q);
	}

	constructor(){
		this.scalingMath = new ScalingMath;
	}

}