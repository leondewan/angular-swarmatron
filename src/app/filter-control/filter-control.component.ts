import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ScalingMath } from '../utils/scaling-math';
import { SwarmsynthComponent } from '../swarmsynth/swarmsynth.component';
import { KnobComponent } from '../knob/knob.component';

@Component({
	selector: 'filter-control',
	template: `
		<knob [turnValue]='getQTurnValue()' 
		(turnValueChange)=setQFromKnob($event)
		(valChange)=setQ($event)
		[(boxValue)] = "q">Q</knob>

		<knob [turnValue]='getCutTurnValue()' 			
		(turnValueChange)=setCutFromKnob($event)
		(valChange) = setCutoff($event)
		[(boxValue)] = "cutoff">FRQ</knob>
        `,
    styles: [`
    	

    `]
})

export class FilterControlComponent{

	@Output() cutval = new EventEmitter<any>();
	@Output() qval = new EventEmitter<any>();

	scalingMath: any;

	cutoff: number=0;
	q: number = 0;
	
	getCutTurnValue(){
		let tvalue=this.scalingMath.revExpScale(this.cutoff, 3000, 1);
		return tvalue;
	}

	getCutoff(){
		return this.cutoff;
	}

	setCutFromKnob(value){
		let cvalue = this.scalingMath.expScale(value, 3000, 1);
		this.setCutoff(cvalue);
	}

	getQTurnValue() {
		let tvalue=this.scalingMath.revLinScale(this.q, 24);
		return tvalue;
	}

	getQ(){
		return this.q;
	}

	setQFromKnob(value){
		let qvalue=this.scalingMath.linScale(value, 24);
		this.setQ(qvalue);
	}


	setCutoff(value) {
		this.cutoff=value;
		this.cutval.emit(this.cutoff);
	}

	setQ(value){
		this.q=value;
		this.qval.emit(this.q);
	}

	constructor(){
		this.scalingMath = new ScalingMath;
	}

}