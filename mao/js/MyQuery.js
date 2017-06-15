function $(id) {
	return document.getElementById(id);
}
//获取元素属性值getStyle
function getStyle(obj, strr) {
	if(obj.currentStyle) {
		return obj.currentStyle[strr];
	} else {
		return getComputedStyle(obj)[strr];
	}
}

function Go(obj, attr, direct, target, endFn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		//为什么要写成obj.timer,为了解决多个元素的动画相互之间影响的问题
		var Distance = parseInt(getStyle(obj, attr)) + direct;
		if(Distance >= target && direct > 0 || Distance < target && direct < 0) { //与运算的优先级大于或运算
			Distance = target;
		}
		//			1+2*3
		obj.style[attr] = Distance + 'px';
		//				obj.style.marginLeft
		if(Distance == target) {
			clearInterval(obj.timer);
			if(endFn) { //这个if判断是为了解决我们不需要传入endFn参数时的报错问题
				endFn(); //实际调用Go函数的时候，我们有可能需要再Go函数执行完毕之后去做其他事情，这件事就通过回调函数endFn来实现
			}
		}
	}, 40)
}
function opacity(obj,state){
	obj.optimer=setInterval(function(){
		var opa=parseFloat(getStyle(obj,'opacity'))+state;
		if(opa>=1 || opa<=0){
			state>0 ? opa=1 : opa=0;
			clearInterval(obj.optimer);
		}
		obj.style.opacity=opa;
	},50)
}
function shake(obj,attr,endfn){
	var posL=parseInt(getStyle(obj,attr));
	var arr=[];
	for(var i=20;i>=0;i-=2){
		arr.push(i,-i);
	}
	var num=0;
	clearInterval(obj.shaker);
	obj.shaker=setInterval(function(){
		obj.style[attr]=posL+arr[num]+'px';
		num++;
		if(num>=arr.length){
			clearInterval(obj.shaker);
			if(endfn){
				endfn();
			}
		}
	},50)
}