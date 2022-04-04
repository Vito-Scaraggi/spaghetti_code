import {level} from "./util.js";

class dashboard extends level{

	constructor(dash){
		super(dash);
		this.pocket = 0;
		this.total = 0;
		this.write("total");
		this.write_f("pocket");
	}

	addup_total(rate = 1){
		this.total += rate;
	}

	sub_total(rate = 1){
		var flag = this.total - rate >= 0;
		if (flag) this.total = Math.max(0, this.total - rate);
		return flag;
	}

	addup_pocket(cash = .05){
		this.pocket += cash;
	}

	sub_pocket(cash){
		var flag = this.pocket - cash >= 0;
		if(flag) this.pocket = Math.max(0, this.pocket - cash);
		return flag;
	}

	get_total(){
		return this.total;
	}

	get_pocket(){
		return this.pocket;
	}

}

export{dashboard};