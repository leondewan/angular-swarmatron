export class Envsettings {
    attackTime:number=1;
    peakLevel:number = 1;
    decayTime:number=1;
    sustainLevel:number=1;
    releaseTime:number=1;
    filterEnv:number=0;


    setAttack(val){
    	this.attackTime=val;
    }

    setDecay(val){
    	this.decayTime=val;
    }

    setSustain(val){
    	this.sustainLevel=val;
    }

    setRelease(val){
    	this.releaseTime=val;
    }

    setFilterEnv(val){
    	this.filterEnv=val;
    }
}
