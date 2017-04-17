export class Voice  {
    vco: OscillatorNode;
    vca: GainNode;

    constructor(freq, vol, ctx) {

        this.vco=ctx.createOscillator();
        this.vco.type="sawtooth";
        this.vco.frequency.value=freq;

        this.vca=ctx.createGain();
        this.vca.gain.value=vol;

        this.vco.connect(this.vca);
        this.vco.start(0);
    }

    voiceConnect(dest, chan1, chan2) {
      this.vca.connect(dest, chan1, chan2);
    }

}