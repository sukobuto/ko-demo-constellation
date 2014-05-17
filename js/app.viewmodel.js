/**
 * Author: sukobuto.com
 * Since: 14/05/15 16:48
 * Copyright: 2014 sukobuto.com All Rights Reserved.
 */

window.ViewModel = (function() {

	/**
	 * アプリケーションコンテキスト ViewModel
	 * @constructor
	 */
	function AppViewModel() {
		var self = this
			, realtime_timer = null;
		
		/** {ConstellationResultViewModel[]} 星座ごとの占い結果配列 */
		self.constellationResults = randomResults();
		
		/** {ConstellationResultViewModel} 選択中の星座占い結果 */
		self.selectedConstellation = null;
		
		/** {boolean} リアルタイム占い中か否か */
		self.isRealtime = false;
		
		/** {boolean} チート機能表示中か否か */
		self.showCheat = false;
		
		ko.track(self); // 監視可能化
		
		/** {ConstellationResultViewModel[]} 総合得点で降順にソートした占い結果配列 */
		ko.defineProperty(self, 'sortedConstellationResults', function() {
			return Enumerable.from(self.constellationResults).orderByDescending('$.totalScore').toArray();
		});

		/**
		 * 占い結果を選択
		 * @param {ConstellationResultViewModel} constellation
		 */
		self.selectConstellation = function(constellation) {
			self.selectedConstellation = constellation;
		};

		/**
		 * 占い結果の選択を解除
		 */
		self.deselectConstellation = function() {
			self.selectedConstellation = null;
		};

		/**
		 * リアルタイム占いの on off 切り替え
		 */
		self.toggleRealtime = function() {
			if (!realtime_timer) {
				realtime_timer = setInterval(function() {
					randomize(self.constellationResults);
				}, 1000);
				self.isRealtime = true;
			} else {
				clearInterval(realtime_timer);
				realtime_timer = null;
				self.isRealtime = false;
			}
		};

		/**
		 * チート機能表示の on off 切り替え
		 */
		self.toggleCheat = function() {
			self.showCheat = !self.showCheat;
		};
	}

	/**
	 * 星座単位の占い結果 ViewModel
	 * @param {string} name 星座名
	 * @param {ParameterViewModel[]} parameters
	 * @constructor
	 */
	function ConstellationResultViewModel(name, parameters) {
		var self = this;
		
		self.name = name || '未設定';
		self.parameters = parameters || [];
		ko.track(self);
		
		ko.defineProperty(self, 'totalScore', function() {
			return Enumerable.from(self.parameters).average('+$.value');
		});
	}

	/**
	 * 運勢パラメータ ViewModel
	 * @param {string} name パラメータ名
	 * @param {number} value 0~100
	 * @constructor
	 */
	function ParameterViewModel(name, value) {
		var self = this;
		
		self.name = name || '未設定';
		self.value = value || 0;
		ko.track(self);
	}
	
	// 以下はモックデータ作成用
	
	var constellationNames
		= '牡羊座 牡牛座 双子座 蟹座 獅子座 乙女座 天秤座 蠍座 射手座 山羊座 水瓶座 魚座'
		.split(' ');
	
	var paramNames = '仕事 健康 恋愛 金運 寿司'.split(' ');

	/**
	 * ランダムなパラメータを持った占い結果を生成
	 * @param name
	 * @returns {ConstellationResultViewModel}
	 */
	function randomResult(name) {
		var params = paramNames.map(function(param) {
			return new ParameterViewModel(param, Math.floor(Math.random()*(100-10)+10))
		});
		return new ConstellationResultViewModel(name, params);
	}

	/**
	 * ランダムな結果を12星座全て生成
	 * @returns {ConstellationResultViewModel[]}
	 */
	function randomResults() {
		return constellationNames.map(function(name) {
			return randomResult(name);
		})
	}

	/**
	 * 結果を全てランダムに書き換える
	 * @param {ConstellationResultViewModel[]} constellationResults
	 */
	function randomize(constellationResults) {
		constellationResults.forEach(function(constellationResult) {
			constellationResult.parameters.forEach(function(parameter) {
				parameter.value = Math.floor(Math.random()*(100-10)+10); 
			});
		});
	}

	// ViewModel を公開
	return {
		AppViewModel: AppViewModel,
		ConstellationResultViewModel: ConstellationResultViewModel,
		ParameterViewModel: ParameterViewModel
	}
	
})();