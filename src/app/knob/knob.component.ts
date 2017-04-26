import { Component, OnChanges, HostListener, EventEmitter, Input, Output, ElementRef, Renderer} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Debounce } from '../utils/debounce.directive';

@Component({
	  selector: 'knob',
	    template: `
			<li class="knob" >
				<label><ng-content></ng-content></label>					
				<div class="body" (mousedown)='initiateDrag($event)'
			(touchstart) = 'initiateDrag($event)'>
					<div class="pointer"></div>
				</div>
				<input type="text" [ngModel]='boxValue' debounce [delay]= "700" 
				(func)="boxChange($event)"
				(click)="$event.stopPropagation()"/>
			</li>
		  	`,
			styleUrls:['./knob.component.css']
})

export class KnobComponent implements OnChanges {
	private mouseDown : boolean = false;
	private touchStarted : boolean = false;

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
	
	constructor(private elRef:ElementRef, private renderer:Renderer) {}

/*
	function isTextInput(node) {
    return ['INPUT', 'TEXTAREA'].indexOf(node.nodeName) !== -1;
}

document.addEventListener('touchstart', function(e) {
    if (!isTextInput(e.target) && isTextInput(document.activeElement)) {
        document.activeElement.blur();
    }
}, false);*/

	@HostListener('window:touchstart', ['$event'])
	onTouchEvent(event:TouchEvent){
		//console.log(event.target);
		//document.activeElement.blur();
		this.renderer.invokeElementMethod(
     this.elRef.nativeElement.ownerDocument.activeElement, 'blur');
	}

	@HostListener('window:mouseup')
	onmouseup(){
		this.mouseDown = false;
	}

	@HostListener('window:touchend')
	ontouchend(){
		this.touchStarted = false;
	}
	
	initiateDrag($event){
		this.mouseDown=true;
		this.touchStarted=true;
		console.log('initiating drag');
		$event.preventDefault();
		this.prevTurnValue=this.turnValue;
		if($event.touches) this.turnStart=$event.changedTouches[0].clientY;
		else this.turnStart=$event.clientY;

	}

	/*stopProp(event){
		event.stopPropagation();
	}*/

	rotateKnob(){
		if(this.turnValue>150) this.turnValue=150;
		if(this.turnValue<-150) this.turnValue=-150;
		this.knob.style.transform = 'rotate(' + this.turnValue + 'deg)';
	}

	@HostListener('window:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if(this.mouseDown) {
    		this.turnKnob(event);
        }
	}

	@HostListener('window:touchmove', ['$event'])
    onTouchmove(event: TouchEvent) {
        if(this.touchStarted) {
    		this.turnKnob(event.changedTouches[0]);
        }
	}

	turnKnob(event){
		let turn = event.clientY;
       	let currTurn=this.prevTurnValue - turn + this.turnStart;

       	if(currTurn>=-150&&currTurn<=150){ 
       		this.turnValue=currTurn;
       		this.rotateKnob();
       		this.turnValueChange.emit(this.turnValue);
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
