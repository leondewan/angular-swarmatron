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

    writePreset(name, cutoff, q){
    	var newPreset={
            'name':name,
            'cutval':cutoff,
            'qval': q
        }

        Presets.push(newPreset);
        localStorage.setItem("swarm-preset-" + name, JSON.stringify(newPreset));
    }

}