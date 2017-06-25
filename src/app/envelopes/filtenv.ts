import { Envsettings } from './envsettings';

export class Filtenv {
	context: AudioContext;
	filter: BiquadFilterNode;
	envSettings: Envsettings;
    linearEnv: boolean;

	constructor(context, filter, envSettings, linearEnv){
		this.context=context;
		this.filter=filter;
		this.envSettings= envSettings;
        this.linearEnv=linearEnv;
	}

	filtEnvelope(n){
		var param=this.filter.detune;
        var now=this.context.currentTime;
        var lastValue;
        
        var envScale=4000;

        var filterPeak=this.envSettings.peakLevel*envScale*this.envSettings.filterEnv;
        var floor= -(filterPeak);//we are making the detune symmetrical around 0

        if(n){
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue, now);
            param.linearRampToValueAtTime(filterPeak, now + this.envSettings.attackTime);            

            if(this.linearEnv) param.linearRampToValueAtTime(0, 
                now + this.envSettings.attackTime + this.envSettings.decayTime);            
            else param.setTargetAtTime(this.envSettings.sustainLevel, 
                now + this.envSettings.attackTime, this.envSettings.decayTime);
            
        } else {
            
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue||this.envSettings.sustainLevel, now);
            
            if(this.linearEnv)param.linearRampToValueAtTime(floor, now + this.envSettings.releaseTime);
            else param.setTargetAtTime(floor, now, this.envSettings.releaseTime);  
        }      
	}


}
