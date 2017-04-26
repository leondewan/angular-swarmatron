import { Component, EventEmitter, Input, Output, ViewChild,  ElementRef} from '@angular/core';

	@Component({
		selector: 'toggle-switch',
		template:`
			<li #tswitch class="toggleswitch on" (click)="this.togglePower($event)"
			(touchstart)="this.togglePower($event)">	
				<label class="top">ON</label>				
				<div class="hexnut">
					<div class="collar">
						<div class="bat"></div>
					</div>
				</div>
				<label class="bottom">OFF</label>
			</li>

		`,

		styleUrls:['./toggle-switch.component.css']

	})

export class ToggleSwitchComponent {
	powerOn: Boolean = true;

	@ViewChild('tswitch') toggleSwitch:ElementRef;

	@Output() toggleVal = new EventEmitter<boolean>();


	togglePower(event){
		event.preventDefault();
		this.powerOn=!this.powerOn;

		if(this.powerOn){
			this.toggleSwitch.nativeElement.classList.add('on');
			this.toggleVal.emit(true);
		} else {
			this.toggleSwitch.nativeElement.classList.remove('on');
			this.toggleVal.emit(false);
		}
	}
}	

