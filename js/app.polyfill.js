/**
 * JavaScript に足りないものをたすやつ
 */

(function() {

	if (!Array.prototype.forEach) {
		/**
		 * 配列の各要素に関数を適用する
		 * @param callback
		 */
		Array.prototype.forEach = function(callback) {
			for (var i = 0; i < this.length; i++) callback(this[i], i);
		}
	}

	if (!Array.prototype.map) {
		/**
		 * 配列を写像する
		 * @param callback
		 * @returns {Array}
		 */
		Array.prototype.map = function(callback) {
			var results = [];
			this.forEach(function(item, index) {
				results.push(callback(item, index));
			});
			return results;
		}
	}

	if (!Array.prototype.filter) {
		/**
		 * 配列にフィルタを適用する
		 * @param callback
		 */
		Array.prototype.filter = function(callback) {
			var results = [];
			this.forEach(function(item) {
				if (callback(item, index)) results.push(item);
			});
		}
	}
	
})();