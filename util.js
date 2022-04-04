class level{
	constructor(level){
		this.level = level;
		this.passed = false;
		this.hide(); 
	}
	hide(){
		this.level.style.display = 'none';
	}
	show(){
		this.level.style.display = 'block';
	}
	get_child(id){
		return this.level.querySelector("#"+id);
	}

    get_children(id){
        return this.level.querySelectorAll("#"+id);
    }

	write(id_string){
		this.get_child(id_string).textContent = this[id_string]
	}

	write_f(id_string){
		this.get_child(id_string).textContent = (this[id_string]).toFixed(2);
	}
    on_passed(){
        this.passed = true;
    }
    is_passed(){
        return this.passed;
    }
}

export {level};