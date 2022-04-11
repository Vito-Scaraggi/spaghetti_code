import {level} from "./util.js";

class market_model{
	constructor(x1=0,y1=0,x2=1,y2=1){
		this.inc_factor = 1;	
		this.recalc(x1,y1,x2,y2);
	}
	
	recalc(x1,y1,x2,y2){
		y1 *= this.inc_factor;
		y2 *= this.inc_factor;
		this.m = (y2-y1)/(x2-x1);
		this.q = this.m *(-x1) + y1;
	}

	eval_quantity(price){
		return Math.round(Math.max(0,(price - this.q)/this.m));
	}

	increase(delta=1){
		this.inc_factor += delta; //???
	}

	log(){
		console.log("y = " + this.m + "x + " + this.q);
	}
}

class level_1 extends level{
	
	//class constructor
	constructor(level){
		super(level);
	}

	setup(){
		//span values
		this.price = 0.90;
		this.goto_perc = 100;
		this.goto_cost = 500;
		this.craft_delta = 0;
		this.killed = 0;
		this.sell_delta = 0;

		//other values
		this.equi_price = 0.90;
		this.max_price = 2;
		this.supply = new market_model();
		this.demand = new market_model();
		this.kill_time = 0.05;
		this.list_len = 7;
		this.inc_demand = 0.05;
		this.inc_supply = 0.25;
		this.goto_dec = 0.75;
		this.goto_cost_inc = 1.75;

		//this.supply.log();
		//this.demand.log();
		//linking events to html tags
		this.get_child("slider").value = this.price;
		this.write_f('price');
		this.get_child("slider").setAttribute("oninput","lv_1.set_price()");
		this.get_child('goto_lower').setAttribute("onclick","lv_1.decrease_goto()");
		//kill competitors
		this.write_f("goto_perc");
		this.write_f("goto_cost");
		this.write("killed");

		//setup
		this.refresh_craft_delta();
		this.refresh_sell_delta();

		//daemon
		var obj = this;
		setInterval(function(){obj.auto_d(obj);}, 1000);
	}

	//level 1 daemon
	auto_d(obj){
		obj.refresh_craft_delta();
		obj.refresh_sell_delta();
		//spawn competitor
		
		if (Math.random() <= this.kill_time ){
			var list = obj.get_child("competitors");
			if(list.childElementCount < this.list_len){
				var element = document.createElement("li");
				element.setAttribute("onclick","lv_1.kill(this)");
				list.appendChild(element);
			}
		}
	}

	kill(obj){
		this.demand.increase(this.inc_demand);
		obj.parentNode.removeChild(obj);
		this.killed += 1;
		this.write("killed");
	}

	//decrease goto nutritional value
	decrease_goto(){
		if (dash.sub_pocket(this.goto_cost)){
			this.supply.increase(this.inc_supply);
			this.goto_perc *= this.goto_dec;
			this.goto_cost *= this.goto_cost_inc;
			this.write_f('goto_perc');
			this.write_f('goto_cost');
		}
	}

	refresh_craft_delta(){
		var new_craft_rate = this.supply.eval_quantity(this.price);
		var craft_rate = lv_0.get_craft_rate();
		this.supply.recalc(0,0,craft_rate,this.equi_price);
		//this.supply.log();
		this.craft_delta = (new_craft_rate - craft_rate)/craft_rate * 100;
		this.write_f('craft_delta');
	}

	refresh_sell_delta(){
		var new_sell_rate = this.demand.eval_quantity(this.price);
		var sell_rate = lv_0.get_sell_rate();
		this.demand.recalc(0,this.max_price,sell_rate,this.equi_price);
		//this.demand.log();
		this.sell_delta = (new_sell_rate - sell_rate)/sell_rate * 100;
		this.write_f('sell_delta'); 
	}

	//refresh price label on slider input
	set_price(){
		this.price = parseFloat(this.get_child('slider').value);
		this.write_f('price');
	}

	//return current price
	get_price(){
		return this.price;
	}

	//estimate spaghetti production
	estim_prod(){
		return this.supply.eval_quantity(this.price);
	}

	//estimate spaghetti sales
	estim_sales(){
		return this.demand.eval_quantity(this.price);
	}

}

export{level_1};