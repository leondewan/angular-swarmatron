import { Preset } from  './preset';

export const Presets: Preset[] = [
	{ name:'electrophoresis', voicemap:[true, true, true, true, true, true, true, true], track:0.3, qval:14,  cutval:400, filtenv:0.5, drive:20, attack:0.3, decay:2, sustain:0.6, release:3 },
	{ name:'penumbra', voicemap:[true, false, true, true, true, true, true, false],track: 0.7, qval: 3,  cutval:2790, filtenv:0.2, drive:5, attack:0, decay:0.1, sustain:0.2, release:4 }
]