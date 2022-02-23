/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./RuleSetCompiler")} RuleSetCompiler */
/** @typedef {import("./RuleSetCompiler").RuleCondition} RuleCondition */

class BasicMatcherRulePlugin {
	constructor(ruleProperty, dataProperty, invert) { //"test", "resource"， false
		this.ruleProperty = ruleProperty;
		this.dataProperty = dataProperty || ruleProperty;
		this.invert = invert || false;
	}

	/**
	 * @param {RuleSetCompiler} ruleSetCompiler the rule set compiler
	 * @returns {void}
	 */
	apply(ruleSetCompiler) {
		ruleSetCompiler.hooks.rule.tap(
			"BasicMatcherRulePlugin",
			(path, rule, unhandledProperties, result) => {
				if (unhandledProperties.has(this.ruleProperty)) { // ruleProperty === ruleKey ("test")
					unhandledProperties.delete(this.ruleProperty); // 删除已经处理了的rulekey
					const value = rule[this.ruleProperty];// rule value  === "resource"
					const condition = ruleSetCompiler.compileCondition(
						`${path}.${this.ruleProperty}`,//path === 'ruleSet[0].rules[0]' => [ {rules : [ rule = {"test":"resource"} ]} ]
						value
					);
					const fn = condition.fn; // fn rule 匹配条件
					result.conditions.push({
						property: this.dataProperty,
						matchWhenEmpty: this.invert
							? !condition.matchWhenEmpty
							: condition.matchWhenEmpty,
						fn: this.invert ? v => !fn(v) : fn
					});
				}
			}
		);
	}
}

module.exports = BasicMatcherRulePlugin;
