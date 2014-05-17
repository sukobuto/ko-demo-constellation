/**
 * Author: sukobuto.com
 * Since: 14/05/15 16:48
 * Copyright: 2014 sukobuto.com All Rights Reserved.
 */

/**
 * ヘルパー（エフェクタ、コンバータ等）定義
 */
window.View = (function() {
	var root = {}
		, e = root.e = {}	// エフェクタ
		, c = root.c = {};	// コンバータ

	// レーダーチャートコンバータ
	c.rc = (function() {
		var rc = {};

		/**
		 * 100分率値からレーダーチャートの頂点座標に変換
		 * @param value
		 * @param index
		 * @param total
		 * @returns {{x: number, y: number}}
		 */
		rc.value2Point = function(value, index, total) {
			var x     = 0,
				y     = -value * 0.8,
				angle = Math.PI * 2 / total * index,
				cos   = Math.cos(angle),
				sin   = Math.sin(angle),
				tx    = x * cos - y * sin + 100,
				ty    = x * sin + y * cos + 100
			return {
				x: tx,
				y: ty
			}
		};

		/**
		 * 100分率値の配列からレーダーチャートのパス頂点情報に変換
		 * @param stats
		 * @returns {string}
		 */
		rc.stats2Points = function(stats) {
			return stats.map(function(stat) {
				var point = rc.value2Point(stat.value, stats.indexOf(stat), stats.length);
				return point.x + ',' + point.y;
			}).join(' ');
		};
		
		return rc;
	})();
	
	return root;
})();

/**
 * イベントハンドラ設定
 */
$(function() {
	
	var viewPanes_fade_duration = 200;
	$(document)
		.on('jqvs-init', '.view-pane', function(e, state) {
			var $target = $(e.target);
			state.shown ? $target.show() : $target.hide();
		})
		.on('jqvs-changed', '.view-pane', function(e, state) {
			var $target = $(e.target);
			if (state.shown) {
				setTimeout(function() {
					$target.stop().fadeIn(viewPanes_fade_duration);
				}, viewPanes_fade_duration);
			} else {
				$target.stop().fadeOut(viewPanes_fade_duration - 1);
			}
		});
	
});