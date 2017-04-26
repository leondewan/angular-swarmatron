import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ScalingMath } from '../utils/scaling-math';
import { SwarmsynthComponent } from '../swarmsynth/swarmsynth.component';
import { KnobComponent } from '../knob/knob.component';

@Component({
	selector: 'filter-control',
	template: `
		
		<knob [turnValue]='getTurnValue("track")' 
		(turnValueChange)='setFromKnob($event, "track")'
		(valChange)='setParam($event, "track")'
		[(boxValue)] = "track">T</knob>

		<knob [turnValue]='getTurnValue("q")' 
		(turnValueChange)='setFromKnob($event, "q")'
		(valChange)='setParam($event, "q")'
		[(boxValue)] = "q">Q</knob>

		<knob [turnValue]='getTurnValue("cutoff")' 			
		(turnValueChange)='setFromKnob($event, "cutoff")'
		(valChange) = 'setParam($event, "cutoff")'
		[(boxValue)] = "cutoff">FRQ</knob>
        `
})

export class FilterControlComponent{
	@Output() cutval = new EventEmitter<any>();
	@Output() qval = new EventEmitter<any>();
	@Output() trackval = new EventEmitter<any>();

	scalingMath: ScalingMath;
	scalingMap: any;

	cutoff: number=0;
	q: number = 0;
	track: number = 0;

	//cut q track
	constructor(){
		this.scalingMath = new ScalingMath;
		this.scalingMap={
  			'cutoff':['binScale', 'revBinScale', 156, 6], 
  			'q': ['linScale', 'revLinScale', 24],
  			'track': ['linScale', 'revLinScale', 1]
  		}
	}

	getTurnValue(src){
  		return this.scalingMath[this.scalingMap[src][1]](this[src], this.scalingMap[src][2], this.scalingMap[src][3]);
  	}

  	setFromKnob(value, src){
  		let x=this.scalingMath[this.scalingMap[src][0]](value, this.scalingMap[src][2], this.scalingMap[src][3]);
		this.setParam(x, src);
  	}

  	setParam(val, src){ 
  		this[src]=val;

  		switch (src) {
  			case "cutoff":
  				this.cutval.emit(val);
  				break;

  			case "q":
  				this.qval.emit(val);
  				break;

  			case "track":
  				this.trackval.emit(val);
  				break;
  			
  			default:
  				break;
  		}
  	}

}