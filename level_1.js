import {level} from "./util.js";

//si può settare il prezzo
//qualcosa con domanda e offerta?

class level_1 extends level{
	
	constructor(level){
		super(level);
		this.price = .05;
		this.get_child("slider").value = this.price;
		this.get_child("price").textContent = this.price;
		this.get_child("slider").setAttribute("oninput","lv_1.set_price()");
	}

	set_price(){
		this.price = this.get_child('slider').value;
		this.get_child('price').textContent = (this.price).toFixed(2);
	}

}

export{level_1};