import { fun } from "./bf";


class B1{

	toString(){
		console.log('B1')
	}
}

class B2{

	toString(){
		console.log('B2')
	}
}
const map = new Map<string ,any>();
map.set(B1.name, new B1());
map.set(B2.name, new B2());


function cfun(){
	console.log('serviceLists.keys()', map.keys())
	console.log('map.values()',map.values())
	console.log('map.values() arr ',Array.from(map.values()))
	fun(...map.values());

}
// const b = map.values();

cfun()
