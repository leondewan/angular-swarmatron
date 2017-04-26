import { Component, OnInit, ElementRef, ViewChild, HostListener, EventEmitter, Output  } from '@angular/core';

@Component({
  	selector: 'swarm-ribbon',
  	template: `<div #swarmribbon id="swarm-ribbon"
  	(mousedown) = "startSwarm($event)" 
  	(mousemove)="sendSwarm($event)"
    (touchstart)="startSwarm($event)"
    (touchmove)= "sendSwarm($event)" ></div>`,
  	styleUrls: ['./swarm-ribbon.component.css']
})
export class SwarmRibbonComponent implements OnInit {
	@ViewChild('swarmribbon') srib: ElementRef;
	swarmRibbon:any;
	swarmRibbonScale:number;
	swarmRibbonOffset:number;
	swarmInterval:number;
	
  swarmStarted:boolean = false;

	@Output() setSwarm = new EventEmitter<any>();

  	constructor() { }

  	setRibbon(){
  		this.swarmRibbon=this.srib.nativeElement;
  		this.swarmRibbonScale=125/this.swarmRibbon.getBoundingClientRect().width;
  		this.swarmRibbonOffset=this.swarmRibbon.getBoundingClientRect().left;
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

  	startSwarm(event){
      event.preventDefault();
  		this.swarmStarted=true;
        if(event.touches) this.swarmInterval=(event.changedTouches[0].clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;  
        else this.swarmInterval=(event.clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;
        this.setSwarm.emit(this.swarmInterval);
  	}

  	sendSwarm(event){
  		if (this.swarmStarted) {
            if(event.touches){ 
                if(this.checkRibbonBoundaries(event.changedTouches[0])){
                    this.swarmStarted=false;
                    return;
                }
                this.swarmInterval=(event.changedTouches[0].clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;
            } 
  			else this.swarmInterval=(event.clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;
  			this.setSwarm.emit(this.swarmInterval);
  		}
  	}

  	@HostListener('window:mouseup')
  	stopMouseSwarm(event){
  		this.swarmStarted=false;
  	}

    @HostListener('window:touchend')
    stopTouchSwarm(event){
        this.swarmStarted=false;
      }  

  	ngOnInit() {
  		this.setRibbon();
  	}

}
