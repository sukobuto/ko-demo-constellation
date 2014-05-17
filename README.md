ko-demo-constellation
=====================

『[Knockoutで グラフを描こう! View を極める MVVM 考](http://slide.sukobuto.com/article/ko-svg/)』で紹介したデモです。
[こちら](http://slide.sukobuto.com/demo/ko-svg/) で動きが見られます。

visualState というバインディングを使っていますが、こちらは [ko-jquery-visualstate.js](https://github.com/sukobuto/ko-jQueryVisualState) というプラグインで追加されるカスタムバインディングです。
app.view.js にてハンドリングしているイベント「jqvs-init, jqvs-changed」も ko-jquery-visualstate.js 独自のイベントです。

寿司は数合わせですｗ