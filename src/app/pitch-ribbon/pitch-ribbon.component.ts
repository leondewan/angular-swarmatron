import { Component, OnInit, ElementRef, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';

@Component({
  	selector: 'pitch-ribbon',
  	template: `<div #pitchribbon id="pitch-ribbon" 
  	(mousedown) = "startNote($event)" 
  	(mousemove)="sendNote($event)"
    (touchstart)="startNote($event)"
    (touchmove) = "sendNote($event)"></div>`,

  	styleUrls: ['./pitch-ribbon.component.css']
})
export class PitchRibbonComponent implements OnInit {

	@ViewChild('pitchribbon') prib: ElementRef;
	pitchRibbon:any;
	pitchRibbonScale:number;
	pitchRibbonOffset:number;
	centerNote:number;
	pitchStarted:boolean = false;

	@Output() setCenterNote = new EventEmitter<any>();
    @Output() gate = new EventEmitter<any>();

  	constructor() {}

  	setRibbon(){
  		this.pitchRibbon=this.prib.nativeElement;
  		this.pitchRibbonScale=1000/this.pitchRibbon.getBoundingClientRect().width;
  		this.pitchRibbonOffset=this.pitchRibbon.getBoundingClientRect().left;
  	}

    checkRibbonBoundaries(evt) {
        var xpos=evt.clientX,
        ypos=evt.clientY,
        bound=evt.target.getBoundingClientRect();

        if(xpos < bound.left || 
            xpos > bound.right||
            ypos < bound.top ||
            ypos > bound.bottom) {

            return true;
        }
        else return false;
    }  

  	startNote(event){
      event.preventDefault();
  		this.pitchStarted=true;
        
        if(event.touches) this.centerNote=(event.changedTouches[0].clientX-this.pitchRibbonOffset)*this.pitchRibbonScale;  
        else this.centerNote=(event.clientX-this.pitchRibbonOffset)*this.pitchRibbonScale;
        this.setCenterNote.emit(this.centerNote);
        this.gate.emit(1);
  	}

  	sendNote(event){
  		if(this.pitchStarted) {
            if(event.touches){
                if(this.checkRibbonBoundaries(event.changedTouches[0])){
                    this.pitchStarted=false;
                    this.gate.emit(0);
                    return;
                }
                this.centerNote=(event.changedTouches[0].clientX-this.pitchRibbonOffset)*this.pitchRibbonScale;
            }
  			else this.centerNote=(event.clientX-this.pitchRibbonOffset)*this.pitchRibbonScale;
  			this.setCenterNote.emit(this.centerNote);
  		}
  	}

  	@HostListener('mouseup')
  	mouseNoteStop(event){
  		this.pitchStarted=false;
        this.gate.emit(0);
  	}

    @HostListener('touchend')
    touchNoteStop(event){
        this.pitchStarted=false;
        this.gate.emit(0);
      }
  

    @HostListener('mouseout')
    stopNoteLeave(event){
        if(this.pitchStarted) this.gate.emit(0);        
        this.pitchStarted=false;
    }

  	ngOnInit() {
  		this.setRibbon();
  	}

}
