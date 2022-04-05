import {level} from "./util.js";

//completed

class level_0 extends level{
    
    total_target = 50;
    pocket_target = 100;
    sell_factor = 1.33;

	constructor(level){
		super(level);
		this.get_child("auto_mod").style.display = "none";
		this.auto_mod = false;
        this.get_child("button_craft").setAttribute("onclick","lv_0.craft()");
		this.get_child("upg_auto_craft").setAttribute("onclick","lv_0.upg_auto_craft()");
		this.get_child("upg_auto_sell").setAttribute("onclick","lv_0.upg_auto_sell()");
	}

	craft() {
		dash.addup_total();
		dash.write("total");
		if(dash.get_total() >= this.total_target && !this.auto_mod){
			this.auto_mod = true;
            this.setup_auto();
		}
	}

	auto_d(obj){
		obj.auto_craft();
		obj.auto_sell()
	}

	auto_sell() {
		if( dash.sub_total(this.sell_rate)){
			dash.addup_pocket(this.sell_rate * this.fixed_price);
			dash.write("total");
			dash.write_f("pocket");
			
			if(dash.get_pocket() >= this.pocket_target && !this.is_passed()){
				this.on_passed();
				lv_1.show();
			}
		}
	}

	auto_craft(){
		dash.addup_total(this.craft_rate);
		dash.write("total");
	}

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

    static calc_upg(x){
        return x * (Math.pow(Math.log(x),2)+1);
    }
    static calc_rate(x){
        return Math.max(1, Math.round(1+Math.log(x)));
    }

	upg_auto_craft(){
		if (dash.sub_pocket(this.craft_cost)){
			dash.write_f("pocket");
            this.craft_count++;
            this.craft_rate += level_0.calc_rate(this.craft_count+1)
			this.craft_cost = level_0.calc_upg(this.craft_count+1);
			this.write_f("craft_cost");
			this.write("craft_rate");
		}
	}

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

	on_passed(){
		super.on_passed();
		this.get_child("alert").style.display = "none";
	}

}

export{level_0};