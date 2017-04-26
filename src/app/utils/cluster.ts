import { ScalingMath } from './scaling-math';

export class Cluster {
	scalingMath:any;

	makeCluster(note, interval){
    	var tone;
    	var toneCeiling=1150;
    	var cluster=[];
    	for(var i=0;i<8;i++){
    		tone=note + (i-3.5)*interval;
    		if(tone>=toneCeiling) tone=toneCeiling;
    		cluster.push(this.scalingMath.noteToTone(tone));	
    	}
    	return cluster;
    }

	constructor(){
		this.scalingMath=new ScalingMath;
	}
}