import {level} from "./util.js";

//almost completed

class level_0 extends level{
    
	//some params

    total_target = 50;
    pocket_target = 100;
    sell_factor = 1.33;

	//class constructor
	constructor(level){
		super(level);
		this.get_child("auto_mod").style.display = "none";
		this.auto_mod = false;
        this.get_child("button_craft").setAttribute("onclick","lv_0.craft()");
		this.get_child("upg_auto_craft").setAttribute("onclick","lv_0.upg_auto_craft()");
		this.get_child("upg_auto_sell").setAttribute("onclick","lv_0.upg_auto_sell()");
	}


	//return sell rate
	get_sell_rate(){
		return this.sell_rate;
	}

	//return craft rate
	get_craft_rate(){
		return this.craft_rate;
	}

	//handle the click on craft button
	//increase by 1 the number of crafted spaghetti
	craft() {
		dash.addup_total();
		dash.write("total");
		if(!this.auto_mod && dash.get_total() >= this.total_target){
			this.auto_mod = true;
            this.setup_auto();
		}
	}

	//level 0 daemon
	//sell and craft automatically
	auto_d(obj){
		obj.auto_craft();
		obj.auto_sell()
	}

	//sell automatically
	auto_sell() {
		if( dash.sub_total(this.sell_rate)){
			var money = this.calc_sales() * this.calc_price();
			dash.addup_pocket(money);
			dash.write("total");
			dash.write_f("pocket");
			
			if(!this.is_passed() && dash.get_pocket() >= this.pocket_target){
				this.on_passed();
				lv_1.setup();
				lv_1.show();
			}
		}
	}

	//craft automatically
	auto_craft(){
		var spaghetti = this.calc_spaghetti();
		dash.addup_total(spaghetti);
		dash.write("total");
	}

	//initizialize auto-craft and auto-sell
	setup_auto(){
		this.fixed_price = .1;
		this.craft_rate = 1;
		this.sell_rate = 1;
		this.craft_cost = 2;
		this.sell_cost = 2;
        this.craft_count = 0;
        this.sell_count = 0;

		this.write_f("craft_cost");
		this.write_f("sell_cost");
		this.write("craft_rate");
		this.write("sell_rate");
		this.get_child("auto_mod").style.display = "block";
		var obj = this;
		setInterval(function(){obj.auto_d(obj);}, 1000);
	}

	//calc the cost of a craft or sell rate upgrade
    static calc_upg(x){
        return x * (Math.pow(Math.log(x),2)+1);
    }

	//calc the new craft or sell rate after an upgrade
    static calc_rate(x){
        return Math.max(1, Math.round(1+Math.log(x)));
    }

	//handle the click on speed up craft rate button

	upg_auto_craft(){
		if (dash.sub_pocket(this.craft_cost)){
			dash.write_f("pocket");
            this.craft_count++;
            this.craft_rate += level_0.calc_rate(this.craft_count+1);
			this.craft_cost = level_0.calc_upg(this.craft_count+1);
			this.write_f("craft_cost");
			this.write("craft_rate");
		}
	}

	//handle the click on speed up sell rate button

	upg_auto_sell(){
		if (dash.sub_pocket(this.sell_cost)){
			dash.write_f("pocket");
			this.sell_count++;
            this.sell_rate += level_0.calc_rate(this.sell_count+1);
			this.sell_cost = this.sell_factor * level_0.calc_upg(this.sell_count+1);
			this.write_f("sell_cost");
			this.write("sell_rate");
		}
	}

	//called when level 0 is passed
	on_passed(){
		super.on_passed();
		this.get_child("alert").style.display = "none";
	}

	//retrieve the current price of spaghetti
	calc_price(){
		if (this.is_passed())
			return lv_1.get_price();
		else 
			return this.fixed_price;
	}

	//calculate the current sell rate
	calc_sales(){
		if (this.is_passed())
			return lv_1.estim_sales();
		else 
			return this.sell_rate;
	}

	//calculate crafted spaghetti
	calc_spaghetti(){
		if (this.is_passed())
			return lv_1.estim_prod();
		else 
			return this.craft_rate;
	}

}

export{level_0};