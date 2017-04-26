import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { ScalingMath } from '../utils/scaling-math';
import { SwarmsynthComponent } from '../swarmsynth/swarmsynth.component';
import { KnobComponent } from '../knob/knob.component';

@Component({
  selector: 'envelope-control',
  template: `
  		<knob [turnValue]='getTurnValue("attack")' 
		(turnValueChange)='setFromKnob($event, "attack")'
		(valChange)='setParam($event, "attack")'
		[(boxValue)] = "attack">A</knob>

		<knob [turnValue]='getTurnValue("decay")' 
		(turnValueChange)='setFromKnob($event, "decay")'
		(valChange)='setParam($event, "decay")'
		[(boxValue)] = "decay">D</knob>

		<knob [turnValue]='getTurnValue("sustain")' 
		(turnValueChange)='setFromKnob($event, "sustain")'
		(valChange)='setParam($event, "sustain")'
		[(boxValue)] = "sustain">S</knob>

		<knob [turnValue]='getTurnValue("release")' 
		(turnValueChange)='setFromKnob($event, "release")'
		(valChange)='setParam($event, "release")'
		[(boxValue)] = "release">R</knob>

  `
})


export class EnvelopeControlComponent implements OnInit {
	@Output() att = new EventEmitter<any>();
	@Output() dec = new EventEmitter<any>();
	@Output() sus = new EventEmitter<any>();
	@Output() rel = new EventEmitter<any>();

	attack:number=0;
	decay:number=0;
	sustain:number=0;
	release:number=0;

	scalingMath: ScalingMath;
	scalingMap: any;	

  	constructor() {
  		this.scalingMath = new ScalingMath;
  		this.scalingMap={
  			'attack': ['expScale', 'revExpScale', 10, 2], 
  			'decay': ['expScale', 'revExpScale', 5, 1],
  			'sustain': ['expScale', 'revExpScale', 1, 3],
  			'release':['expScale', 'revExpScale', 5, 2]
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
  			case "attack":
  				this.att.emit(val);
  				break;

  			case "decay":
  				this.dec.emit(val);
  				break;

  			case "sustain":
  				this.sus.emit(val);
  				break;

  			case "release":
  				this.rel.emit(val);
  				break;
  			
  			default:
  				break;
  		}
  	}

  ngOnInit() {

  }

}
