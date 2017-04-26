import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Voice } from './voice';
import { Voices } from './voices';
import { PitchRibbonComponent } from '../pitch-ribbon/pitch-ribbon.component'
import { SwarmRibbonComponent } from '../swarm-ribbon/swarm-ribbon.component';
import { FilterControlComponent } from '../filter-control/filter-control.component';
import { EnvelopeControlComponent } from '../envelopes/envelope-control.component';
import { PresetService } from '../presets/preset.service';
import { Presets } from '../presets/presets'
import { Preset } from '../presets/preset';
import { ScalingMath } from '../utils/scaling-math';
import { Cluster } from '../utils/cluster';
import { Volenv } from '../envelopes/volenv';
import { Filtenv } from '../envelopes/filtenv';
import { FilterEnvComponent } from '../envelopes/filter-env.component';
import { Distortioncurve } from '../drive/distortion-curve';
import { Drive } from '../drive/drive.component';
import { Volume } from '../volume/volume.component';
import { PushSwitchComponent } from '../switches/push-switch.component';


@Component({
	selector: 'swarm-synth',
	templateUrl:'./swarmsynth.component.html',
	styleUrls: ['./swarmsynth.component.css'],
    providers:[PresetService]
})

export class SwarmsynthComponent implements OnInit {
  	audioContext: any;
    filter: BiquadFilterNode;

    voices:Voices;
    vx: any; 

    voicesState: Array<boolean> = [];
    
    swOverdrive: WaveShaperNode;
    envNode: GainNode;
    swarmVol: GainNode; 
    presets:Preset[];
    selectedPreset: Preset;

    scalingMath:ScalingMath;
    cluster:Cluster;
    volenv: Volenv;
    filtenv:Filtenv;

    knobCutoff:number = 0;
    ribbonCutoff:number=1;
    ribbonTrack=0;
    powered:boolean = true;

    distortionCurve:Distortioncurve;
    drive:number;
    vol:number;

    centerNote:number=0;
    swarmInterval:number=0;

    startup:boolean=false;

    @ViewChild('save') boxEl:ElementRef;

    @ViewChild(FilterControlComponent)
    filterControl: FilterControlComponent

    @ViewChild(EnvelopeControlComponent)
    envControl: EnvelopeControlComponent;

    @ViewChild(FilterEnvComponent)
    filterEnv: FilterEnvComponent;

    @ViewChild(Drive)
    driveComponent:Drive;

    @ViewChildren (PushSwitchComponent)
    pushSwitches:QueryList<PushSwitchComponent>;
    pSwitches: Array<PushSwitchComponent>;

    constructor( private PresetService: PresetService ) {
        
        this.scalingMath=new ScalingMath;
        this.cluster=new Cluster;
        
    }

    getPresets(): void {
        this.presets = this.PresetService.getPresets();
    }

    startVoices(){
        for(let i=0;i<8;i++){
            this.vx.voices[i].vco.start(0);
        }
    }

    toggleVoice(val, i){
        this.vx.voices[i].vca.gain.value=val;
    }

    togglePower(val){
        console.log("togglePower: " + val);
        this.powered=val;
        for (let pSwitch of this.pSwitches){
            if(val) pSwitch.powerOn();
            else {
                pSwitch.powerOff();
                this.resetEnvelopes();
            }
        }       
    }

    resetEnvelopes(){
        var now=this.audioContext.currentTime;
        this.envNode.gain.cancelScheduledValues(now);
        this.envNode.gain.value=0;
        this.filter.detune.cancelScheduledValues(now);
        this.filter.detune.value=0;
    }

    wireSwarm(){
        this.vx = this.voices.createVoices();
        
        this.envNode=this.audioContext.createGain();
        this.envNode.gain.value=0;
        this.volenv = new Volenv(this.audioContext, this.envNode);

        this.filter=this.audioContext.createBiquadFilter();
        this.filtenv=new Filtenv(this.audioContext, this.filter, this.volenv.envSettings);

        this.swOverdrive = this.audioContext.createWaveShaper();
        this.swOverdrive.oversample = '4x';
        this.distortionCurve=new Distortioncurve();
        this.swOverdrive.curve=this.distortionCurve.drawCurve(0);

        this.swarmVol=this.audioContext.createGain();

        this.vx.voiceMerger.connect(this.envNode);
        this.envNode.connect(this.filter);
        this.filter.connect(this.swOverdrive);
        this.swOverdrive.connect(this.swarmVol);
        this.swarmVol.connect(this.audioContext.destination);
    }

