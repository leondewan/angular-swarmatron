import { Component, EventEmitter, Input, Output, ViewChild, ElementRef} from '@angular/core';

	@Component({
		selector: 'push-switch',
		template:`
			<div #pswitch class="pushswitch pushed on" (click)="this.toggleVoice($event)"
			(touchstart)="this.toggleVoice($event)"></div>
		`,

		styles:[` 
			.pushswitch{
				width:40px;
				height:40px;
				background:#bcb;
				border:2px #dee outset;
				border-radius:5px;
			}

			.pushswitch.pushed {
				border:2px #eee inset;
			}

			.pushswitch.on{
				background:radial-gradient(circle, #ff0,#9f9,#aaa);
				transition-property: background;
			    transition-duration: 5s;
			    transition-timing-function: linear;
			}
		`]

	})

export class PushSwitchComponent {
	voiceOn: boolean = true;

	@Input() 'powered': boolean;

	@ViewChild('pswitch') pushSwitch:ElementRef;



	@Output() pushVal = new EventEmitter<number>();


	toggleVoice(event){
		event.preventDefault();
		this.voiceOn=!this.voiceOn;

		if(this.voiceOn){
			this.pushSwitch.nativeElement.classList.add('pushed');
			if(this.powered){
				this.pushSwitch.nativeElement.classList.add('on');
				this.pushVal.emit(0.125);
			}

		} else {
			this.pushSwitch.nativeElement.classList.remove('pushed');
			this.pushSwitch.nativeElement.classList.remove('on');
			this.pushVal.emit(0);
		}
	}

	switchOn(){
		this.pushSwitch.nativeElement.classList.add('on');
		this.pushSwitch.nativeElement.classList.add('pushed');
		this.pushVal.emit(0.125);

	}

	switchOff(){
		this.pushSwitch.nativeElement.classList.remove('on');
		this.pushSwitch.nativeElement.classList.remove('pushed');
		this.pushVal.emit(0);
	}

	powerOn() {
		if (this.pushSwitch.nativeElement.classList.contains('pushed')) {
			this.pushSwitch.nativeElement.classList.add('on');
			this.voiceOn=true;
			this.pushVal.emit(0.125);
		} 
	}

	powerOff(){
		this.pushSwitch.nativeElement.classList.remove('on');
		this.voiceOn=false;
		this.pushVal.emit(0);
	}
}	

