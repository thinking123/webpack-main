/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** 数组队列 : [1,2,3] => pop 1 , 2 , 3
 * @template T
 */
class ArrayQueue {
	/**
	 * @param {Iterable<T>=} items The initial elements.
	 */
	constructor(items) {
		/** @private @type {T[]} */
		this._list = items ? Array.from(items) : [];
		/** @private @type {T[]} */
		this._listReversed = [];
	}

	/**
	 * Returns the number of elements in this queue.
	 * @returns {number} The number of elements in this queue.
	 */
	get length() {
		return this._list.length + this._listReversed.length;
	}

	/**
	 * Empties the queue.
	 */
	clear() {
		this._list.length = 0;
		this._listReversed.length = 0;
	}

	/**
	 * Appends the specified element to this queue.
	 * @param {T} item The element to add.
	 * @returns {void}
	 */
	enqueue(item) {
		this._list.push(item);
	}

	/** 弹出队列
	 * Retrieves and removes the head of this queue.
	 * @returns {T | undefined} The head of the queue of `undefined` if this queue is empty.
	 */
	dequeue() {
		if (this._listReversed.length === 0) {
			if (this._list.length === 0) return undefined;
			if (this._list.length === 1) return this._list.pop(); // 弹出 last
			if (this._list.length < 16) return this._list.shift(); // 弹出 first  todo bug
			const temp = this._listReversed; // []
			this._listReversed = this._list; // _listReversed = [] === _list = [1,2,3]
			this._listReversed.reverse();// _listReversed = [3,2,1]
			this._list = temp; // _list = [] , _listReversed = [3,2,1]
		}
		return this._listReversed.pop();
	}

	/**
	 * Finds and removes an item
	 * @param {T} item the item
	 * @returns {void}
	 */
	delete(item) {
		const i = this._list.indexOf(item);
		if (i >= 0) {
			this._list.splice(i, 1);
		} else {
			const i = this._listReversed.indexOf(item);
			if (i >= 0) this._listReversed.splice(i, 1);
		}
	}

	[Symbol.iterator]() {
		let i = -1;
		let reversed = false;
		return {
			next: () => {
				if (!reversed) {
					i++;
					if (i < this._list.length) {
						return {
							done: false,
							value: this._list[i]
						};
					}
					reversed = true;
					i = this._listReversed.length;
				}
				i--;
				if (i < 0) {
					return {
						done: true,
						value: undefined
					};
				}
				return {
					done: false,
					value: this._listReversed[i]
				};
			}
		};
	}
}

module.exports = ArrayQueue;
