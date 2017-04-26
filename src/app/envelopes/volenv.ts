import { Envsettings } from './envsettings';

export class Volenv {
	context: AudioContext;
	envNode: GainNode;
	envSettings:Envsettings;

	constructor(context, envNode){
		this.context=context;
		this.envNode=envNode;
		this.envSettings= new Envsettings;
	}

	volEnvelope(n){
		var param=this.envNode.gain;
        var now=this.context.currentTime;
        var lastValue;
        
        if(n){
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue, now);
            param.linearRampToValueAtTime(this.envSettings.peakLevel, now + this.envSettings.attackTime);
            param.setTargetAtTime(this.envSettings.sustainLevel, now + this.envSettings.attackTime, 
                this.envSettings.decayTime);
            
        } else {
            
            lastValue=param.value;
            param.cancelScheduledValues(now);
            param.setValueAtTime(lastValue||this.envSettings.sustainLevel, now);
            param.setTargetAtTime(0, now, this.envSettings.releaseTime);  
        }      
	}


}
