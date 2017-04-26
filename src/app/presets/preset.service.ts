import { Injectable } from '@angular/core';

import { Preset } from './preset';
import { Presets } from './presets';

@Injectable()
export class PresetService {
	getPresets(): Preset[] {
		return Presets;
	}

	loadUserPresets(){
        for (var key in localStorage){
            if(key.indexOf('swarm-preset')!=-1) Presets.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    writePreset(name, voicemap, track, q, cutoff, filtenv, drive, attack, decay, sustain, release){
    	var newPreset={
            'name':name,
            'voicemap':voicemap,
            'track':track,
            'qval':q,
            'cutval':cutoff,
            'filtenv':filtenv,
            'drive':drive,
            'attack':attack,
            'decay':decay,
            'sustain':sustain,
            'release':release
        }

        Presets.push(newPreset);
        localStorage.setItem("swarm-preset-" + name, JSON.stringify(newPreset));
    }

}