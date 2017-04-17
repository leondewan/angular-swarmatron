export class ScalingMath {

	//linear scaling of knob position in degrees, 0 being straight up; 'amp' represents amplitude
	linScale(knobPosition, amp){
		return Math.round(amp*(knobPosition + 150)/300);
	}

	revLinScale(paramval, amp) {
		return Math.round(300/amp*paramval - 150);
	}

	
	
	//exponential scaling. curve shape represents 'severity' of curve
	
	 expScale(knobPosition, amp, curveShape){
		return Math.round(amp*(Math.exp(curveShape*(knobPosition+150) / 300)-1) / (Math.exp(curveShape)-1));
	}

	revExpScale(paramval, amp, curveShape){
		return Math.round(300 / curveShape * Math.log(paramval / amp*(Math.exp(curveShape)-1)+1) - 150);
	}
	constructor(){}
	

}