import { Component, OnInit } from '@angular/core';

import { SwarmsynthComponent } from './swarmsynth.component';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  	title = 'app works!';
  	/*private audioContext: AudioContext;
  	createVoices() {
  			let ctx=this.audioContext;
        let voiceMerger=this.audioContext.createChannelMerger(8);
        
      
        var voices=[];

        for(let i=0;i<8;i++) {
            let voice= new Voice(100, 0.125, ctx);
            voice.voiceConnect(voiceMerger, 0, 0);
            voices.push(voice);
        }
        
        return {
          voices:voices,
          voiceMerger:voiceMerger
         }
    
    }

    createFilter(){
        let filter=new Filter(this.audioContext);
        return filter;
    }

    playVoices(){
        let vx = this.createVoices();
        let fl=this.createFilter();
        this.filter=fl.filter;
        console.log(fl);
        vx.voiceMerger.connect(fl.filter);
        fl.filter.connect(this.audioContext.destination);
        let testInstance = new FilterControlComponent();
        console.log('from app: ' + testInstance.gain);
    }*/

  	ngOnInit() {
  		//this.audioContext=new AudioContext();

  	}
}
