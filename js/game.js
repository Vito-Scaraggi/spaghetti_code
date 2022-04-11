import { dashboard } from "./dashboard.js";
import { level_0 } from "./level_0.js";
import { level_1 } from "./level_1.js";

window.onload = function start(){
	window.dash = new dashboard(document.getElementById('dash'));
	window.lv_0 = new level_0(document.getElementById('level_0'));
	window.lv_1 = new level_1(document.getElementById('level_1'));
	window.dash.show();
	window.lv_0.show();
	//window.lv_1.show();
};