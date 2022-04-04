/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const isWeakKey = thing => typeof thing === "object" && thing !== null;

/** 一个 tree 链表， 通过provide(...args) ：例如 [object,string,function:是一个函数，返回value ] 对于每个 argx 都会有一个 WeakTupleMap(object,string 对应f=4，2，1),不一样的arg 对应 this.m = new WeakTupleMap ,或者 this.w = new WeakTupleMap ，然后新的argx的value 存储在上一个的this.m 或者 this.w，最后存储效果 WeakTupleMap(this.f=4,this.w = WeakTupleMap(this.f=2,this.m = WeakTupleMap(this.f=1 , this.v == 最后一个参数function 返回的value )))
 * @template {any[]} T
 * @template V
 */
class WeakTupleMap {
	constructor() {
		/** @private */
		this.f = 0;
		/** @private @type {any} */
		this.v = undefined;
		/** @private @type {Map<object, WeakTupleMap<T, V>> | undefined} */
		this.m = undefined;
		/** @private @type {WeakMap<object, WeakTupleMap<T, V>> | undefined} */
		this.w = undefined;
	}

	/**
	 * @param {[...T, V]} args tuple
	 * @returns {void}
	 */
	set(...args) { // args = [arg1 , arg2 , arg3 是一个函数，返回value ] => WeakTupleMap.w|m = map(arg1 , WeakTupleMap.w = (arg2 , WeakTupleMap.w|m = (arg3 , WeakTupleMap.v = arg3))) , args 是按照链表存储的 ： WeakTupleMap.w|m  === map , w 存储object，m 存储非object (包括function)
		/** @type {WeakTupleMap<T, V>} */
		let node = this;
		for (let i = 0; i < args.length - 1; i++) {
			node = node._get(args[i]);
		}
		node._setValue(args[args.length - 1]); // last v : this.f | = 1
	}

	/**
	 * @param {T} args tuple
	 * @returns {boolean} true, if the tuple is in the Set
	 */
	has(...args) {
		/** @type {WeakTupleMap<T, V>} */
		let node = this;
		for (let i = 0; i < args.length; i++) {
			node = node._peek(args[i]);
			if (node === undefined) return false;
		}
		return node._hasValue();
	}

	/**
	 * @param {T} args tuple
	 * @returns {V} the value
	 */
	get(...args) {
		/** @type {WeakTupleMap<T, V>} */
		let node = this;
		for (let i = 0; i < args.length; i++) {
			node = node._peek(args[i]);
			if (node === undefined) return undefined;
		}
		return node._getValue();
	}

	/**
	 * @param {[...T, function(): V]} args tuple
	 * @returns {V} the value
	 */
	provide(...args) {
		/** @type {WeakTupleMap<T, V>} */
		let node = this;
		for (let i = 0; i < args.length - 1; i++) {
			node = node._get(args[i]);
		}
		if (node._hasValue()) return node._getValue();
		const fn = args[args.length - 1]; // last arg is function
		const newValue = fn(...args.slice(0, -1)); // [1,2,3].slice(0,-1) == [1,2] 不拿最后一个值
		node._setValue(newValue);
		return newValue;
	}

	/**
	 * @param {T} args tuple
	 * @returns {void}
	 */
	delete(...args) {
		/** @type {WeakTupleMap<T, V>} */
		let node = this;
		for (let i = 0; i < args.length; i++) {
			node = node._peek(args[i]);
			if (node === undefined) return;
		}
		node._deleteValue(); // 	this.f &= 6; delete
	}

	/**
	 * @returns {void}
	 */
	clear() {
		this.f = 0;
		this.v = undefined;
		this.w = undefined;
		this.m = undefined;
	}

	_getValue() {
		return this.v;
	}
	// last v must (this.f & 1) === 1 , _setValue
	_hasValue() {
		return (this.f & 1) === 1;
	}

	_setValue(v) {
		this.f |= 1;
		this.v = v;
	}

	_deleteValue() {
		this.f &= 6;
		this.v = undefined;
	}

	_peek(thing) {
		if (isWeakKey(thing)) { // is object
			if ((this.f & 4) !== 4) return undefined;
			return this.w.get(thing);
		} else {
			if ((this.f & 2) !== 2) return undefined;
			return this.m.get(thing);
		}
	}
	// this.f != 4  存储object ， this.f |= 2 存储非 object ,是一个tree map
	_get(thing) {
		if (isWeakKey(thing)) { // is object
			if ((this.f & 4) !== 4) { // if this.f | = 4 and this.f & 4 = 4
				const newMap = new WeakMap();
				this.f |= 4;
				const newNode = new WeakTupleMap();
				(this.w = newMap).set(thing, newNode);
				return newNode;
			}
			const entry = this.w.get(thing);
			if (entry !== undefined) {
				return entry;
			}
			const newNode = new WeakTupleMap(); // WeakTupleMap.w = map = (thing, WeakTupleMap)
			this.w.set(thing, newNode);
			return newNode;
		} else {
			if ((this.f & 2) !== 2) { // if this.f | = 2 and this.f & 2 = 2
				const newMap = new Map();
				this.f |= 2;
				const newNode = new WeakTupleMap();
				(this.m = newMap).set(thing, newNode);
				return newNode;
			}
			const entry = this.m.get(thing);
			if (entry !== undefined) {
				return entry;
			}
			const newNode = new WeakTupleMap();
			this.m.set(thing, newNode);
			return newNode;
		}
	}
}

module.exports = WeakTupleMap;
