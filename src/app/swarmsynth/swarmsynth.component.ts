import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Voice } from './voice';
import { FilterControlComponent } from '../filter-control/filter-control.component';
import { PresetService } from '../presets/preset.service';
import { Presets } from '../presets/presets'
import { Preset } from '../presets/preset';

@Component({
	selector: 'swarm-synth',
	templateUrl:'./swarmsynth.component.html',
	styleUrls: ['./swarmsynth.component.css'],
        providers:[PresetService]
})

export class SwarmsynthComponent implements OnInit {
  	private audioContext: AudioContext;
  	public filter: BiquadFilterNode;
    public vx: any; 
    
    public swOverdrive: WaveShaperNode;
    public envNode: GainNode;
    public swarmVol: GainNode; 
    private presets:Preset[];
    private selectedPreset: Preset;

    @ViewChild('saveBox') boxEl:ElementRef;

    @ViewChild(FilterControlComponent)
    private filterControl: FilterControlComponent

    constructor( private PresetService: PresetService ) {
        this.audioContext=new AudioContext();        
    }

    getPresets(): void {
        this.presets = this.PresetService.getPresets();
    }

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

    startVoices(){
        for(let i=0;i<8;i++){
            this.vx.voices[i].vco.start(0);
        }
    }

    wireSwarm(){
        this.vx = this.createVoices();
        this.envNode=this.audioContext.createGain();
        this.filter=this.audioContext.createBiquadFilter();
        this.swOverdrive = this.audioContext.createWaveShaper();
        this.swarmVol=this.audioContext.createGain();

        this.vx.voiceMerger.connect(this.envNode);
        this.envNode.connect(this.filter);
        this.filter.connect(this.swOverdrive);
        this.swOverdrive.connect(this.swarmVol);
        this.swarmVol.connect(this.audioContext.destination);
    }

    setCut(val){
        this.filter.frequency.value=val;
    }

    setQ(val){
        this.filter.Q.value=val;
    }   

    setToPresets(selectedPreset){
        this.filterControl.setCutoff(selectedPreset.cutval);
        this.filterControl.setQ(selectedPreset.qval);
    }

    savePreset(name){
        let preCutoff=this.filterControl.getCutoff();
        let preQ=this.filterControl.getQ();

        if(name) this.PresetService.writePreset(name, preCutoff, preQ);

        this.boxEl.nativeElement.hidden=true;
        this.boxEl.nativeElement.querySelector('input').value="";
    }

	ngOnInit() {
        this.wireSwarm();
        this.startVoices();
        this.getPresets();
        this.selectedPreset=this.presets[0];
        this.setToPresets(this.selectedPreset);
        this.PresetService.loadUserPresets();
  	}

}