    setPitches(){
        let freqArray= this.cluster.makeCluster(this.centerNote, this.swarmInterval);
        for(let i=0;i<freqArray.length;i++){
            this.vx.voices[i].setFrequency(freqArray[i]);
        }
    }

    setCenterNote(val) {
        this.centerNote=val;
        this.setPitches();
        this.setRibCut();
    }

    setSwarmInterval(val){
        this.swarmInterval=val;
        this.setPitches();
    }

    gate(n) { 
        if(!this.startup){ 
            this.startVoices();
            this.startup=true;
        }
        
        this.volenv.volEnvelope(n); 
        this.filtenv.filtEnvelope(n);
    }

    setKnobCut(val) {
        this.knobCutoff=val; 
        this.filter.frequency.value=this.knobCutoff*this.ribbonCutoff; 
    }

    setRibCut(){
        this.ribbonCutoff= Math.pow(2,(this.ribbonTrack*this.centerNote/166.7));
        this.filter.frequency.value=this.knobCutoff*this.ribbonCutoff; 
    }

    setQ(val) { this.filter.Q.value=val; }  

    setTrack(val) { this.ribbonTrack=val; } 

    setAtt(val) { this.volenv.envSettings.setAttack(val); }

    setDec(val){ this.volenv.envSettings.setDecay(val); }

    setSus(val){ this.volenv.envSettings.setSustain(val); }

    setRel(val){ this.volenv.envSettings.setRelease(val); }

    setFilterN(val){ this.filtenv.envSettings.setFilterEnv(val); }

    setDrive(val){ 
        this.drive=val;
        this.swOverdrive.curve=this.distortionCurve.drawCurve(this.drive); }

    setVolume(val){
        this.swarmVol.gain.value=val; 
    }

    setVoiceState(selectedPreset){
        this.voicesState.length=0;
        selectedPreset.voicemap.forEach((v, i) => {
            this.voicesState.push(selectedPreset.voicemap[i]);

            if(selectedPreset.voicemap[i]) this.pSwitches[i].switchOn();
            else this.pSwitches[i].switchOff();
        });

    }

    setToPresets(selectedPreset){
        if(this.pSwitches) this.setVoiceState(selectedPreset);

        this.filterControl.setParam(selectedPreset.track, 'track');
        this.filterControl.setParam(selectedPreset.qval, 'q');
        this.filterControl.setParam(selectedPreset.cutval, 'cutoff');
        this.filterEnv.setEnv(selectedPreset.filtenv);
        this.driveComponent.setDrive(selectedPreset.drive);
        this.envControl.setParam(selectedPreset.attack, 'attack');
        this.envControl.setParam(selectedPreset.decay, 'decay');
        this.envControl.setParam(selectedPreset.sustain, 'sustain');
        this.envControl.setParam(selectedPreset.release, 'release');
        this.selectedPreset=selectedPreset;

    }

    savePreset(name){
        if(name) {
            this.voicesState.length=0;

            this.pSwitches.forEach((pSwitch, i) => {
                this.voicesState.push(pSwitch.voiceOn);
            });

            console.log(this.voicesState);

            this.PresetService.writePreset(name,
            this.voicesState, 
            this.ribbonTrack, 
            this.filter.Q,  
            this.knobCutoff,
            this.filtenv.envSettings.filterEnv,
            this.drive,
            this.volenv.envSettings.attackTime,
            this.volenv.envSettings.decayTime,
            this.volenv.envSettings.sustainLevel,
            this.volenv.envSettings.releaseTime

        )};

        console.log('filtersettings' + this.filtenv.envSettings.filterEnv);
        this.boxEl.nativeElement.hidden=true;
        this.boxEl.nativeElement.querySelector('input').value="";
    }

    ngAfterViewInit(){
       this.pSwitches=this.pushSwitches.toArray();
       this.setVoiceState(this.selectedPreset);
        
    }

	ngOnInit() {
        this.audioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
        this.voices=new Voices(this.audioContext);

        this.wireSwarm();
        
        this.getPresets();
        this.selectedPreset=this.presets[0];
        this.setToPresets(this.selectedPreset);        
        this.PresetService.loadUserPresets();
  	}

}