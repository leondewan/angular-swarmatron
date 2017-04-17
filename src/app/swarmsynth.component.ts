import { Component, OnInit } from '@angular/core';
import { Voice } from './voice';

@Component({
	selector: 'swarm-synth',
	template: `
		<div id="swarmatron">
        <filter-control (cutval)="setCut($event)" (qval)="setQ($event)"></filter-control>
        </div>
		  `,
	styles: [`		 
        #swarmatron {
      		background:#699;
            padding:40px;
		}`
	]
})

export class SwarmsynthComponent implements OnInit {
  	private audioContext: AudioContext;
  	public filter: BiquadFilterNode;

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

    playVoices(){
        let vx = this.createVoices();
        this.filter=this.audioContext.createBiquadFilter();
        vx.voiceMerger.connect(this.filter);
        this.filter.connect(this.audioContext.destination);
    }

    setCut(val){
        this.filter.frequency.value=val;
    }

    setQ(val){
        this.filter.Q.value=val;
    }
   

	ngOnInit() {
  		this.audioContext=new AudioContext();
        this.playVoices();

  	}

}