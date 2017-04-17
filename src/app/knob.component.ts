import { Component, OnChanges, HostListener, EventEmitter, Input, Output, ElementRef} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Debounce } from './debounce.directive';

@Component({
	  selector: 'knob',
	    template: `
			<div class="knob" (mousedown)='initiateDrag($event)'>
				<label><ng-content></ng-content></label>					
				<div class="body">
					<div class="pointer"></div>
				</div>
				<input type="text" [ngModel]='boxValue' debounce [delay]= "700" (func)="boxChange($event)"/>
			</div>
		  	`,
			styleUrls:['./knob.component.css']
})

export class KnobComponent implements OnChanges {
	private mouseDown : boolean = false;
	@Input() turnValue:number;
	@Output() turnValueChange= new EventEmitter<number>();

	@Input() boxValue:number;
    @Output() valChange = new EventEmitter();


    boxChange(val) {
      this.valChange.emit(val);
    }

	prevTurnValue:number;
	turnStart:number;
	knob:any;
	
	constructor(private elRef:ElementRef) {}

	@HostListener('window:mouseup')
	onmouseup(){
		console.log('clicked knob off');
		this.mouseDown = false;
	}
	
	initiateDrag($event){
		this.mouseDown=true;
		console.log('initiating drag');
		this.prevTurnValue=this.turnValue;
		this.turnStart=$event.clientY;

	}

	rotateKnob(){
		this.knob.style.transform = 'rotate(' + this.turnValue + 'deg)';
	}

	@HostListener('window:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if(this.mouseDown) {
           let turn = event.clientY;
           let currTurn=this.prevTurnValue - turn + this.turnStart;

           if(currTurn>-150&&currTurn<150){ 
           		this.turnValue=currTurn;
           		this.rotateKnob();
           		this.turnValueChange.emit(this.turnValue);
           	}
        }
	}

	ngAfterViewInit() {
	    this.knob = this.elRef.nativeElement.querySelector('.body');
	    this.rotateKnob();
	}

	ngOnChanges(val){
		if(this.knob) this.rotateKnob();
	}

}
